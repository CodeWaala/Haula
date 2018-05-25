import React, { Component } from "react";
const { compose, withProps, lifecycle } = require("recompose");
const google = window.google;
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDW2jclEKZ5j-zWenaspVMvdBekq60o1TQ&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidMount() {
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
          origin: this.props.from, // new google.maps.LatLng(41.8507300, -87.6512600),
          destination: this.props.To, // new google.maps.LatLng(41.8525800, -87.6514100),
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
    })
  )(props =>
    <GoogleMap
      defaultZoom={7}
      defaultCenter={new google.maps.LatLng(32.715, -117.161)}>
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  );
  
  export default MapWithADirectionsRenderer;