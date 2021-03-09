import React from 'react'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps'
import mapStyles from './mapStyles'


const Map = (props) => {
    console.log(props)
    const [selectedCenterHome, setSelectedCenterHome] = React.useState(null);
    const [selectedCenterStore, setSelectedCenterStore] = React.useState(null);
    return (
        <GoogleMap 
        defaultZoom={13}
        defaultCenter={{lat: props.coords.lat, lng: props.coords.lng}}
        defaultOptions={{styles: mapStyles}}
        >
        <Marker position={{ lat: props.coords.lat, lng: props.coords.lng}} icon={{url:"/insurance-agency.svg", color:"red"}} onClick={() => {setSelectedCenterHome(props)}}/>
        <Marker position={{ lat: props.coords.nearestStoreLat, lng: props.coords.nearestStoreLng}} icon={{url:"/grocery-or-supermarket.svg", color:"red"}} onClick={() => {setSelectedCenterStore(props)} }/>
        
        {selectedCenterHome && (
            <InfoWindow position={{ lat: selectedCenterHome.coords.lat, lng: selectedCenterHome.coords.lng}}
            onCloseClick={()=>{
                setSelectedCenterHome(null);
            }}>
                <div>
                    <p></p>
                    It's your home!
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </InfoWindow>
        )}

        {selectedCenterStore && (
            <InfoWindow position={{ lat: selectedCenterStore.coords.nearestStoreLat, lng: selectedCenterStore.coords.nearestStoreLng}}
            onCloseClick={()=>{
                setSelectedCenterStore(null);
            }}>
                <div>
                    <p><b>Id: </b>{selectedCenterStore.coords.storeId}</p>
                    <p><b>Store name: </b>{selectedCenterStore.coords.storeName}</p>
                    <p><b>Is Open? </b>{selectedCenterStore.coords.isOpen ? "Open now": "Closed"}</p>
                    <p><b>Latitude: </b>{selectedCenterStore.coords.nearestStoreLat}</p>
                    <p><b>Longitude: </b>{selectedCenterStore.coords.nearestStoreLng}</p>
                    <p><b>Next Delivery Time: </b>{selectedCenterStore.coords.nextDeliveryTime}</p>
                </div>
            </InfoWindow>
        )}
        </GoogleMap>
        
    )
    
}


export default withScriptjs(
    withGoogleMap(Map)
)