const { isUser, isOwner } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { createHousing, updateHousing, deleteById, rentHousing } = require("../services/housing");
const { mapErrors } = require("../util/mappers");

const router = require("express").Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', {title: 'Create Housing Offer', data: {}});
});

router.post('/create', isUser(), async (req, res) => {
    const housing = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        housingImg: req.body.housingImg,
        description: req.body.description,
        available: Number(req.body.available),
        owner: req.session.user._id,
    };

    try {
        await createHousing(housing);
        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', {title: 'Create Housing Offer', data: housing, errors });
    }
});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', {title: 'Edit Offer'});
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;

    const housing = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        housingImg: req.body.housingImg,
        description: req.body.description,
        available: Number(req.body.available),
    };

    try {
        await updateHousing(id, housing);
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        housing._id = id;
        res.render('edit', {title: 'Edit Housing Offer', housing, errors });
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/catalog');
});

router.get('/rent/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await rentHousing(id, req.session.user._id);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect('/catalog/' + id);
    }
});

module.exports = router;
