const client = require('./client');

const stepDataMapper = {
    async getAllStep() {
        const result = await client.query("SELECT * FROM step");
        return result.rows;
    },

    async createStep(newStep) {
        const result = await client.query('INSERT INTO step(longitude, latitude, title, number_step, content, member_id, localisation_id, trip_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [
                newStep.longitude, //OK
                newStep.latitude, //OK
                newStep.title, //OK
                newStep.number_step, //1 étape par jour devient un champ calculé (sur l'ordre décroissant)
                newStep.content, //OK
                newStep.member_id, // j'aille le créer en ai je basoin
                newStep.localisation_id, //// y en n'a plus besoin
                newStep.trip_id
                //newStep.step_date --> step_date add date_stamp de l'étape
                //add country
                //country_code 3 x A-Z0-9 ajouter s'il n'y est pas encore dans la m2m


            ]);

        //add pictures dans photo avec result.id en id trip
        return result.rows[0]

    },

    async getStepByTripId(tripId) {
        const result = await client.query('SELECT * FROM step_photo WHERE trip_id = $1', [tripId]);
        return result.rows;
    },

    async deleteOneStep(stepId) {
        console.log(stepId, 'deleteOneStep')
        const verify = await client.query(`SELECT * FROM photo WHERE step_id = $1`, [stepId]);
        console.log(verify.rowCount, '-------------');
        if (verify.rowCount != 0) {
            await client.query(`DELETE FROM photo WHERE step_id = $1`, [stepId]);

        }
        console.log('stepId', stepId)
        await client.query(`DELETE FROM step WHERE id = $1`, [stepId]);
        console.log('pouet')
        const messages = `Suppression de l'étape terminée`;
        return messages;
    }


};

module.exports = stepDataMapper;