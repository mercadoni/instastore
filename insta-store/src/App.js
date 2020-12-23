import React, { Component } from "react"
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { spacing } from '@material-ui/system';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat:4.68284,
  lng: -74.045
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      newItem:"",
      list:[]
    }
  }

  render() {

    var lat;
    var lng;


    function  obtainLocation() {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function(position) {
            userLocation(position.coords.latitude,position.coords.longitude)
          });
        }else {
          alert("please activate the location in your device and try again")
        }
      }
    function userLocation(laat, long) {
      document.getElementById("txt1").innerHTML = " we are finding it for you... ";
      document.getElementById("txt2").innerHTML = "please wait";
      //document.getElementById("txt2").innerHTML = laat + ' , ' + long; // A location that means somthng
      lat = laat;
      lng = long

      const center = {
        lat: laat,
        lng: long
      };
      setTimeout(function () {
        closestStore("wok")
      }, 4000);
    }

    function compare2Points(p1,p2){ // EACH PINT IS AN LAT,LNG ARRAY
      var rad = function(x) {
        return x * Math.PI / 180;
      };

      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(p2[0] - p1[0]);
      var dLong = rad(p2[1] - p1[1]);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(p1[0])) * Math.cos(rad(p2[0])) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      //return d; // returns the distance in meter
      return Math.round(d); //Rounded is better
    }
/*
    function rankDistance(){
      var rank = [];
      for (var i = 0; i < stores.length; i++) {
       //rank.push.(compare2Points([lat,lng],[stores[i].lat,[stores[i].lng]),stores[i].name)
      }

    //sortttt
      return rank[0];
    }*/

    function closestStore(rank){
      document.getElementById("txt1").innerHTML = "nearest store is:";
      document.getElementById("txt2").innerHTML = "Wok<p>is open:☑</p> <p>next delivery: 45 min.</p><p>lat: "+lat.toPrecision(6)+"<p>lng:"+lng.toPrecision(6)+"</p><p>tel: (+57)895745</p><p>email: wok@delivery.com</p>";
      document.getElementById("button").innerHTML = "try again";
    }


    return (
      <div className="App">
        <header className="App-header">
          <Card pxy={10} elevation={4} bgcolor="gray" >
            <LocationOnIcon fontSize="large" />
          <h3> InstaStore </h3>
          <p id="txt1">let's find the closest store!</p>
          <p id="txt2">please allow us to know your location</p>
          <Button id="button" variant="contained" onClick={obtainLocation} startIcon={<LocationOnIcon />}>allow</Button>
          </Card>
          <div id="mapa">
          <LoadScript googleMapsApiKey="AIzaSyCe7cxHG3f8zxBrc5rV9m3fAqMPIZxv7Qc">
        <GoogleMap display= {false}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
        ></GoogleMap>
      </LoadScript>
          </div>

        </header>
      </div>
    );
  }
}
export default App;
