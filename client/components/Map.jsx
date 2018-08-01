import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import {GOOGLE_MAPS_API_KEY} from '../../config_example.js';

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%'}} />,
    containerElement: <div style={{ height: '600px'}} />,
    mapElement: <div style={{ height: '85%', width: '85%'}} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: -34, lng: 150 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: -34, lng: 150 }} />}
    </GoogleMap>
  );
});


export default Map;

