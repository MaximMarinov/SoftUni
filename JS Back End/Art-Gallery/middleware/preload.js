const publicationService = require('../services/publication');

function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        if (populate) {
            res.locals.publication = await publicationService.getPublicationAndUsers(id);
        } else {
            res.locals.publication = await publicationService.getPublicationById(id);
        }
        next();
    };
}

module.exports = preload;