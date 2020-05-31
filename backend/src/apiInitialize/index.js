const express = require('./express');
const firebase = require('./firebase');


exports.initialize = async(app)=>{
  await firebase.initialize();  
  express.initialize(app);  
}
 
