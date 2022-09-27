import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('car-owner', {
        layout: 'main',
        title: 'Jumkid',
        navTabCarOwner: true
  });
});

export default router;
