const authController = require('../controllers/auth');
const publicationController = require('../controllers/publication');
const homeController = require('../controllers/home');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(publicationController);

    app.get('*', (req, res) => {
        res.render('404', {title: 'Page Not Found'});
    });
};