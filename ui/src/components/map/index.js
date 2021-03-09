import React, { useEffect, useState, useCallback } from "react";
import { getClosestStore } from "../../services/stores";
import GoogleMapReact from "google-map-react";
import StoreImage from '../../assets/store.png'
import { API_KEY } from "../../config";
import "./index.css";

const OPTIONS_MAP = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export function Map() {
  const [currentCoords, setCurrentCoords] = useState({ lat: null, lon: null });

  const [stores, setStores] = useState({
    loading: false,
    errors: {},
    closestStore: {},
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const onSuccess = ({ coords }) => {
    setCurrentCoords({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  };

  const onError = () => setShowErrorMessage(true);

  const fetchClosestStore = useCallback(async (lat, lon) => {
    setStores({
      ...stores,
      loading: true,
    });
    try {
      const { data } = await getClosestStore(lat, lon);
      setStores({
        ...stores,
        closestStore: data?.stores,
      });
    } catch (error) {
      console.log("error", error);
      setStores({
        ...stores,
        errors: {
          description: "Error",
          status: error?.response?.status,
        },
      });
    }
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(onSuccess);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              onSuccess,
              onError,
              OPTIONS_MAP
            );
          } else if (result.state === "denied") {
            onError();
          }
        });
    } else {
      alert("Map is not available");
    }
  });

  useEffect(() => {
    if (currentCoords.lat && currentCoords.lng && !stores.closestStore?.store && !stores.loading) {
      fetchClosestStore(currentCoords.lat, currentCoords.lng);
    }
  }, [currentCoords]);

  if (!currentCoords.lat || !currentCoords.lng) {
    return <div> loading ...</div>;
  }

  if (showErrorMessage) {
    return (
      <div>
        {showErrorMessage && <p>{showErrorMessage.message}</p>}
        {showErrorMessage.status && <p>{showErrorMessage.status}</p>}
      </div>
    );
  }

  const renderClosestStore = (map, maps) => {
    const {
      closestStore: { store },
    } = stores;

    const marker = new maps.Marker({
      position: { lat: store?.coordinates?.lat, lng: store?.coordinates?.lon },
      map,
    });

    const infowindow = new maps.InfoWindow();
    const content =
      "Name: " +
      store.name +
      "<br/>Is open: " +
      store.isOpen +
      "<br/>Phone: " +
      store.phone +
      "<br/>Email: " +
      store.email +
      "<br/>Latitude: " +
      store.coordinates.lat +
      "<br/>Longitude: " +
      store.coordinates.lon;

    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  return (
    <div className="container-map">
      <div className="navbar">
        <span>Store</span>
        <img alt="Store" className="store-icon" src={StoreImage} />
      </div>
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={{
            lat: currentCoords.lat,
            lng: currentCoords.lng,
          }}
          defaultZoom={8}
          onGoogleApiLoaded={({ map, maps }) => {
            stores?.closestStore && renderClosestStore(map, maps);
          }}
        />
      </div>
    </div>
  );
}
