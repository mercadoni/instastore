import StoreModel from "../../models/StoreModel"
import {get} from '../../client/index'
export const SET_STORES = "SET_STORES"
export const NEAREST_RESTAURANT="NEAREST_RESTAURANT"

export const fetchStores = () => {

    return async (dispatch) => {
        try {
           
            const response = await get('stores')

            if (!response.ok) {
                throw new Error('Somenting was wrong')
            }

            const data = await response.json()
            const loadedStores = [];

            for (const key in data) {
                loadedStores.push(
                    new StoreModel(
                        data[key].storeId,
                        data[key].storeName,
                        data[key].isOpen,
                        data[key].lat,
                        data[key].lng,
                        data[key].nextDeliveryTime


                    ))
            }
            dispatch(
                {
                    type: SET_STORES,
                    stores: loadedStores,
                }
            )

        } catch (error) {
            throw error
        }
    }


}

export const getStore = (lat,lng) => {

    return async (dispatch) => {
        try {
            const response = await get(`stores/${lat}/${lng}`)


            if (!response.ok) {
                throw new Error('Somenting was wrong')
            }

            const data = await response.json();

        console.log(data)

                   const store = new StoreModel(
                        data.store.storeId,
                        data.store.storeName,
                        data.store.isOpen,
                        data.store.lat,
                        data.store.lng,
                        data.store.nextDeliveryTime
                    )
            
            dispatch(
                {
                    type: NEAREST_RESTAURANT,
                    nearStore: store,
                }
            )

        } catch (error) {
            throw error
        }
    }


}