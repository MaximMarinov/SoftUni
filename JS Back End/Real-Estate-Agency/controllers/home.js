const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllHousings, getLastThreehousings } = require('../services/housing');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const housings = await getLastThreehousings();
    res.render('home', {title: 'Home Page', housings});
});

router.get('/catalog', async (req, res) => {
    const housings = await getAllHousings();
    res.render('catalog', {tittle: 'Housings For Rent', housings});
});

router.get('/catalog/:id', preload(true), (req, res) => {
    const housing = res.locals.housing;
    
    housing.remainingSpaces = housing.available - housing.rentors.length;
    housing.rentorsList = housing.rentors.map(b => b.name).join(', ');

    if (req.session.user) {
        housing.hasUser = true;
        housing.isOwner = req.session.user._id == housing.owner._id;

        if (housing.rentors.some(b => b._id == req.session.user._id)) {
            housing.hasRented = true;
        }
    }
    res.render('details', {title: 'Housing Details'});
});


module.exports = router;