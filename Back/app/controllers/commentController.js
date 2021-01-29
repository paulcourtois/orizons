const commentDataMapper = require('../datamapper/commentDataMapper');
const commentController = {
    async deleteOneComment(request, response, next) {
        try {
            const {
                commentId
            } = request.params
            const deleteComment = await commentDataMapper.deleteOneComment(commentId)
            response.json({
                data: deleteComment
            })
        } catch (error) {
            next(error)
        }
    }
};

module.exports = commentController;