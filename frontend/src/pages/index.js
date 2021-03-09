import React from 'react'
// import Map from './Map'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStore } from '../service/getClosestStore.service';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import PlacesAutoComplete from '../components/PlacesAutoComplete/PlacesAutoComplete'
import Map from '../components/Map/Map'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_KEY}`;

const errorToast = (errorMessage) => toast.error(errorMessage);

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lat: null,
            lng: null,
            userAddress: null,
            nearestStoreLat: null,
            nearestStoreLng: null,
            storeId: null,
            storeName: null,
            isOpen: null,
            nextDeliveryTime: null,
            distance: null,
            isShowingAddressInput: true,
            blocking: true,
        }
        this.toggleBlocking = this.toggleBlocking.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.getUserAddress = this.getUserAddress.bind(this);
        this.getClosestStore = this.getClosestStore.bind(this);
        this.handleLocationEvent = this.handleLocationEvent.bind(this);
    }

      toggleBlocking() {
        this.setState({blocking: !this.state.blocking});
    }

    getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationEvent);
        } else {
            alert("Gelocation is not supported by this browser.")
        }
    }

    getCoordinates(position){
        this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        })
        this.getUserAddress()
    }

    async getClosestStore(){
        this.setState({
            isShowingAddressInput: false
        })
        let request = {
            lat: this.state.lat,
            lng: this.state.lng
        }
        const data = await getStore(request);
        if (data.status === 400){
            errorToast(data.message)
        }else{
        this.setState({
            nearestStoreLat: data.data.coordinates.lat,
            nearestStoreLng: data.data.coordinates.lng,
            storeId: data.data.storeId,
            storeName: data.data.storeName,
            isOpen: data.data.isOpen,
            nextDeliveryTime: data.data.nextDeliveryTime,
            distance: Math.round(data.data.distance)
        })
        }
    }

    getUserAddress(){
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lng}&sensor=false&key=${process.env.REACT_APP_GOOGLE_KEY}`)
        .then(response => response.json())
        .then(data => this.setState({
            userAddress: data.results[0].formatted_address,
            blocking: false
        }))
        .catch(error => alert(error))
    }

    handleLocationEvent(error){
        this.setState({
            blocking: false
        })
        switch(error.code) {
            case error.PERMISSION_DENIED:
            errorToast("User denied the request for Geolocation.")
            break;
            case error.POSITION_UNAVAILABLE:
            errorToast("Location information is unavailable.")
            break;
            case error.TIMEOUT:
            errorToast("The request to get user location timed out.")
            break;
            case error.UNKNOWN_ERROR:
            errorToast("An unknown error occurred.")
            break;
        default:
            errorToast("An unknown error occurred.")
        }
    }   

    handleSelect = (placeValue) => {
        this.setState({
            lat: placeValue.lat,
            lng: placeValue.lng,
        })
        this.getUserAddress()
    }

    render(){
        return(
            <div className="App">
            <BlockUi style={{height: '87vh'}} tag="div" blocking={this.state.blocking}>
            <div style={{textAlign:'center',marginTop:'20px'}} >
                { this.state.userAddress ? <p> <b>·Current address:</b> {this.state.userAddress} </p> : null }
            </div>
            <div style={{textAlign:'center',marginTop:'20px'}} >
                { this.state.isShowingAddressInput ? <PlacesAutoComplete onSelectPlace={this.handleSelect} style={{textAlign:'center'}}/> : null}
            </div>
                {
                    this.state.lat && this.state.lng && this.state.nearestStoreLat && this.state.nearestStoreLng ?
                    <Map
                    googleMapURL= {mapURL}
                    containerElement= {<div style = {{height: '400px',width: '75%',margin: '0 auto'}} />}
                    mapElement= {<div style={{height: '100%'}} />}
                    loadingElement= {<p> Cargando </p>}
                    coords = {this.state}
                    />
                    :
                    null
                }
                <div style={{textAlign:'center', marginTop:'20px'}}>

                { this.state.isShowingAddressInput ? <Button variant="success" onClick={this.getClosestStore}>Get Closest Store</Button>: null}

                    <ToastContainer />
                    <div style={{width: '75%',margin: '0 auto',textAlign: 'initial',border: '1px solid black',borderRadius: '20px',padding: '15px',marginTop: '20px'}}  className={this.state.lat && this.state.lng && this.state.nearestStoreLat && this.state.nearestStoreLng ? '' : 'hidden'}>
                    { this.state.userAddress ? <p> <b>·Current address:</b> {this.state.userAddress} </p> : null }
                    <p> <b>·Closest Store name:</b> {this.state.storeName}</p>
                    <p> <b>·Next Delivery Time:</b> {this.state.nextDeliveryTime}</p>
                    <p> <b>·Distance of the store from your home:</b> {this.state.distance} m.</p>
                    </div>
                </div>
                </BlockUi>
            </div> 
        )
    }

    componentDidMount() {
        this.getLocation()
    }
}


export default Home
