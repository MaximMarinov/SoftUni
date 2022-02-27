const Ad = require('../models/Ad');
const { getUserByEmail } = require('./user');

async function getAllAds() {
    return Ad.find({}).lean();
}

async function getFirstThreeAds() {
    let ads = await Ad.find({}).lean();
    ads = ads.slice(0, 3);
    return ads;
}

async function getAdsByUser(userId) {
    return Ad.find({author: userId}).lean();
}

async function getAdById(id) {
    return Ad.findById(id).lean();
}

async function getAdAndUsers(id) {
    return Ad.findById(id).populate('author').populate('usersApplied').lean();
}

async function createAd(ad) {
    const result = new Ad(ad);
    
    await result.save();
};

async function updateAd(id, ad) {
    const existing = await Ad.findById(id);
    existing.headline = ad.headline;
    existing.location = ad.location;
    existing.companyName = ad.companyName;
    existing.companyDescription = ad.companyDescription;

    await existing.save();
}

async function deleteById(id) {
    await Ad.findByIdAndDelete(id);
}

async function apply(adId, userId) {
    const ad = await Ad.findById(adId);

    if (ad.usersApplied.includes(userId)) {
        throw new Error('User has already applied for the ad');
    }

    ad.usersApplied.push(userId);

    await ad.save();
}

async function getAdsByEmail(search) {
    const user = await getUserByEmail(search);
    const ads = await getAllAds();

    let adsByEmail = [];

    if (user) {
        for (const ad of ads) {
            if (ad.author._id.toString() == user._id.toString()) {
                adsByEmail.push(ad);
            }
        }
    }

    return adsByEmail;
}


module.exports = {
    getAllAds,
    getFirstThreeAds,
    getAdById,
    getAdAndUsers,
    createAd,
    updateAd,
    deleteById,
    apply,
    getAdsByUser,
    getAdsByEmail
};