const client = require('./client');

const stepDataMapper = {
    async getAllStep() {
        const result = await client.query("SELECT * FROM step");
        return result.rows;
    },

    async createStep(newStep) {
        const result = await client.query('INSERT INTO step(longitude, latitude, title, number_step, content, member_id, localisation_id, trip_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [
                newStep.longitude,
                newStep.latitude,
                newStep.title,
                newStep.number_step,
                newStep.content,
                newStep.member_id,
                newStep.localisation_id,
                newStep.trip_id
            ]);
        return result.rows[0]

    },

    async getStepByTripId(tripId) {
        const result = await client.query('SELECT * FROM step_author WHERE trip_id = $1', [tripId]);
        return result.rows;
    }
};

module.exports = stepDataMapper;