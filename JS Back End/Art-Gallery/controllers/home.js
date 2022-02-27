const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllPublications, getPublicationAndUsers, getPublicationsByUser, getSharesCount, getSharedPublication, getPublicationsByUserSHARED, getSharedPublicationsByUser } = require('../services/publication');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const [sharedPublications, sharesCount] = await getSharedPublication();
    res.render('home', {title: 'Home Page', sharedPublications});
});

router.get('/gallery', async (req, res) => {
    const publications = await getAllPublications();
    res.render('catalog', {title: 'Gallery', publications});
});

// DETAILS
router.get('/gallery/:id', preload(true), (req, res) => {
    const publication = res.locals.publication;
    //publication.sharedCount = publication.usersShared.length;
    // publication.buddiesList = publication.buddies.map(b => b.email).join(', ');
    if (req.session.user) {
        publication.hasUser = true;
        publication.isAuthor = req.session.user._id == publication.author._id;

        if (publication.usersShared.some(b => b._id == req.session.user._id)) {
            publication.hasShared = true;
        }
    }
    res.render('details', {title: 'Publication Details'});
});

router.get('/profile', isUser(), async (req, res) => {
    let publicationsByUser = await getPublicationsByUser(res.locals.user._id);
    publicationsByUser = publicationsByUser.map(p => p.title).join(', ');

    let pulicationsSharedByUser = await getSharedPublicationsByUser(res.locals.user._id);
    pulicationsSharedByUser = pulicationsSharedByUser.map(p => p.title).join(', ');

    res.render('profile', {title: 'Profile Page', publicationsByUser, pulicationsSharedByUser});
});

module.exports = router;