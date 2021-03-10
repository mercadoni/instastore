import { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import * as storeActions from '../store/actions/store.action'
import Store from '../components/Store'
import 'mapbox-gl/dist/mapbox-gl.css';

const ClosetsStore=() => {
    const store = useSelector(state => state.stores.nearStore);
    const location = useSelector(state => state.location.location);
    const [error, setError] = useState()

    const dispatch = useDispatch()

    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoianNpZXJyYXYiLCJhIjoiY2s3M2xodTh6MDB0ajNtcW9rN2pxaHE0cCJ9.z_ao_vuWyKoOvTeBYo63Bg'
    });

    const nearStore = useCallback(
        async () => {
            setError(null)

            try {
                await dispatch(storeActions.getStore(location.lat, location.lng))

            } catch (error) {
                setError(error)

            }
        },
        [dispatch],
    )

    useEffect(() => {
        nearStore()

    }, [dispatch, nearStore])



    console.log(store)
    return (
        <div className="container">
        {error ? <div className="alert alert-danger" role="alert">
        Somenting went wrong
       </div> :  <div className="row">
         <div className="col-md-12">
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: '70vh',
                        width: '70vw'
                    }}
                    center={[store.lng, store.lat]}
                ><Marker
                    coordinates={[store.lng, store.lat]}
                    anchor="bottom">
                        <label>{store.storeName}</label>

                        <img src=" https://img.icons8.com/color/48/000000/marker.png" />
                    </Marker>

                </Map>
            </div>


            <div className="col-md-12">
             
            <Store storeName={store.storeName} nextDeliveryTime={store.nextDeliveryTime} isOpen={store.isOpen} />
            </div>
        </div>}
           
            
            </div>
    )
}

export default ClosetsStore