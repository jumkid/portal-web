import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('privacy-policy', {
        layout: 'main',
        title: 'Jumkid - Privacy Policy',
    });
});

export default router;
