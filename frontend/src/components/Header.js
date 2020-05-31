import React, { Component } from 'react'

export default class Header extends Component {

    render() {
        return (
            <section className="header position-absolute w-100">
                <nav className="navbar">
                    <div className="container">
                        <h3 className="logo mt-2 d-none d-sm-block">
                            <i className="fa fa-store icon pr-2"></i>
                            InstaStore
                        </h3>

                        <h5 className="logo p-1 d-block d-sm-none">
                            <i className="fa fa-store icon pr-2"></i>
                            InstaStore
                        </h5>
                    </div>
                </nav>
            </section >
        );
    }

}

