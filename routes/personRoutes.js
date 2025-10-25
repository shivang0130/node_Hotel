const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains person data

    // Create a new Person instance
    const newPerson = new Person(data);

    // Save the new person to the database
    const savedPerson = await newPerson.save();

    console.log('Data saved successfully');
    res.status(200).json(savedPerson);
  } catch (error) {
    console.error('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/', async(req,res) => {
    try {
        const data = await Person.find();
        console.log('Person fetched');
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/:workType', async (req,res) => {
    try {
        const workType = req.params.workType; //Extract the work type from url parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log('work data fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    } catch (error) {
        console.error('Error fetching person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/:id', async (req,res) => {
    try{
        const personId = req.params.id; //Extract id from the url parameter
        const upadatedPersonData = req.body; //Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, upadatedPersonData, {
            new: true, //Returns updated doc
            runValidators: true, //Run mongoose validations
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.error('Error fetching person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete('/:id', async (req,res) =>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        res.status(200).json({message: 'Person deleted'});

    }catch(err){
        console.error('Error fetching person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;