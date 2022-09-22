import express from 'express';

const router = express.Router();

const carList = [1, 2, 3, 4];

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('car-owner', {
    layout: 'main',
    title: 'Jumkid',
    cars: carList
  });
});

export default router;
