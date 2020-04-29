const User = require('../models/User.model');

module.exports = {
  create(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      {
        $push: {
          favoriteMovies: req.body
        }
      },
      {
        new: true,
        runValidators: true
      }
    )
      .then(user => res.json(user))
      .catch(err => res.status(400).json(err))
  },

  update(req, res) {
    User.updateOne(
      {
        _id: req.params.userId,
        'favoriteMovies._id': req.params.movieId
      },
      {
        $set: {
          'favoriteMovies.$.title': req.body.title
        }
      },
      {
        runValidators: true
      }
    )
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
  },

  delete(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      {
        $pull: {
          favoriteMovies: {
            _id: req.params.movieId
          }
        }
      },
      {
        new: true
      }
    )
      .then(user => res.json(user))
      .catch(err => res.status(400).json(err));
  }
}