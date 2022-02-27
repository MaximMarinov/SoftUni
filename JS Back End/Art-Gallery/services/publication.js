const Publication = require('../models/Publication');

async function getAllPublications() {
    return Publication.find({}).lean();
}

async function getSharedPublication() {
    let sharesCount = 0;
    let sharedPublications = [];
    let publications = await Publication.find({}).lean();
    publications.forEach(p => {
        if (p.usersShared.length > 0) {
            sharesCount++;
            sharedPublications.push(p);
        };
    });
    return [sharedPublications, sharesCount];
}

async function getPublicationsByUser(userId) {
    return Publication.find({author: userId}).lean();
}

async function getSharedPublicationsByUser(userId) {
    return Publication.find({usersShared: userId}).lean();
}

async function getPublicationById(id) {
    return Publication.findById(id).lean();
}

async function getPublicationAndUsers(id) {
    return Publication.findById(id).populate('author').populate('usersShared').lean();
}

async function createPublication(publication) {
    const result = new Publication(publication);
    await result.save();
};

async function updatePublication(id, publication) {
    const existing = await Publication.findById(id);
    existing.title = publication.title;
    existing.technique = publication.technique;
    existing.img = publication.img;
    existing.certificate = publication.certificate;

    await existing.save();
}

async function deleteById(id) {
    await Publication.findByIdAndDelete(id);
}

async function share(publicationId, userId) {
    const publication = await Publication.findById(publicationId);

    if (publication.usersShared.includes(userId)) {
        throw new Error('You already shared this publication');
    }

    publication.usersShared.push(userId);

    await publication.save();
}



module.exports = {
    getAllPublications,
    getPublicationById,
    getPublicationAndUsers,
    createPublication,
    updatePublication,
    deleteById,
    share,
    getSharedPublicationsByUser,
    getPublicationsByUser,
    getSharedPublication
};