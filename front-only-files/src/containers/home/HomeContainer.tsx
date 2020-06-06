import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeView from "./HomeView";
import { IDestination, SearchNearestBy } from "types/destinationTypes";
import { RootState } from "redux/store";
import { IStore } from "types/storeTypes";
import { nearestStore, storeByCity } from "redux/ducks/stores/storesSlice";
import { sentDestinationToApi } from "redux/ducks/destination/destinationSlice";

interface IHomeProps {}

const HomeContainer = ({}: IHomeProps) => {
  const defaultCenter = { lat: 1.3521, lng: 103.8198 };
  const dispatch = useDispatch();
  const destination: IDestination = useSelector(
    (state: RootState) => state.destination.destination
  );
  const stores: Array<IStore> =
    useSelector((state: RootState) => state.stores.cityStores) || [];

  const nearest: IStore | undefined = useSelector((state: RootState) =>
    state.destination.filters.searchBy === SearchNearestBy.distance
      ? state.stores.nearest.distance
      : state.stores.nearest.time
  );

  const [mapServices, setMapServices] = useState<any>({});
  const [locationLoaded, setLocationLoaded] = useState(false);

  const setGMapsServices = (gServices: any) => {
    let center = new gServices.maps.LatLng(
      defaultCenter.lat,
      defaultCenter.lng
    );

    //This one could be dalayed but is not a promise, so setState inside again
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = pos.coords;
          center = new gServices.maps.LatLng(coords.latitude, coords.longitude);
          setMapServices({ ...gServices, mapInitialLatLng: center });
          setLocationLoaded(true);
        },
        (error) => {
          console.error("Cant Get Position", error);
        }
      );
    }
    setMapServices({ ...gServices, mapInitialLatLng: center });
  };

  useEffect(() => {
    console.log("the new map service is", mapServices);
  }, [mapServices]);

  const onDestinationSubmit = (destination: IDestination) => {
    console.log("the submit is, ", destination);
    dispatch(sentDestinationToApi(destination));
    dispatch(nearestStore(destination));
  };

  const getAllStoresInCity = (city: string) => {
    if (city === undefined || city === "") {
      return;
    }
    dispatch(storeByCity(city));
  };

  return (
    <HomeView
      onApiLoad={setGMapsServices}
      nearest={nearest}
      mapServices={mapServices}
      destination={destination}
      storesList={stores || []}
      onDestinationSubmit={onDestinationSubmit}
      locationLoaded={locationLoaded}
      getAllStoresInCity={getAllStoresInCity}
    ></HomeView>
  );
};

export default HomeContainer;
