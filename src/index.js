const express=require('express');

const {ServerConfig ,Logger}=require('./config');
const apiRoutes=require('./routes');
const city = require('./models/city');


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',apiRoutes);


app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
    //bad code alert
    const {City,Airport}=require('./models');
    const bengaluru= await City.findByPk(2);
    // const airport= await Airport.create({
    //     name : 'Kempegowda International Airport',
    //     code : 'BLR',
    //     address : 'Devanahalli, Bengaluru, Karnataka, India',
    //     cityId : bengaluru.id
    // })
    // const dbairport=await bengaluru.createAirport({
    //     name : 'Hubbali Airport',
    //     code : 'HBX',
    //     address : 'Hubbali, Karnataka, India'
    // });
    // console.log(dbairport);
    // console.log(bengaluru);
    // const city=await City.findByPk(4);
    // await city.createAirport({
    //     name :'Indore Airport',
    //     code : 'IDR',
    //     address : 'Indore, Madhya Pradesh, India'
    // })
    // console.log(city);
    
})