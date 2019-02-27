const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const move = require('../controllers/move.controller');


// Get all moves
router.get('/', function (req, res) {
    move.list(req, res);
});

// Get single move by id
router.get('/show/:id', function (req, res) {
    move.show(req, res);
});

// Create move
router.get('/create', function (req, res) {
    move.create(req, res);
});

// Save move
router.post('/save', function (req, res) {
    move.save(req, res);
});

// Edit move
router.get('/edit/:id', function (req, res) {
    move.edit(req, res);
});

// Edit move
router.post('/update/:id', function (req, res) {
    move.update(req, res);
});

// Edit move
router.post('/delete/:id', function (req, res, next) {
    move.delete(req, res);
});


// // a simple test url to check that all of our files are communicating correctly.
// router.get('/test', move_controller.test);

// router.post("/create", move_controller.move_create);

// router.get("/:id", move_controller.move_details);

// router.put("/:id/update", move_controller.move_update);

// router.delete("/:id/delete", move_controller.move_delete);

module.exports = router;