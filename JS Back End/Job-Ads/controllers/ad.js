const { isUser, isOwner } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { createAd, updateAd, deleteById, apply } = require("../services/ad");
const { mapErrors } = require("../util/mappers");

const router = require("express").Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', {title: 'Create Ad', data: {}});
});

router.post('/create', isUser(), async (req, res) => {
    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        author: req.session.user._id,
    };

    try {
        await createAd(ad);
        res.redirect('/ads');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', {title: 'Create Ad', data: ad, errors });
    }
});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', {title: 'Edit Ad'});
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;

    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription
    };

    try {
        await updateAd(id, ad);
        res.redirect('/ads/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        ad._id = id;
        res.render('edit', {title: 'Edit Ad', ad, errors });
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/ads');
});

router.get('/apply/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await apply(id, req.session.user._id);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect('/ads/' + id);
    }

});

module.exports = router;