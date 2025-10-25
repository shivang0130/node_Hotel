const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menu');


router.post('/', async (req,res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const savedMenu = await newMenu.save();

        console.log('Menu saved');
        res.status(200).json(savedMenu);
    } catch (error) {
        console.error('Error saving menu',error);
        res.status(500).json({error: 'Internal server error'});        
    }
})

router.get('/', async (req,res) => {
    try {
        const data = await MenuItem.find();

        console.log('Menu fetched');
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/:tasteType', async (req,res) => {
    try {
        const tasteType = req.params.tasteType;
        if(tasteType=='Sweet' || tasteType=='Spicy' || tasteType=='Sour'){
            const response = await MenuItem.find({taste: tasteType});
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid taste type'});
        }
    } catch (error) {
         console.error('Error fetching menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;