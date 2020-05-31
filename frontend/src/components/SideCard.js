import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = { showCard: false }
    }

    render() {
        return (

            <section className="sidecar-left position-absolute">
                {this.props.markers ?
                    (
                        <div className={`card ${this.props.markers ? 'showCard' : ''}`}>

                            <div class="card-body">
                                <h5 class="card-title">{this.props.markers.store.storeId}</h5>
                                <p class="card-text">{this.props.markers.store.storeName}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Abierto?
                        {
                                        (this.props.markers.store.isOpen ?
                                            <span class="badge badge-success ml-1">Si</span> :

                                            <span class="badge badge-danger ml-1">No</span>
                                        )
                                    }
                                </li>
                                <li class="list-group-item">Coordenadas: {this.props.markers.store.coordinates.latitude}, {this.props.markers.store.coordinates.longitude}</li>
                                <li class="list-group-item">
                                    Si ordenas en esta tienda recibiras tu pedido entre las {this.props.markers.store.nextDeliveryTime.bestDeliveryTime} y las {this.props.markers.store.nextDeliveryTime.worstDeliveryTime}

                                </li>
                            </ul>
                            <div class="card-body">
                                <a onClick={()=>{toast.info("Estamos trabajando en eso")}}
                                    class="btn btn-persian-indigo color-cultured">
                                    Ordenar
                                     </a>
                            </div>
                        </div>
                    ) :
                    (
                        <div></div>
                    )
                }

            </section>
        );
    }

}

