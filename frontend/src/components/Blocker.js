import React, { Component } from 'react'
import { toast } from 'react-toastify';
const config = require("../config/constants.json")

export default class Blocker extends Component {

    constructor(props) {
        super(props);
        this.state = { address: '', fade: '', location: {}, fadebg: '', store: [] }
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
                        fadebg: "fade",
                        store: data
                    }
                );
                this.props.onFindStore(data, location)
                toast.success("Esperamos que disfrutes tu compra.");
            } else {
                toast.info("No pudimos encontrar tienda cerca a tudirección, pero puedes intentar con otra");
            }

            setTimeout(() => {
                this.setState({ fadebg: "fade d-none" });
                document.getElementById("searchbar").classList.add("show");
            }, 600);

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
                        fade: "fade",
                        location: data.location
                    }
                );
                localStorage.setItem("location", data.location);
                localStorage.setItem("address", this.state.address);
                setTimeout(() => {
                    toast.success("Allá vamos");
                    this.setState({ fade: "fade d-none" });
                }, 600);
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
            <section className={`signin w-100 h-100 position-absolute ${this.state.fade}`}>
                <div className={`bg w-100 h-100 position-absolute  ${this.state.fade}`}></div>
                <form className={`form-sign position-relative ${this.state.fade}`}>
                    <div className="mb-5">
                        <h2 className="logo">
                            <i className="fa fa-store icon pr-2"></i>
                                    InstaStore
                            </h2>
                        <small className="text-center color-persian-indigo m-auto d-block">Tu tienda favorita al Insante!</small>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label className="colo-pacific-blue-dark pt-2 d-block text-center">
                                <small>Para una mejor experiencia, incluye tu ciudad y estado</small>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-7">
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Tu Dirección"
                                />

                            </div>
                        </div>
                        <div className="col-12 col-md-5">
                            <button onClick={this.searchAddress}
                                type="button"
                                className="btn btn-persian-indigo color-cultured w-100">
                                <small>Buscar Tienda Cercana</small>
                            </button>
                        </div>
                    </div>

                </form>
            </section >

        );
    }

}

