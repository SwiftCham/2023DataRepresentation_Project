//dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoConnect().catch(err => console.log(err)); //async function to connect to database

//connect to database
async function mongoConnect() {
    try {
        //coonection string: mongodb+srv://benjaminstacey15:<password>@cluster0.lqmsp7v.mongodb.net/
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://benjaminstacey15:1565Sgy3NhUVdllx@cluster0.lqmsp7v.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to database");
    } catch (err) {
        console.log(err);
    }
}

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
