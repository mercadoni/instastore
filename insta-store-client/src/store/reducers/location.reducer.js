import { COORDINATES } from "../actions/location.action"

const initialState = {
   
    location:{}
}

const locationReducer= (state=initialState, action)=>{
    switch(action.type){

        case COORDINATES:{
            
            return {
               location:{
                   lat:action.lat,
                   lng:action.lng
               }
            }
        }
        default:

    }
    return state
}
export default locationReducer