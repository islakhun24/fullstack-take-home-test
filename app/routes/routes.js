module.exports = (app) => {
    const transaksi = require('../controllers/transaksi.controller');
    const location = require('../controllers/location.controller');
    const event = require('../controllers/event.controller');
    const tiket = require('../controllers/tiket.controller');
    // Create a new Note
    app.post('/transaction/purchase', transaksi.create);

    // Retrieve all Notes
    app.post('/location/create', location.create);

    // // Retrieve a single Note with noteId
    app.post('/event/create', event.create);
    app.get('/event/get_info', event.get);

    app.post('/event/ticket/create', tiket.create);
    app.get('/transaction/get_info', transaksi.gets);
    // // Update a Note with noteId
    // app.put('/notes/:noteId', notes.update);

    // // Delete a Note with noteId
    // app.delete('/notes/:noteId', notes.delete);
}