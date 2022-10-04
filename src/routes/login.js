import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'main',
        title: 'Jumkid - User Login',
        navTabCarOwner: true,
    });
});

export default router;
