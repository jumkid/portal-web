import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('professional', {
        layout: 'main',
        title: 'Jumkid',
        navTabProfessional: true,
    });
});

export default router;
