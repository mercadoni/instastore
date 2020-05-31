import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import SideCard from './SideCard';
const config = require("../config/constants.json")


export class Maps extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="h-100">
                {
                    this.props.markers.store ? (
                        <SideCard markers={this.props.markers}/>
                    ):(
                        <div></div>
                    )
                    
                }
                {this.props.markers.store && this.props.markers.user ?
                    (
                        

                        <Map
                            google={this.props.google}
                            zoom={11}
                            style={{ width: '60%', height: '100%', position: 'relative', "margin-left": '40%' }}
                            className={'map'}
                            center={{
                                lat: (this.props.markers.user.latitude + this.props.markers.store.coordinates.latitude) / 2,
                                lng: (this.props.markers.user.longitude + this.props.markers.store.coordinates.longitude) / 2
                            }}
                        >
                            <Marker
                                icon={{
                                    url: "https://i.ibb.co/GR3g9vb/store.png",
                                }}
                                position={{
                                    lat: this.props.markers.store.coordinates.latitude,
                                    lng: this.props.markers.store.coordinates.longitude
                                }} />

                            <Marker

                                icon={{
                                    url: "https://i.ibb.co/3drQJTH/baseline-face-black-18dp.png",
                                }}
                                position={{
                                    lat: this.props.markers.user.latitude,
                                    lng: this.props.markers.user.longitude
                                }} />

                        </Map>
                    ) : (
                        <Map
                            google={this.props.google}
                            className={'map'}
                            zoom={17}
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                            initialCenter={{ lat: 7.095552899999999, lng: -73.10331029999999 }}
                        >

                            <Marker position={{ lat: 7.095552899999999, lng: -73.10331029999999 }} />

                        </Map>
                    )
                }




            </div >

        );
    }

}

export default GoogleApiWrapper({
    apiKey: config["maps-key"]
})(Maps);
