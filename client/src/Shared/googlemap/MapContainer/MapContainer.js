import React, { Component } from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const { compose, withProps, lifecycle } = require("recompose");

const MapWithAMarker = compose(withProps(), withScriptjs, withGoogleMap)(props => {
  // console.log('props', props)
  return (
    <GoogleMap defaultZoom={5} defaultCenter={{ lat: 32, lng: -117 }}>
        {
          props.currentlat
          ? 
          props.requests.map((latlong,i) => (
          <Marker position={{lat: props.currentlat, lng: props.currentlng}} /> 
          ))
          : null
        }
          
    </GoogleMap>
  )
})

export default MapWithAMarker;
