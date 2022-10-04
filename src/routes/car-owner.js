import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('car-owner', {
        layout: 'main',
        title: 'Jumkid',
        navTabCarOwner: true,
    });
});

export default router;
