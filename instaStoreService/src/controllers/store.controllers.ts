import { Response, Request } from 'express'
import { BadRequestError, NotAuthorizedError, NotFoundError } from '@instastore/common';
import {Store,StoreAttrs} from '../models/store.model'
import distance from '../helper/distance'

class StoreController {




    async new(req: Request, res: Response) {
        const { storeId, storeName, isOpen, nextDeliveryTime,lat,lng} = req.body;
      


        
        const store = Store.build({
            storeId, storeName, isOpen, nextDeliveryTime,lat,lng
        })

        await store.save();

   

        res.status(201).send(store)


    }
     async getStores(req:Request,res:Response){

        const stores = await Store.find({})
        
        res.send(stores)
    }


    async getNearStore(req:Request,res:Response){

        const {lat,lng} = req.params;
        const stores:StoreAttrs[] = await Store.find({})
        const distances = [];
        for(let i=0; i<stores.length; i++){
           distances.push({store:stores[i],distance:distance(lat,lng,stores[i].lat,stores[i].lng)})
        }

        distances.sort(function (a:any, b:any) {
            return a.distance - b.distance;
        });

        
        res.send(distances)
    }

  /* 
    async showOrder(req:Request, res:Response){
        const order = await Order.findById(req.params.orderId).populate('ticket')
        if(!order){
            throw new NotFoundError()
        }
        
        if(order.userId !== req.currentUser!.id){
          throw new NotAuthorizedError()
        }


        res.send(order)
    }

    async deleteOrder(req:Request,res:Response){


        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate('ticket');
    
       if (!order) {
          throw new NotFoundError();
        }
        
       
       if (order.userId !== req.currentUser!.id) {
          throw new NotAuthorizedError();
        }
       
        
        order.status = OrderStatus.Cancelled;

        await order.save();
        console.log(order)
    
        // publishing an event saying this was cancelled!
   
      new OrderCancelledPublisher(natsWrapper.client).publish({
            id:order.id,
            version:order.version,
            ticket:{
                id:order.ticket.id,
            }
        })
        res.status(204).send(order);
      
    }*/
}


export default StoreController;