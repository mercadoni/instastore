import React from 'react'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker
} from 'react-google-maps'

const Map = (props) => {
    return (
        <GoogleMap 
        defaultZoom={13}
        defaultCenter={{lat: props.coords.lat, lng: props.coords.lng}}
        >
        <Marker position={{ lat: props.coords.lat, lng: props.coords.lng}} />
        <Marker position={{ lat: props.coords.nearestStoreLat, lng: props.coords.nearestStoreLng}} />
        </GoogleMap>
    )
}

export default withScriptjs(
    withGoogleMap(Map)
)