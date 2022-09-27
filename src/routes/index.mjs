import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'main',
    title: 'Jumkid',
    navTabIndex: true
  });
});

export default router;
