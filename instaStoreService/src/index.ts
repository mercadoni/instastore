import mongoose from 'mongoose';
import app from './app'
import config from '../config/config'
const start = async () => {

    
    if (!config.MONGO_URI) {
        throw new Error('MONGO_URI must be defined')
    }
   
    try {

        
        await mongoose.connect(
            config.MONGO_URI, {
            useNewUrlParser: false,
            useUnifiedTopology: true,
            useFindAndModify: true,
        });

        console.log('connected')
    } catch (err) {
        console.log(err)
    }

}
app.listen(4000, () => {
    console.log('Listen on port 4000!')
});

start()