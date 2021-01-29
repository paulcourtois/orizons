const {
    request
} = require('express');
const photoDataMapper = require('../datamapper/photoDataMapper');

const photoController = {
    async deleteOnePhoto(request, response, next) {
        try {
            const {
                photoId
            } = request.params;
            const photo = await photoDataMapper.deleteOnePhoto(photoId);
            response.json({
                message: photo
            })
        } catch (error) {
            next(error)
        }
    }
};

module.exports = photoController