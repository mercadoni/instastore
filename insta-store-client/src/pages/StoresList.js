import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import * as storeActions from '../store/actions/store.action'
import { getLocation } from '../store/actions/location.action'
import 'mapbox-gl/dist/mapbox-gl.css';
import Store from "../components/Store"


export default () => {

    const stores = useSelector(state => state.stores.stores);
    const [error, setError] = useState()

    const [lat, setlat] = useState(0)
    const [lng, setLng] = useState(0)

    const dispatch = useDispatch()
    const dispatchLocation = useDispatch()


    
    const loadLocation = useCallback(
        async () => {
            try {
                setError(null)


                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        setlat(position.coords.latitude)
                        setLng(position.coords.longitude)
                        dispatchLocation(getLocation(position.coords.latitude, position.coords.longitude))
                    });
                } else {
                }

            } catch (error) {
                setError(error)

            }
        },
        [dispatchLocation],
    )

    const loadStores = useCallback(

        async () => {
            setError(null)

            try {
                await dispatch(storeActions.fetchStores())

            } catch (error) {
                setError(error)

            }
        },
        [dispatch],
    )
    useEffect(() => {
        loadStores()
        loadLocation()

    }, [dispatch, loadStores,loadLocation,dispatchLocation])



    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoianNpZXJyYXYiLCJhIjoiY2s3M2xodTh6MDB0ajNtcW9rN2pxaHE0cCJ9.z_ao_vuWyKoOvTeBYo63Bg'
    });



    console.log(lat, lng);

    return (
        <div className="cont-map">

            <h3>All stores</h3>
            <hr />
            {error ? <div className="alert alert-danger" role="alert">
           Somenting went wrong
          </div> : 
            <div>
             <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Map</button>

                </li>
                <li className="nav-item">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">List</button>
                </li>

            </ul>



            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <Map
                        style="mapbox://styles/mapbox/streets-v9"
                        containerStyle={{
                            height: '100vh',
                            width: '100vw'
                        }}
                        center={[lng, lat]}
                    ><Marker
                        coordinates={[lng, lat]}
                        anchor="bottom">
                            <label>Mi ubicacion</label>

                            <img src=" https://img.icons8.com/color/48/000000/marker.png" />
                        </Marker>
                        {stores.map((store, index) => {
                            return <Marker key={index}
                                coordinates={[store.lng, store.lat]}
                                anchor="bottom">

                                <img src=" https://img.icons8.com/color/48/000000/marker.png" alt="" />
                                <label>{store.storeName}</label>
                            </Marker>
                        })}

                    </Map>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div>

                        {stores.map((store, index) => {

                            return <Store key={index} storeName={store.storeName} nextDeliveryTime={store.nextDeliveryTime} isOpen={store.isOpen} />

                        })}

                    </div>
                </div>
            </div>
            </div>
        }
           

        </div>

    )

}