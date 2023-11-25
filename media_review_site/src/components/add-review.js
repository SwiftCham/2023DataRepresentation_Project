//dependencies
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

//components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';




//create component
const AddReviews = () => {


    const navigate = useNavigate(); //used to navigate to different pages
    const [title, setTitle] = useState(""); //state for title
    const [artist, setArtist] = useState(""); //state for artist
    const [genre, setGenre] = useState(""); //state for genre
    const [rating, setRating] = useState(""); //state for rating
    const [review, setReview] = useState(""); //state for review
    const [trailer, setTrailer] = useState(""); //state for trailer
    const [albumCover, setAlbumCover] = useState(""); //state for album cover
    const [soundcloud, setSoundcloud] = useState(""); //state for soundcloud link
    const [reviewType, setReviewType] = useState('movie'); //state for type of review (movie or music)

    const handleSubmit = (e) => {

        e.preventDefault(); //prevents page from refreshing

            if (reviewType === 'movie') {
                const movieReview = {
                    title,
                    genre,
                    rating,
                    review,
                    trailer
                }

                // Corrected API endpoint
                axios.post('http://localhost:4000/api/addMovieReview', movieReview)
                    .then((res) => {
                        console.log(res.data);
                        navigate("/mvReviews");
                    }).catch((error) => {
                        console.error('Error posting movie review:', error);
                    });

            } else if (reviewType === 'music') {
                const musicReview = {
                    title,
                    artist,
                    genre,
                    rating,
                    review,
                    albumCover,
                    soundcloud
                }

                // Corrected API endpoint
                axios.post('http://localhost:4000/api/addMusicReview', musicReview)
                    .then((res) => {
                        console.log(res.data);
                        navigate("/msReviews");
                    }).catch((error) => {
                        console.error('Error posting music review:', error);
                    });
            }
        }

        const renderMovieForm = (e) => {
            return (
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="movieForm">
                            <Form.Label>Movie Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter movie title" onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="movieForm">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control type="text" placeholder="Enter genre" onChange={(e) => setGenre(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="movieForm">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" placeholder="Enter rating" onChange={(e) => setRating(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="movieForm">
                            <Form.Label>Review</Form.Label>
                            <Form.Control type="text" placeholder="Enter review" onChange={(e) => setReview(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="movieForm">
                            <Form.Label>Trailer</Form.Label>
                            <Form.Control type="text" placeholder="Enter trailer" onChange={(e) => setTrailer(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            );
        } 

        const renderMusicForm = (e) => {

            return (
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="musicForm">
                            <Form.Label>Music Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter music title" onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="musicForm">
                            <Form.Label>Artist</Form.Label>
                            <Form.Control type="text" placeholder="Enter artist" onChange={(e) => setArtist(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="musicForm">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control type="text" placeholder="Enter genre" onChange={(e) => setGenre(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="musicForm">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" placeholder="Enter rating" onChange={(e) => setRating(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="musicForm">
                            <Form.Label>Review</Form.Label>
                            <Form.Control type="text" placeholder="Enter review" onChange={(e) => setReview(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="musicForm">
                            <Form.Label>Album Cover</Form.Label>
                            <Form.Control type="text" placeholder="Enter album cover" onChange={(e) => setAlbumCover(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="musicForm">
                            <Form.Label>Soundcloud</Form.Label>
                            <Form.Control type="text" placeholder="Enter soundcloud" onChange={(e) => setSoundcloud(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            );
        }

        return (
            <Container>
                <Form.Select aria-label="Review Type" onChange={(e) => setReviewType(e.target.value)}
                className='mb-3
                '>
                    <option value='movie'>Movie</option>
                    <option value='music'>Music</option>
                </Form.Select>
                {reviewType === 'movie' ? renderMovieForm() : renderMusicForm()}
            </Container>

        );

    }
    export default AddReviews;