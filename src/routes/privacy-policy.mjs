import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('privacy-policy', {
    layout: 'main',
    title: 'Jumkid - Privacy Policy'
  });
});

export default router;
