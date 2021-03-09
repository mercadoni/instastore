import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

export interface StoreAttrs {
    storeId: string;
    storeName: string ;
    isOpen: boolean;
    lat: number;
    lng: number;
    nextDeliveryTime:string

}

interface StoreDoc extends mongoose.Document {
    storeId: string;
    storeName: string ;
    isOpen: boolean;
    lat: number;
    lng: number;
    nextDeliveryTime:string
}


interface StoreModel extends mongoose.Model<StoreDoc> {
    build(attrs: StoreAttrs): StoreDoc;
}

const storeSchema = new mongoose.Schema({
    storeId:{
        type:String,
        required:true
    },
    storeName:{
        type: String,
        required:true
    },
   isOpen:{
        
        type:Boolean,
        required:true
    },
    lat:{
        type:Number,
        required:true
    
    }
    ,
    lng:{
        type:Number,
        required:true
    
    },
    nextDeliveryTime:{
        type:mongoose.Schema.Types.Date,
        required:true
    
    }
},{
    toJSON:{
        transform(doc,ret){
            ret.id=ret._id
            delete ret._id
        }
    }
})

storeSchema.set('versionKey','version');
storeSchema.plugin(updateIfCurrentPlugin)
storeSchema.static('build',(attrs : StoreAttrs)=>{
    return new Store(attrs)
})

const Store = mongoose.model<StoreDoc,StoreModel>('Store',storeSchema);

export { Store}