import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

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
     document.getElementById("txt1").innerHTML = "your location is:";
     document.getElementById("txt2").innerHTML = laat + ' , ' +long; // A location that means somthng
     lat = laat;
     lng = long
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

    function rankDistance(){
      var rank = [];
      for (var i = 0; i < stores.length; i++) {
       //rank.push.(compare2Points([lat,lng],[stores[i].lat,[stores[i].lng]),stores[i].name)
      }

    //sortttt
      return rank[0];
    }

    function closestStore(rank){
      document.getElementById("txt1").innerHTML = "la tienda más cercana es";
      document.getElementById("txt2").innerHTML = rank; // A location that means somthng
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1> InstaStore </h1>
          <p id="txt1">let's find the closest store!</p>
          <p id="txt2">please allow us to know your location</p>
          <Button variant="contained" onClick={obtainLocation}>allow</Button>
        </header>
      </div>
    );
  }
}




export default App;
