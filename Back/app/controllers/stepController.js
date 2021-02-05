const stepDataMapper = require('../datamapper/stepDataMapper');
const tripStepDataMapper = require('../datamapper/tripStepDataMapper')

const stepController = {
    async getAllStep(request, response, next) {
        try {
            const steps = await stepDataMapper.getAllStep();
            response.json({
                data: steps
            });
        } catch (error) {
            next(error)
        }
    },
    async createStep(request, response, next) {
        try {
            const newStep = request.body;
            console.log('---------------------')
            console.log(request.body)
            console.log('---------------------')
            const stepTripId = await stepDataMapper.createStep(newStep);
            // je récupère l'id de l'étape et l'id de l'user ou l'id du trip
            //  dans request.file j'insère en bouclant sur le file dans la table photo
            const trip = await tripStepDataMapper.getTripById(stepTripId);


            const steps = await stepDataMapper.getStepByTripId(stepTripId);




            response.json({
                data: [{
                        trip,
                        steps
                    },

                ]
            })
        } catch (error) {
            next(error)
        }
    },

    async uptdateOneStep(request, response, next) {
        try {
            const {
                stepId
            } = request.params;
            const stepInfos = request.body;

            console.log(stepInfos);

            const step = await stepDataMapper.updateOneStep(stepId, stepInfos);
            const trip = await tripStepDataMapper.getTripById(step);


            const steps = await stepDataMapper.getStepByTripId(step);




            response.json({
                data: [{
                        trip,
                        steps
                    },

                ]
            })
        } catch (error) {
            next(error)
        }
    },

    async deleteOneStep(request, response, next) {
        try {
            const {
                stepId
            } = request.params
            await stepDataMapper.deleteOneStep(stepId)
            response.json({
                message: "La suppression s'est bien déroulée"
            });
        } catch (error) {
            next(error)
        }
    }
};

module.exports = stepController;