import React from 'react'
import PlacesAutocomplete,{  geocodeByAddress,
  getLatLng,} from 'react-places-autocomplete';

export default function App({onSelectPlace}){
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({lat: null, lng: null})
    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        setAddress(value)
        setCoordinates(latLng)
        onSelectPlace(latLng);
    }
    

    return (
        <div>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
            {({getInputProps, suggestions, getSuggestionItemProps, loading})=>
            (<div style={{textAlign:'center'}}>
                <input style={{width:'60%', height:'40px'}} {...getInputProps({placeholder: "Type your address/another address"})} />
                <div style={{border:'1px solid black', width:'60%',textAlign:'center',margin:'0 auto'}}>
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map(suggestion => {
                        const style = {
                        backgroundColor: suggestion.active ? "#2bde73" : "#fff"
                        };

                        return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                            {suggestion.description}
                        </div>
                        );
                    })}
                </div>
            </div>
            )}
            </PlacesAutocomplete>
        </div>
    )
}