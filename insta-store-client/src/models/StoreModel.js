class StoreModel{
    constructor(storeId, storeName,isOpen, lat, lng, nextDeliveryTime){
       this.storeId =storeId;
       this.storeName = storeName;
       this.isOpen =isOpen;
       this.lat=lat;
       this.lng =lng;
       this.nextDeliveryTime=nextDeliveryTime;
    }
}

export default StoreModel;