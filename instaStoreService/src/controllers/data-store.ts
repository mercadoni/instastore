import { Store } from '../models/store.model'



export default () => {

    const store1 = Store.build({
        storeId: "x1", storeName: " Restaurante Sabor Sin Divisiones", isOpen: true, nextDeliveryTime: "2021/03/04", lat: 4.658876911927517, lng: -74.05685095262547,
    })

    const store2 = Store.build({
        storeId: "x2", storeName: "Factory Steak & Lobster Bogotá", isOpen: true, nextDeliveryTime: "2021/03/04", lat: 4.662812067377394, lng: -74.09753469742174,
    })

    const store3 = Store.build({
        storeId: "x3", storeName: "Los Galenos Restaurante", isOpen: true, nextDeliveryTime: "2021/03/04", lat: 4.684540571797577, lng: -74.05170111151203,
    })
    const store4 = Store.build({
        storeId: "x3", storeName: "La Provence de Andrei", isOpen: true, nextDeliveryTime: "2021/03/04", lat: 4.698056387648979, lng: -74.02234701716536,
    })



    store1.save();
    store2.save();
    store3.save();
    store4.save();
}



