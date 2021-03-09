import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStore } from '../service/getClosestStore.service';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
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
            closingDate: null,
            openingDate: null,
            email: null,
            queuedOrders: null,
            storePhoneNumber: null,
            storeAddress: null
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
            distance: Math.round(data.data.distance),
            storePhoneNumber: data.data.storePhoneNumber,
            email: data.data.email,
            openingDate: data.data.openingDate,
            closingDate: data.data.closingDate,
            queuedOrders: data.data.queuedOrders,
        })
        this.getStoreAddress()
        }
    }

    getUserAddress(){
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lng}&sensor=false&key=${process.env.REACT_APP_GOOGLE_KEY}`)
        .then(response => response.json())
        .then(data => this.setState({
            userAddress: data.results[1].formatted_address,
            blocking: false
        }))
        .catch(error => alert(error))
    }

    getStoreAddress(){
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.nearestStoreLat},${this.state.nearestStoreLng}&sensor=false&key=${process.env.REACT_APP_GOOGLE_KEY}`)
        .then(response => response.json())
        .then(data => this.setState({
            storeAddress: data.results[2].formatted_address
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
                { this.state.userAddress ? <h2> <b>·Current address:</b> {this.state.userAddress} </h2> : null }
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
                    <Table striped bordered hover>
                    <tbody>
                        <tr>
                        <td>Store Name</td>
                        <td>{this.state.storeName}</td>
                        </tr>
                        <tr>
                        <td>Store Address</td>
                        <td>{this.state.storeAddress}</td>
                        </tr>
                        <tr>
                        <td>Is Open?</td>
                        <td>{this.state.isOpen ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                        <td>Next Delivery Time</td>
                        <td>{this.state.nextDeliveryTime}</td>
                        </tr>
                        <tr>
                        <td>Store Phone Number</td>
                        <td>{this.state.storePhoneNumber}</td>
                        </tr>
                        <tr>
                        <td>Store Email</td>
                        <td>{this.state.email}</td>
                        </tr>
                        <tr>
                        <td>Hours of operation</td>
                        <td>{this.state.openingDate} - {this.state.closingDate}</td>
                        </tr>
                        <tr>
                        <td>Queued Orders</td>
                        <td>{this.state.queuedOrders}</td>
                        </tr>
                        <tr>
                        <td>Distance</td>
                        <td>{this.state.distance} m</td>
                        </tr>
                    </tbody>
                    </Table>
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
