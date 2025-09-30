const {AirplaneRepository}=require('../repositories');
 
const {StatusCodes}=require('http-status-codes');
const AppError=require('../utils/errors/app-error');
const airplaneRepository=new AirplaneRepository();

async function createAirplane(data){
    try{
        const airplane= await airplaneRepository.create(data);
        return airplane;
    }catch(error){

        if(error.name=='SequelizeValidationError'){
            let explanation =[];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            const appError = new AppError(explanation.join(', '),StatusCodes.BAD_REQUEST);
            throw appError;
        }
        const appError = new AppError('Cannot create a new airplane object',StatusCodes.INTERNAL_SERVER_ERROR);
        throw appError;
    }
}

async function getAirplanes(){
    try{
        const airplanes= await airplaneRepository.getAll();
        return airplanes;
    }catch(error){
        const appError = new AppError('Cannot fetch data of all airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
        throw appError; 
    }
}
module.exports={
    createAirplane,
    getAirplanes
}