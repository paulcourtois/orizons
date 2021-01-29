const client = require('./client');

const commentDataMapper = {
    async deleteOneComment(commentId) {
        await client.query(`DELETE FROM "comment" WHERE "id" = $1`, [commentId]);
        const result = await client.query(`SELECT * FROM "comment" WHERE "id" = $1`, [commentId]);
        if (result) {
            return 'error'
        } else {
            return 'commentaire supprimé'
        }
    },

    async deleteAllCommentByTrip(tripId) {
        await client.query(`DELETE FROM "comment" WHERE "trip_id" = $1`, [tripId]);
        const result = await client.query(`SELECT * FROM "comment" WHERE "trip_id" = $1`, [tripId]);
        if (result) {
            return 'Commentaires supprimés'
        }
    }

};

module.exports = commentDataMapper;