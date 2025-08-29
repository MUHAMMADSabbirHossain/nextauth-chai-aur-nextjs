import mongoose from "mongoose";

async function connect(){
try{
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', ()=>{
        console.log('MongoDB connected successfully');
    });

    connection.on('error', (error)=>{
        console.log('MongoDB connection error, please make sure MongoDB is running.');
        console.log(error);
        process.exit();
    });
}catch(error){
    console.log('Something went wrong in db connection');
    console.log(error);    
}
}

export default connect;
