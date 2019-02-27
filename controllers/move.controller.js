const Move = require('../models/move.model');
const mongoose = require("mongoose");


const moveController = {};

moveController.list = function (req, res) {
    Move.find({}).exec(function (err, moves) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/moves/index", { moves: moves });
        }
    });
};


moveController.show = function (req, res) {
    Move.findOne({ _id: req.params.id }).exec(function (err, move) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/moves/show", { move: move });
        }
    });
};


moveController.create = function (req, res) {
    res.render("../views/moves/create");
};



moveController.save = function (req, res) {
    const move = new Move(req.body);

    move.save(function (err) {
        if (err) {
            console.log(err);
            res.render("../views/moves/create");
        } else {
            console.log("Successfully created an Move.");
            res.redirect("/moves/show/" + move._id);
        }
    });
};


moveController.edit = function (req, res) {
    Move.findOne({ _id: req.params.id }).exec(function (err, move) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/moves/edit", { move: move });
        }
    });
};


moveController.update = function (req, res) {
    Move.findByIdAndUpdate(req.params.id, { $set: { user: req.body.user, street: req.body.street, city: req.body.city, province: req.body.province, rooms: req.body.rooms, movers: req.body.movers, comments: req.body.comments } }, { new: true }, function (err, move) {
        if (err) {
            console.log(err);
            res.render("../views/moves/edit", { move: req.body });
        }
        res.redirect("/moves/show/" + move._id);
    });
};



moveController.delete = function (req, res) {
    Move.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Move deleted!");
            res.redirect("/moves");
        }
    });
};

module.exports = moveController;





// //Simple version, without validation or sanitation
// exports.test = function (req, res) {
//     res.send('Greetings from the Test controller!');
// };

// exports.move_create = function (req, res) {
//     let move = new Move(
//         {
//             user: req.body.user,
//             street: req.body.street,
//             city: req.body.city,
//             province: req.body.province,
//             rooms: req.body.rooms,
//             movers: req.body.movers,
//             comments: req.body.comments
//         }
//     );

//     move.save(function (err) {
//         if (err) {
//             return next(err);
//         }
//         res.send("Move Created Successfully!")
//     })
// };

// exports.move_details = function (req, res, next) {
//     Move.findById(req.params.id, function (err, move) {
//         if (err) return next(err);
//         res.send(move);
//     })
// };

// exports.move_update = function (req, res) {
//     Move.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, move) {
//         if (err) return next(err);
//         res.send('Move udpated.');
//     });
// };


// exports.move_delete = function (req, res) {
//     Move.findByIdAndRemove(req.params.id, function (err) {
//         if (err) return next(err);
//         res.send('Deleted successfully!');
//     })
// };