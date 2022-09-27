import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', {
    layout: 'main',
    title: 'Jumkid - User Signup',
    navTabCarOwner: true
  });
});

export default router;
