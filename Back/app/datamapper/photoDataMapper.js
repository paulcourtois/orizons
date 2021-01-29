const client = require('./client');

const photoDataMapper = {
    async deleteOnePhoto(photoId) {
        await client.query(`DELETE FROM photo WHERE id = $1`, [photoId]);
        const message = "Photo supprimée"
        return message
    }
};

module.exports = photoDataMapper;