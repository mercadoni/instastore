import { Link } from "react-router-dom"

export default (props) => {


    return (
        <div>
            <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" >Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/restaurants" >Nearby restaurants</Link>
                            </li>
                            <li classNameName="nav-item">
                                <Link className="nav-link" to="/nearest" >Nearest Restaurant</Link>
                            </li>
                           
                           
                        </ul>
                       
                    </div>
                </div>
            </nav>


        </div>
    )


}