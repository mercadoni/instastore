/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
    Button,
    Label,
    FormGroup,
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    Card,
    Form
  } from "reactstrap";
  
  // core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import StoreNavbar from "components/Navbars/StoreNavbar.js";
import StoresPageHeader from "components/Headers/StoresPageHeader.js";


function getCoordinates() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

async function getPoint(){
    const position = await getCoordinates(); 
    console.log(position);
    const apiUrl = 'http://localhost:3000/store/closest';
    fetch(apiUrl, {
    //crossDomain:false,
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({

        "expectedDelivery":"2020",
        "destination": {  
            "name": "string",  
            "address": "string",  
            "address_two": "string",  
            "description": "string",  
            "country": "string",  
            "city": "string",  
            "state": "string",  
            "zip_code": "string",  
            "latitude": position.coords.latitude,  
            "longitude": position.coords.longitude,
            "accuracy": position.coords.accuracy,
         }
    })
  })
  .then((response) => response.json())
  .then((data) => console.log('This is your data', data));
}

function StoresPage() {

    const [activeTab, setActiveTab] = React.useState("1");
  
    const toggle = (tab) => {
      if (activeTab !== tab) {
        setActiveTab(tab);
      }
    };

    getPoint();
    
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("landing-page");
        return function cleanup() {
        document.body.classList.remove("landing-page");
        };
    });

    

    
    
    

  return (
    <>
      <StoreNavbar />
      <div className="main">

        <Container>
            
        
          <Row>
            <Col className="ml-auto mr-auto" >
              <Card className="card-register ml-auto mr-auto">
                
              </Card>
            </Col>
          </Row>
        </Container>
    </div>
    </>
  );
}

export default StoresPage;