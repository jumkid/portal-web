import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    layout: 'main',
    title: 'Jumkid - User Login'
  });
});

export default router;
