import React from 'react';
import { compose, withProps, withHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import {GOOGLE_MAPS_API_KEY} from '../../config_example.js';

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%'}} />,
    containerElement: <div style={{ height: '600px'}} />,
    mapElement: <div style={{ height: '85%', width: '85%'}} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    }
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  let {latitude, longitude} = props.cafes[0].coordinates;
  
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: latitude, lng: longitude }}
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {props.cafes.map((cafe) => {
          return (
            <Marker
              key={cafe.id}
              position={{ lat: cafe.coordinates.latitude, lng: cafe.coordinates.longitude }}
            />
          );
        })}
      </MarkerClusterer>
    </GoogleMap>
  );
});

export default Map;

