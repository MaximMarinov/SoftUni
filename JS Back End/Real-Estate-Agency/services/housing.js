const Housing = require('../models/Housing');

async function getAllHousings() {
    return Housing.find({}).lean();
}

async function getLastThreehousings() {
    let housings = await Housing.find({}).lean();
    housings = housings.splice(housings.length - 3, 3);
    return housings;
}

async function getHousingsByUser(userId) {
    return Housing.find({owner: userId}).lean();
}

async function getHousingById(id) {
    return Housing.findById(id).lean();
}

async function getHousingAndUsers(id) {
    return Housing.findById(id).populate('owner').populate('rentors').lean();
}

async function createHousing(housing) {
    const result = new Housing(housing);
    await result.save();
};

async function updateHousing(id, housing) {
    const existing = await Housing.findById(id);
    existing.name = housing.name;
    existing.type = housing.type;
    existing.year = housing.year;
    existing.city = housing.city;
    existing.housingImg = housing.housingImg;
    existing.description = housing.description;
    existing.available = housing.available;

    await existing.save();
}

async function deleteById(id) {
    await Housing.findByIdAndDelete(id);
}

async function rentHousing(housingId, userId) {
    const housing = await Housing.findById(housingId);

    if (housing.rentors.includes(userId)) {
        throw new Error('User has already rented this housing');
    }

    housing.rentors.push(userId);

    await housing.save();
}

module.exports = {
    getAllHousings,
    getHousingById,
    getHousingAndUsers,
    createHousing,
    updateHousing,
    deleteById,
    rentHousing,
    getHousingsByUser,
    getLastThreehousings
};