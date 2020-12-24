
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    console.log("Geolocation is not supported by this browser.");
}

function showPosition(position) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://localhost:3000/stores/closest?latitude='
        + position.coords.latitude + '&longitude='+position.coords.longitude, false ); // false for synchronous request
    xmlHttp.send();
    alert(xmlHttp.responseText);
    console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
}
