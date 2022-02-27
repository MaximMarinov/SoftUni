module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);

        if (car) {
            res.render('details', {title: `Car Catalog - ${car.name}`, car});
        } else {
            res.redirect('/404');
        }
    }
};