import {useState} from 'react'
import Store from "../components/Store"
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


export default () => {

    const [lat, setlat] = useState(0)
    const [lng, setlng] = useState(0)
    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoianNpZXJyYXYiLCJhIjoiY2s3M2xodTh6MDB0ajNtcW9rN2pxaHE0cCJ9.z_ao_vuWyKoOvTeBYo63Bg'
    }); 
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            setlat(position.coords.latitude)
            setlng(position.coords.longitude)
        });
    } else {
    }

    return (




        // in render()
        <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '100vh',
                width: '100vw'
            }}
        >
            <Marker
                coordinates={[lng, lat]}
                anchor="bottom">

                <img src=" https://img.icons8.com/color/48/000000/marker.png" />
            </Marker>
        </Map>


    )

}