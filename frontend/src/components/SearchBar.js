import React, { Component } from 'react'
import { toast } from 'react-toastify';
const config = require("../config/constants.json")

export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = { address: '', location: {}, store: []}
        
    }

    handleChange = (event) => {
        this.setState({ address: event.target.value });
    }
    searchStore = () => {
        let location = {
            latitude: this.state.location.lat,
            longitude: this.state.location.lng,
        }
        fetch(`${config.endpoint}/api/stores/getClosest`, {
            method: "POST",
            body: JSON.stringify(location),
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        }).then((resp) => {
            return resp.json()
        }).then((data) => {

            if (data.status === "OK") {
                this.setState(
                    {
                        store: data
                    }
                );
                this.props.onFindStore(data, location)
                toast.success("Esperamos que disfrutes tu compra.");
            } else {
                toast.info("No pudimos encontrar tienda cerca a tudirección, pero puedes intentar con otra");
            }

        }).catch((error) => {
            toast.error("Algo salio mal, por favor vuelve a intentarlo")
        })
    }
    searchAddress = () => {
        fetch(`${config.endpoint}/api/users/getLocation`, {
            method: "POST",
            body: JSON.stringify({
                "address": this.state.address
            }),
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        }).then((resp) => {
            return resp.json()
        }).then((data) => {
            if (data.location.status === "OK") {
                this.setState(
                    {
                        location: data.location
                    }
                );
                localStorage.setItem("location", data.location);
                localStorage.setItem("address", this.state.address);
                this.searchStore();
            } else {
                toast.info("No pudimos encontrar tu dirección, prueba añadiendo algún detalle, como tu ciudad, estado o pais");
            }
        }).catch((error) => {
            toast.error("Algo salio mal, por favor vuelve a intentarlo")
        })
    }

    render() {
        return (
            <section id="searchbar" className={`searchbar w-100 offset-md-6 position-absolute ${this.props.showSearchBar ? 'show' : ''}`}>
                <div className="col-12 col-md-6">

                    <div className="input-group mb-3">

                        <input
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Tu Dirección"
                        />
                        <div className="input-group-append">
                            <button
                                onClick={this.searchAddress}
                                type="button"
                                className="btn color-cultured w-100 bg-persian-indigo">
                                <i className="fas fa-search-location color-cultured"></i>
                            </button>

                        </div>

                    </div>
                </div>

            </section >

        );
    }

}

