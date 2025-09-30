const {CityRepository}=require('../repositories');
 
const {StatusCodes}=require('http-status-codes');
const AppError=require('../utils/errors/app-error');

const cityRepository=new CityRepository();

async function createCity(data){
    try{
        const city= await cityRepository.create(data);
        return city;
    }catch(error){
        if(error.name =="SequelizeUniqueConstraintError"){
            let explanation =[];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            const appError = new AppError(explanation.join(', '),StatusCodes.BAD_REQUEST);
            throw appError;
        }
        if(error.name=='SequelizeValidationError'){
            let explanation =[];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            const appError = new AppError(explanation.join(', '),StatusCodes.BAD_REQUEST);
            throw appError;
        }
        throw new AppError('Failed to create city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createCity,
}