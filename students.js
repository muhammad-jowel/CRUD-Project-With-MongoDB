const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();


// Create user-
router.post('/create', async (req, res)=>{
    const db = req.db;
    const reqBody = req.body;
    try {
        const result = await db.collection('students').insertOne(reqBody);
        res.status(201).json({message: 'User created successfully', result});
    } catch (err) {
        res.status(500).json({error: 'Failed to create user', err});
    }
})


// All user get-
router.get('/get', async (req, res) => {
    const db = req.db;

    try {
        const result = await db.collection('students').find().toArray();
        res.status(200).json({message: 'User fetched successfully', result});
    } catch(err) {
        res.status(500).json({error: 'Failed to fetch user', err});
    }
})


// Single user get-
router.get('/get-single/:id', async (req, res) => {
    const db = req.db;
    const id = req.params.id;

    try {
        const result = await db.collection('students').findOne({_id: new ObjectId(id)});
        res.status(200).json({message: 'User fetched successfully', result});
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch user', err});
    }
})


// Update user-
router.post('/update/:id', async (req, res) => {
    const db = req.db;
    const id = req.params.id;
    const reqBody = req.body;
    try {
        const result = await db.collection('students').updateOne({_id: new ObjectId(id)},{$set: reqBody});
        res.status(200).json({message: 'User updated successfully', result});
    } catch (err) {
        res.status(500).json({error: 'Failed to update user', err});
    }
})


// Delete user-
router.delete('/delete/:id', async (req,res) => {
    const db = req.db;
    const id = req.params.id;
    try {
        const result = await db.collection('students').deleteOne({_id: new ObjectId(id)});
        res.status(200).json({message: 'User deleted successfully', result});
    } catch (err) {
        res.status(500).json({error: 'Failed to delete user', err});
    }
})


module.exports = router;