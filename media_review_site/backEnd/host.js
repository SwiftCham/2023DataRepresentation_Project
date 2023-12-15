//dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database credentials
const username = process.env.DB_USERNAME; //database username
const password = process.env.DB_PASSWORD; //database password
const host = process.env.DB_HOST; //database host
const database = process.env.DB_NAME; //database name

//database connection string
require('dotenv').config();
const uri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}/${database}?retryWrites=true&w=majority`; //pulls database credentials securely from .env    

//connect to database
async function mongoConnect() {
    try {
        // Connect to the MongoDB cluster using the connection string
        await mongoose.connect(uri);
        console.log("Connected to database"); //log to console if connected
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
} mongoConnect();

//create schema for movie reviews
const movieReviewSchema = new mongoose.Schema({
    title: String,
    genre: String,
    rating: Number,
    review: String,
    trailer: String
});

//create schema for music reviews
const musicReviewSchema = new mongoose.Schema({
    title: String,
    artist: String,
    genre: String,
    rating: Number,
    review: String,
    albumCover: String,
    soundcloud: String
});

//create model for movie reviews
const MovieReviewModel = mongoose.model('MovieReview', movieReviewSchema); //create model for movie reviews
const MusicReviewModel = mongoose.model('MusicReview', musicReviewSchema); //create model for music reviews



// Serve static files from the React app
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Add any additional headers you need to support here
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Add any additional methods you need to support here
    next();
});






//Add movie review
app.post('/api/addMovieReview', async (req, res) => {
    try {
        const newMovieReview = new MovieReviewModel(req.body); //create new movie review
        const savedReview = await newMovieReview.save(); //save movie review
        res.status(201).send(savedReview); //send saved review to front end review page
    } catch (err) {
        console.error("Error adding movie review:", err);
        res.status(500).send("Error adding movie review");
    }
});

//get all movie reviews
app.get('/api/getMovieReviews', async (req, res) => {
    try {
        const movieReviews = await MovieReviewModel.find(); //find all movie reviews
        res.send(movieReviews); //send movie reviews to front end
    } catch (err) {
        console.log(err);
    }
});

//update movie review from edit review page
app.put('/api/updateMovieReview/:id', async (req, res) => {
    try {
        const updatedReview = await MovieReviewModel.findByIdAndUpdate(
            req.params.id, //Get the ID from the URL parameters
            req.body,
            { new: true } //Return the updated document
        );
        if (!updatedReview) {
            return res.status(404).send('No review with that ID found.');
        }
        res.send(updatedReview);
    } catch (err) {
        console.error("Error updating movie review:", err);
        res.status(500).send("Error updating movie review");
    }
});

//delete movie review
app.delete('/api/deleteMovieReview/:id', async (req, res) => {
    try {
        const deletedReview = await MovieReviewModel.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!deletedReview) {
            return res.status(404).send('No review with that ID found.');
        }
        res.send(deletedReview);
    } catch (err) {
        console.error("Error deleting movie review:", err);
        res.status(500).send("Error deleting movie review");
    }
});



//Add music review
app.post('/api/addMusicReview', async (req, res) => {
    try {
        const newMusicReview = new MusicReviewModel(req.body); //create new music review
        const savedReview = await newMusicReview.save(); //save music review
        res.status(201).send(savedReview); //send saved review to front end review page
    } catch (err) {
        console.error("Error adding music review:", err);
        res.status(500).send("Error adding music review");
    }
});

//get all music reviews
app.get('/api/getMusicReviews', async (req, res) => {
    try {
        const musicReviews = await MusicReviewModel.find(); //find all music reviews
        res.send(musicReviews); //send music reviews to front end
    } catch (err) {
        console.log(err);
    }
});

//update music review from edit review page
app.put('/api/updateMusicReview/:id', async (req, res) => {
    try {
        const updatedReview = await MusicReviewModel.findByIdAndUpdate(
            req.params.id, // Get the ID from the URL parameters
            req.body, // Use the body of the request for the update
            { new: true } // Return the updated document
        );
        if (!updatedReview) {
            return res.status(404).send('No review with that ID found.'); //if no review found, send error
        }
        res.send(updatedReview); //send updated review to front end
    } catch (err) {
        console.error("Error updating music review:", err);
        res.status(500).send("Error updating music review");
    }
});

//delete music review
app.delete('/api/deleteMusicReview/:id', async (req, res) => {
    try {
        const deletedReview = await MusicReviewModel.findByIdAndDelete( //find and delete music review based on ID
            req.params.id, // Get the ID from the URL parameters
            req.body, // Use the body of the request for the update
            { new: true } // Return the updated document
        );
        if (!deletedReview) {
            return res.status(404).send('No review with that ID found.'); //if no review found, send error
        }
        res.send(deletedReview); //send deleted review to front end
    } catch (err) {
        console.error("Error deleting music review:", err);
        res.status(500).send("Error deleting music review");
    }
});


//search reviews
// Endpoint to search reviews
app.get('/api/searchReviews', async (req, res) => {
    const query = req.query.q; // Get the query from the URL parameters
    try {
        // Search both movie and music reviews for the query
        const movieResults = await MovieReviewModel.find({ title: new RegExp(query, 'i') });
        const musicResults = await MusicReviewModel.find({ title: new RegExp(query, 'i') });

        res.send({ movies: movieResults, music: musicResults }); // Send the results back to the client
    } catch (err) {
        console.error("Error searching reviews:", err);
        res.status(500).send("Error searching reviews");
    }
});

// Start the server and handle shutdown, allowing safe closing of the server
const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

const shutdown = () => {
    console.log('Shutting down server...');
    server.close(() => { // Close the server
        console.log('Server shut down.');
    });

    // If server hasn't finished in 10 seconds, shut down process forcefully
    setTimeout(() => {
        console.error('Forcing server shutdown...');
        process.exit(1); // Force shutdown
    }, 10000);
};

process.on('SIGINT', shutdown); // Listen for interrupt signal (Ctrl+C)
process.on('SIGTERM', shutdown); // Listen for terminate signal (kill)