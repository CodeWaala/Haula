import React, { Component } from "react";
import {
  Modal,
  // Tabs,
  // Tab,
  Table,
  Button
} from "react-bootstrap";
import API from "../../utils/apihelpers";
//import MapWithAMarker from "../../Shared/googlemap/MapContainer";
import MapWithADirectionsRenderer from "./mapwithdirection";
import IconUrl from "../Home/components/images/GRAY-PIN.png";
import IconUrlHover from "../Home/components/images/red-pin.png";
import "./customer.css";
const google = window.google;
const navigator = window.navigator;
let geocoder = new window.google.maps.Geocoder();
let infowindow = new google.maps.InfoWindow();
// const { compose, withProps, lifecycle } = require("recompose");

export class Customer extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowMap = this.handleShowMap.bind(this);

    this.state = {
      map: null,
      infoWindow: null,
      MarkersInfo: {},
      IconUrl: "images/GRAY-PIN.png",
      IconUrlHover: "images/red-pin.png",
      FurnitureImage: "images/furniture-picture.jpg",
      moverequests: [],
      toaddress: "",
      fromaddress: "",
      show: false
    };
  }

  autocomplete(map) {
      var moveFrom = this.refs.moveFrom;
      var moveTo = this.refs.moveTo;
      console.log("autocomplete");
      var autocomplete = new google.maps.places.Autocomplete(moveFrom);
      var autocomplete = new google.maps.places.Autocomplete(moveTo);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.autocomplete();
    this.setState({ show: true });
  }

  handleShowMap(fromadd, toadd) {
    this.setState({ fromaddress: fromadd, toaddress: toadd });

    //this.calculateAndDisplayRoute(fromadd,toadd,this.state.map)
    this.initMap(fromadd, toadd);
  }

  componentDidMount() {
    this.getMovesInfo();
    var map = new google.maps.Map(this.refs.map, {
      zoom: 8,
      center: { lat: 32.715, lng: -117.161 }
    });
  }

  getMovesInfo = () => {
    //api call to get data from DB (moves or order information)
    API.getOrders()
      .then(res => {
        this.setState({ moverequests: res.data });
        //this.initMap();
      })
      .catch(err => console.log(err));
  };

  initMap(fromaddress, toaddress) {
    var map = new google.maps.Map(this.refs.map, {
      zoom: 8,
      center: { lat: 32.715, lng: -117.161 }
    });
    this.setState({
      map: map
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

    this.calculateAndDisplayRoute(fromaddress, toaddress, map);
  }

  calculateAndDisplayRoute(fromAddress, ToAddress, map) {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService.route(
      {
        origin: fromAddress,
        destination: ToAddress,
        travelMode: "DRIVING"
      },
      function(response, status) {
        if (status === "OK") {
          directionsDisplay.setDirections(response);
          new google.maps.DirectionsRenderer({
            map: map,
            directions: response
          });
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  render() {
    return (
      <div className="flex-box">
        <div className="flex-1 cust-height">
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Request Name</th>
                <th>Moving From</th>
                <th>Moving To</th>
                <th>Moving Date</th>
                <th>Expected Price</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody className="tableBody">
              {this.state.moverequests.map((request, i) => (
                <tr>
                  <td>{request.id}</td>
                  <td>John Doe</td>
                  <td>{request.fromaddress}</td>
                  <td>{request.toaddress}</td>
                  <td>4/27/2018</td>
                  <td>{request.expectedprice}</td>
                  <td>{request.orderstatus}</td>
                  <td>
                    <Button
                      bsStyle="primary"
                      bsSize="small"
                      onClick={() =>
                        this.handleShowMap(
                          request.fromaddress,
                          request.toaddress
                        )
                      }
                    >
                      Track Request
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="Request">
          <h4>Request a Move here ! 
        <Button
             bsStyle="primary"
             bsSize="small"
             onClick={this.handleShow}>
             Request
        </Button>
        </h4>
        <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Request a Move</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form role="form" id="form">
                        <div className="form-group1" id="testID">
                          <label for="requesterName" class="formTitle">
                            Requester Name
                          </label>
                          <input
                            type="text"
                            id="requesterName"
                            className="form-control validate"
                            placeholder="i.e. John Smith"
                          />
                          <label
                            for="requriedField"
                            className="error"
                            id="errorRequesterName"
                          />
                        </div>
                        <div className="form-group2">
                          <label for="moveFrom" class="formTitle">
                            Moving from
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="moveFrom"
                            ref="moveFrom"
                            placeholder="1 World Way, Los Angeles, CA 90045"
                          />
                          <label
                            for="requriedField"
                            class="error"
                            id="errorMoveFrom"
                          />
                        </div>
                        <div className="form-group3">
                          <label for="moveTo" class="formTitle">
                            Moving to
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="moveTo"
                            ref="moveTo"
                            placeholder="3225 N Harbor Dr, San Diego, CA 92101"
                          />
                          <label
                            for="requriedField"
                            className="error"
                            id="errorMoveTo"
                          />
                        </div>

                        <div className="form-group4">
                          <label for="moveDate" class="formTitle">
                            Move date
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="moveDate"
                            placeholder="01/01/2018"
                          />
                          <label
                            for="requriedField"
                            className="error"
                            id="errorMoveDate"
                          />
                        </div>
                        <div className="form-group">
                          <label for="movePrice" class="formTitle">
                            Expected Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="movePrice"
                            placeholder="$150"
                          />
                          <label
                            for="requriedField"
                            className="error"
                            id="errorMovePrice"
                          />
                        </div>
                        <div className="form-group">
                          <label for="moveItem" className="formTitle">
                            Item description
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="moveItem"
                            placeholder="i.e. furniture, tables, chairs, etc."
                          />
                          <label
                            for="requriedField"
                            className="error"
                            id="errorMoveItem"
                          />
                        </div>
                        <button type="submit" className="btn-default" id="Submit">
                          <i className="search" />
                          Submit
                        </button>

                        <button type="button" className="btn-default" id="clearAll">
                          <i className="trash" />
                          Clear Results
                        </button>
                        <button type="addImage" className="btn-default">
                          <input
                            type="file"
                            onchange="previewImage()"
                            id="files"
                            name="files[]"
                            multiple
                          />
                        </button>
                      </form>
                    </Modal.Body>
                    {/* <Modal.Footer>
                      <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer> */}
                  </Modal>
        </div>
        </div>
        <div className="flex-2 cust-height">
          <div id="Map" ref="map"  className="mapPosition"/>
        </div>
      </div>
    );
  }
}

export default Customer;
