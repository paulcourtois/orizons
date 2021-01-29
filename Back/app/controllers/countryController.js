const countryDataMapper = require('../datamapper/countryDataMapper');
const countryController = {
    async getAllCountry(_, response, next) {


        try {
            const countries = await countryDataMapper.getAllCountry();
            response.json({
                data: countries
            })
        } catch (error) {
            next(error)
        }
    },
};

module.exports = countryController;