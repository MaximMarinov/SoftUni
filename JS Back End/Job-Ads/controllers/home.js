const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getFirstThreeAds, getAllAds, getAdsByEmail } = require('../services/ad');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const ads = await getFirstThreeAds();
    res.render('home', {title: 'Home Page', ads});
});

router.get('/ads', async (req, res) => {  
    const ads = await getAllAds();
    res.render('catalog', {title: 'All Ads', ads});
});

router.get('/ads/:id', preload(true), (req, res) => {
    const ad = res.locals.ad;
    ad.appliedCount = ad.usersApplied.length;
    if (req.session.user) {
        ad.hasUser = true;
        ad.isAuthor = req.session.user._id == ad.author._id;

        if (ad.usersApplied.some(b => b._id == req.session.user._id)) {
            ad.hasApplied = true;
        }
    }
    res.render('details', {tittle: 'Ad Details'});
});

router.get('/search', async (req, res) => {  
    let ads = await getAdsByEmail(req.query.search);
    res.render('search', {title: 'Search Author', ads});
});

module.exports = router;