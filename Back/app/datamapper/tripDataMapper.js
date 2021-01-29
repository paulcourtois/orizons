const commentDataMapper = require('../datamapper/commentDataMapper');
const client = require('./client');
const stepDataMapper = require('./stepDataMapper');

const tripDataMapper = {
    async getAllTrips() {
        const result = await client.query("SELECT * FROM trip_with_duration_status");

        return result.rows;
    },

    async getTripById(idTrip) {
        //1 - les informations du voyage
        const result = await client.query("SELECT * FROM trip_with_duration_status WHERE id=($1)", [idTrip]);
        //2 - les informations de l'auteur

        //const result = await client.query("SELECT * FROM trip_step WHERE id_trip = $1", [idTrip]);

        if (result.rowCount == 0) {
            return null;
        }
        console.log(result.rows);
        return result.rows[0];
    },

    async getTripByMember(memberId) {
        const result = await client.query(`SELECT * FROM trip_by_member WHERE id = $1`, [memberId]);
        return result.rows[0];

    },

    async createTrip(newTrip) {
        const trip = await client.query(`INSERT INTO "trip"("title", "summary", "departure_date", "arrival_date", "member_id", "cover_trip") VALUES ($1, $2, $3, $4, $5, $6)RETURNING *`,
            [
                newTrip.title,
                newTrip.summary,
                newTrip.departure_date,
                newTrip.arrival_date,
                newTrip.member_id,
                newTrip.cover_picture //cover_picture
                //country pays -->table m2m
                //categories // tableau dans m2m
            ]);
        const country = await client.query(`SELECT "id" FROM "country" WHERE "code" = $1`, [newTrip.code])
        await client.query(`INSERT INTO "_m2m_trip_localisation"("trip_id", "localisation_id") VALUES $1, $2`, [trip.id, country.id]);

        for (const categories of newTrip.category) {
            await client.query(`INSERT INTO "_m2m_trip_category"("trip_id", "category_id") VALUES $1, $2`, [trip.id, categories.id]);

        }

        return this.getTripById(trip.id);
    },

    async updateAllTrip() {
        const result = await client.query("");
    },

    async updateOneTrip(idTrip) {
        const result = await client.query("");
    },

    async deleteAllTrip() {
        const result = await client.query("");
    },

    async deleteOneTrip(tripId) {
        const resultComment = await client.query(`SELECT * FROM "comment" WHERE "trip_id" = $1`, [tripId]);
        if (resultComment.rowCount != 0) {
            await commentDataMapper.deleteAllCommentByTrip(tripId)
        }

        const result = await client.query(`SELECT * FROM step WHERE trip_id = $1`, [tripId])

        if (result.rowCount != 0) {
            for (let element of result.rows) {
                let stepId = element.id;
                await stepDataMapper.deleteOneStep(stepId);

            }

        }
        await client.query(`DELETE FROM _m2m_trip_localisation WHERE trip_id = $1`, [tripId]);
        await client.query(`DELETE FROM _m2m_trip_category WHERE trip_id = $1`, [tripId]);
        await client.query(`DELETE FROM trip WHERE id = $1 `, [tripId]);
        const message = "supprimé";
        return message;



    },


};

module.exports = tripDataMapper;