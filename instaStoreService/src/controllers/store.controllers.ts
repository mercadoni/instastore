import { Response, Request } from 'express'
import { BadRequestError, NotAuthorizedError, NotFoundError } from '@instastore/common';
import { Store, StoreAttrs } from '../models/store.model'
import distance from '../helper/distance'

class StoreController {




    async new(req: Request, res: Response) {
        const { storeId, storeName, isOpen, nextDeliveryTime, lat, lng } = req.body;




        const store = Store.build({
            storeId, storeName, isOpen, nextDeliveryTime, lat, lng
        })

        await store.save();



        res.status(201).send(store)


    }
    async getStores(req: Request, res: Response) {

        const stores = await Store.find({})

        res.send(stores)
    }


    async getNearStore(req: Request, res: Response) {

        const { lat, lng } = req.params;
        const stores: StoreAttrs[] = await Store.find({})
        const distances = [];
        for (let i = 0; i < stores.length; i++) {
            distances.push({ store: stores[i], distance: distance(lat, lng, stores[i].lat, stores[i].lng) })
        }
        if(lat===undefined || lng ===undefined){
            throw new BadRequestError("You have to provide coordinates");

        }
        if (distances.length === 0) {
            throw new NotFoundError();

        }
        distances.sort(function (a: any, b: any) {
            return a.distance - b.distance;
        });



        res.send(distances[0])
    }
}


export default StoreController;