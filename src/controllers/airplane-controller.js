const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { SuccessResponse,ErrorResponse } = require('../utils/common');
/**
 * POST :/airplanes
 * req-body {modelNumber :'airbus320', capacity:200}
 */
async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data=airplane;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log('Error caught:', error);
        console.log('Error statusCode:', error.statusCode);
        console.log('Error type:', typeof error.statusCode);
        console.log('Error name:', error.name);
        console.log('Error explanation:', error.explanation);
        
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        
        const errorResponse = {
            success: false,
            message: 'Something went wrong',
            data: {},
            error: {
                statusCode: statusCode,
                explanation: error.explanation || error.message || 'Unknown error occurred'
            }
        };
        
        return res.status(statusCode).json(errorResponse);
    }
}

module.exports = {
    createAirplane
};
