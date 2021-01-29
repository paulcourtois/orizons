const client = require('./client');

const countryDataMapper = {
    async getAllCountry() {
        const result = client.query(`SELECT * FROM "country"`)
        return result
    }
};

module.exports = countryDataMapper;