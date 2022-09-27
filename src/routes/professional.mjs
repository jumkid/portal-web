import express from 'express';

const router = express.Router();

const carList = [1, 2, 3, 4];

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('professional', {
        layout: 'main',
        title: 'Jumkid',
        navTabProfessional: true
  });
});

export default router;
