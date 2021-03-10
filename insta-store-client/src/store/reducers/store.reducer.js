import {SET_STORES} from '../actions/store.action'
import {NEAREST_RESTAURANT} from '../actions/store.action'
const initialState = {
    stores:[],
    nearStore:{}
}
const storeReducer =  (state=initialState, action)=>{
    switch(action.type){

        case SET_STORES:{
            
            return {
                stores:action.stores,
                nearStore:{...state.nearStore}
            }
        }

        case NEAREST_RESTAURANT:{
            return {
                stores:state.stores,
                nearStore:action.nearStore
            }
        }
        default:
      


    }  
    return state
}

export default storeReducer