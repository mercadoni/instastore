const Store= (props) =>{


    return(
        <div  className="list-group-item list-group-item-action" aria-current="true">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{props.storeName}</h5>
          <small>{props.nextDeliveryTime}</small>
        </div>
        <p className="mb-1">Some placeholder content in a paragraph.</p>
        <small>
        <div className="form-check form-switch" >
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={props.isOpen} readOnly/>
        <label className="form-check-label" for="flexSwitchCheckDefault">{props.isOpen ? "Open" : "Closed"}</label>
      </div>
      </small>
      </div>
    )


}
export default Store