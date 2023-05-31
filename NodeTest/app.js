'use strict'
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8080;
const db = require('./config/connection')
const validate = require('./validation/user.validation')
const User = require('./model/user.model')
const sample = require('./sample.json')

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({ message: "Successfully connected to node server" })
})

// Add a route with GET request to fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        if(!users.length) res.status(200).json({message: "Users not found. Try adding a user first."})
        res.status(200).json(users)
    } catch (error) {
        console.log("Error in fetching users", error.stack)
        res.status(500).json({message: "Error deleting user. Please try again or contact support"})
    }
})
// Add POST requests to create existing users
app.post('/users', validate.user(), async (req, res) => {
    try {
        const isExisting = await User.count({email: req.body.email})
        if (isExisting) res.status(403).json({message: "User already exist in the database"})
        const newUser = new User(req.body)
        const insertedData = await newUser.save()
        res.status(201).json(insertedData)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Error adding a user. Please try again or contact support"})
    }
})

// Add PUT requests to update existing users
app.put('/users/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const updateData = req.body;

        const updatedData = await User.findByIdAndUpdate(userID, updateData, { new: true })
        res.status(200).json(updatedData)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Error updating user. Please try again or contact support"})
    }
})

// Add DELETE requests to delete a user entry.
app.delete('/users/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const deletedUser = await User.findByIdAndRemove(userID)
        if (!deletedUser) res.status(403).json({message: "User not found"})
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Error deleting user. Please try again or contact support"})
    }
})

// Create a simple API in NodeJS to read data from JSON source

app.get("/movies", async (req, res) => {
    res.json(sample)
})

app.listen(port, () => {
    console.log("Server is listening on port", port);
})