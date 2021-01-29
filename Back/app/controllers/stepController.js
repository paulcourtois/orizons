const stepDataMapper = require('../datamapper/stepDataMapper');
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
            const step = await stepDataMapper.createStep(newStep);
            // je récupère l'id de l'étape et l'id de l'user ou l'id du trip
            //  dans request.file j'insère en bouclant sur le file dans la table photo
            response.json({
                data: step
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