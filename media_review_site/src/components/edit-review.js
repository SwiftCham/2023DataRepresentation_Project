import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const EditReview = () => {
    const [review, setReview] = useState({ title: '', genre: '', rating: 0, review: '', artist: '', albumCover: '', soundcloud: '', trailer: '' });
    const [loading, setLoading] = useState(true); // Add a loading state
    const { type, id } = useParams(); // This will get the type and ID from the URL
    const navigate = useNavigate();


    // This will fetch the review data from the API
    useEffect(() => {
        const apiEndpoint = type === 'movie' ? `http://localhost:4000/api/getMovieReview/${id}` : `http://localhost:4000/api/getMusicReview/${id}`;
        axios.get(apiEndpoint)
            .then(res => {
                setReview(res.data); // Set the review data from the API response
                setLoading(false); // Set loading to false when data is obtained
            })
            .catch(err => {
                console.error(err);
                setLoading(false); 
            });

    }, [type, id]);

    //This will update the review state when the user types in the form
    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    //submit the form
    const handleSubmit = (e) => {
        e.preventDefault();
        const apiEndpoint = type === 'movie' ? `http://localhost:4000/api/updateMovieReview/${id}` : `http://localhost:4000/api/updateMusicReview/${id}`;
        axios.put(apiEndpoint, review)
            .then(() => {
                navigate(`/${type}Reviews`); // Navigate back to the list of reviews after updating
            })
            .catch(err => console.error(err));
    };

    //form for editing reviews
    return (
        <div>
            
            <Form onSubmit={handleSubmit} className="form-input-group">

                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={review.title} onChange={handleChange} placeholder={loading ? 'Loading...' : review.title} />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" name="genre" value={review.genre} onChange={handleChange} placeholder={loading ? 'Loading...' : review.genre}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="number" name="rating" value={review.rating} onChange={handleChange} placeholder={loading ? 'Loading...' : review.rating}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Review</Form.Label>
                    <Form.Control as="textarea" name="review" value={review.review} onChange={handleChange} placeholder={loading ? 'Loading...' : review.review}/>
                </Form.Group>
                {type === 'music' && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Artist</Form.Label>
                            <Form.Control type="text" name="artist" value={review.artist} onChange={handleChange} placeholder={loading ? 'Loading...' : review.artist}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Album Cover</Form.Label>
                            <Form.Control type="text" name="albumCover" value={review.albumCover} onChange={handleChange} placeholder={loading ? 'Loading...' : review.albumCover}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Soundcloud</Form.Label>
                            <Form.Control type="text" name="soundcloud" value={review.soundcloud} onChange={handleChange} placeholder={loading ? 'Loading...' : review.soundcloud}/>
                        </Form.Group>
                    </>
                )}
                {type === 'movie' && (
                    <Form.Group className="mb-3">
                        <Form.Label>Trailer</Form.Label>
                        <Form.Control type="text" name="trailer" value={review.trailer} onChange={handleChange} placeholder={loading ? 'Loading...' : review.trailer}/>
                    </Form.Group>
                )}
                <Button variant="primary" type="submit">Update Review</Button>
            </Form>
        </div>
    );
};

export default EditReview;



