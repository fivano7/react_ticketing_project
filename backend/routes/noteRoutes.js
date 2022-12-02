const express = require('express');
const router = express.Router({ mergeParams: true });
const { getNotes, addNote } = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware'); //middleware za autentikaciju tokena

//kad koristimo .route() onda na njega možemo chainati .get().post()
router.route('/').get(protect, getNotes).post(protect, addNote);

module.exports = router;
