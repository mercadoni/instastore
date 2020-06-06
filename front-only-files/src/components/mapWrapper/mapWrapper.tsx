import React, { useState, useEffect } from "react";
import MapMarker from "components/mapMarker/mapMarker";
import GoogleMap from "components/googleMap/googleMap";
import {
  IMapCenter,
  IMarker,
  IGMapCoordinates,
  gMapsServices,
} from "types/mapTypes";

interface IMapWrapperProps {
  userMarker: IMarker;
  storesMarkers: Array<IMarker>;
  onApiLoad: (gServices: gMapsServices) => void;
  mapCenter: IMapCenter;
  onMarkerMove: (location: IGMapCoordinates) => void;
  zoom?: number;
}

const MapWrapper: React.FC<IMapWrapperProps> = ({
  userMarker,
  storesMarkers,
  onApiLoad,
  mapCenter,
  onMarkerMove,
  zoom,
}: IMapWrapperProps) => {
  const [mapOptions, setmapOptions] = useState({
    draggable: true,
  });
  const defaultZoom = 11;
  const defaultHooverDistance = 50;
  const [draggableMarker, setDraggableMarker] = useState<IMarker>(userMarker);

  useEffect(() => {
    setDraggableMarker(userMarker);
    console.log(userMarker, storesMarkers);
  }, [userMarker, storesMarkers]);

  const onMarkerMoveStart = (childKey: any, childProps: any, mouse: any) => {
    if (draggableMarker.id != childKey) {
      return;
    }
    setmapOptions({
      ...mapOptions,
      draggable: false,
    });
    setDraggableMarker({
      ...draggableMarker,
      coordinates: {
        latitude: mouse.lat,
        longitude: mouse.lng,
      },
    });
  };
  const onMarkerRelease = (childKey: any, childProps: any, mouse: any) => {
    setmapOptions({ ...mapOptions, draggable: true });
    onMarkerMove({
      lat: mouse.lat,
      lng: mouse.lng,
    });
  };

  const onChange = ({ center, zoom }) => {};

  const onChildMouseEnter = (key, childProps) => {};

  const onChildMouseLeave = (key, childProps) => {};

  const onClick = (value) => {};

  const distanceToMouse = (markerPos, mousePos, markerProps) => {
    const x = markerPos.x;
    const y = markerPos.y;
    return Math.sqrt(
      (x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y)
    );
  };

  const apiHasLoaded = ({ map, maps, ref }) => {
    onApiLoad({
      maps,
      autoCompleteService: new maps.places.AutocompleteService(),
      placesService: new maps.places.PlacesService(map),
      directionService: new maps.DirectionsService(),
      geoCoderService: new maps.Geocoder(),
    });
  };

  const Markers =
    draggableMarker &&
    storesMarkers &&
    [
      draggableMarker,
      ...storesMarkers,
    ].map((marker: IMarker, index: number) => (
      <MapMarker
        key={index}
        lat={marker.coordinates.latitude}
        lng={marker.coordinates.longitude}
        type={marker.type}
        onClick={onClick}
      />
    ));

  return (
    <GoogleMap
      center={mapCenter.center}
      defaultZoom={zoom ? zoom : defaultZoom}
      yesIWantToUseGoogleMapApiInternals={true}
      onGoogleApiLoaded={apiHasLoaded}
      onChildMouseEnter={onChildMouseEnter}
      onChildMouseLeave={onChildMouseLeave}
      onClick={onClick}
      draggable={mapOptions.draggable}
      onChange={onChange}
      onChildMouseDown={onMarkerMoveStart}
      onChildMouseUp={onMarkerRelease}
      onChildMouseMove={onMarkerMoveStart}
      hoverDistance={defaultHooverDistance}
      distanceToMouse={distanceToMouse}
    >
      {Markers}
    </GoogleMap>
  );
};

export default MapWrapper;
