import React, { Component } from "react";
import { MyNavbar } from "../../Shared/nav/nav2";
import { Footer } from "../../Shared/footer/footer";
import {
  Image,
  Grid,
  Row,
  Col,
  Thumbnail,
  Button,
  Glyphicon
} from "react-bootstrap";

import MapWithAMarker from "../../Shared/googlemap/MapContainer";
import "./mover.css";
import $ from "jquery";
import { MoveCardContainer } from "./movecardcontainer/movecardcontainer.js";
import MoverCard from "./movecard/movercard";
import API from "../../utils/apihelpers";
import orders from "./orders.json";
import IconUrl from "../Home/components/images/blue_truck.png";
import IconUrlHover from "../Home/components/images/red_truck1.png";
import FurnitureImage from "../Home/components/images/furniture-Image.jpg";

//const $ = window.jQuery;
const google = window.google;
const navigator = window.navigator;
let geocoder = new window.google.maps.Geocoder();
let infowindow = new google.maps.InfoWindow();

export class Mover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders,
      map: null,
      MarkersInfo: {},
      moverequests: [],
      latlongs: [],
      lat: null,
      lng: null
    };
    this.getMovesInfo = this.getMovesInfo.bind(this);
    this.initMap = this.initMap.bind(this);
    this.geocodeAddress = this.geocodeAddress.bind(this);
    this.setInfoWindow = this.setInfoWindow.bind(this);
    this.MouseOut = this.MouseOut.bind(this);
    this.MouseOver = this.MouseOver.bind(this);
  }

  componentDidMount() {
    this.getMovesInfo();
    //this.initMap();
  }

  getMovesInfo = () => {
    //api call to get data from DB (moves or order information)
    API.getOrders()
      .then(res => { 
        this.setState({ moverequests: res.data })
        // this.getlatlngs(res.data);
        // this.getCurrentlatlng();
        this.initMap(res.data);
      })
      .catch(err => console.log(err));
  };

  getCurrentlatlng() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        //alert(position.coords.latitude);
      },
      error => {
        console.log(error)
      }
    );
  }

  initMap() {
    var map = new google.maps.Map(this.refs.map, {
      zoom: 8,
      center: { lat: 32.715, lng: -117.161 }
    });
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
        },
        function() {
          this.handleLocationError(true, this.infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, map.getCenter());
    }
  
    // //var geocoder = new google.maps.Geocoder();
    this.state.moverequests.map((request,i) => {
      console.log("RequestLoading")
      console.log(request);
      this.geocodeAddress(geocoder, map, request.fromaddress, request.expectedprice, request.id);
    })
  }
  
  geocodeAddress(geocoder, resultsMap, moveFrom, price, key) {
    var address = moveFrom; //.replace(/ /g,"+");
    //console.log(address);
    //console.log(resultsMap);
    geocoder.geocode({ address: address } , (results, status) => {
      console.log(results);
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);
        this.setInfoWindow(resultsMap, results, price, key);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  setInfoWindow(map, results, price, key) {
    var service = new google.maps.places.PlacesService(map);
    //console.log(results[0]);
    service.getDetails(
      {
        placeId: results[0].place_id
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            Icon: IconUrl,
            key: key
          });
          //MarkersInfo.push({marker:marker, key:key});
          console.log("marker");
          // marker.setIcon({
          //   url: IconUrlHover
          // });
          let markersinfo = Object.assign({}, this.state.MarkersInfo);
          markersinfo[key] = marker
          this.setState({
            MarkersInfo : markersinfo
          })

          console.log("Markersinfo: " + this.state.MarkersInfo[key]);
          console.log(this.state.MarkersInfo);
          // this.state.MarkersInfo[1].setIcon({
          //   url: IconUrlHover
          // });
          //this.state.MarkersInfo[key] = marker;
          //console.log(MarkersInfo);
          google.maps.event.addListener(marker, "click", function() {
            infowindow.setContent(
              "<div><strong>" +
                price +
                "</strong><br>" +
                "Location Type: " +
                place.types[0] +
                "<br>" +
                place.formatted_address +
                "</div>"
            );
            infowindow.open(map, this);
            marker.setIcon({
              url: IconUrlHover
            });
          });
  
          google.maps.event.addListener(infowindow, "closeclick", function() {
            marker.setIcon({
              url: IconUrl
            });
          });
  
          google.maps.event.addListener(marker, "mouseover", function(e) {
            //ToDO: on mouseover link the left tile with marker
            // $('.customer-card[data-key=' +  key + ']').css("opacity", "0.5");
           // console.log(e);
          });
          google.maps.event.addListener(marker, "mouseout", function() {
            //ToDO: change marker and remove the link to left tile
            //  marker.setIcon({
            //   url:IconUrl
            // })
          });
        }
      }
    );
  }

  AcceptClicked(key) {
     //alert(key);
     API.AcceptOrder(key)
     .then(res => { 
       //  this.state.moverequests = res.data
     })
     .catch(err => console.log(err));
  }

  MouseOver(key) {
   // alert("mouseover");
    this.state.MarkersInfo[key].setIcon({
      url: IconUrlHover
    });  
  }
  
  MouseOut(key) {
    //alert("mouseout");
    this.state.MarkersInfo[key].setIcon({
      url: IconUrl
    });
  }

  render() {
    return (
      <div className="flex-box">
          <MoveCardContainer>
            {this.state.moverequests.map((request, i) => (
              <MoverCard
                key={request.id}
                price={request.expectedprice}
                toaddress={request.toaddress}
                fromaddress={request.fromaddress}
                orderstatus={request.orderstatus}
                onMouseOver={() => this.MouseOver(request.id)}
                onMouseLeave={() => this.MouseOut(request.id)}
                onAccept={() => this.AcceptClicked(request.id, request.orderstatus)}
                Image={FurnitureImage}
              />
            ))}
          </MoveCardContainer>
        <div className="flex-2">
            <div id="Map" ref="map"></div>
        </div>
      </div>
    );
  }
}

export default Mover;
