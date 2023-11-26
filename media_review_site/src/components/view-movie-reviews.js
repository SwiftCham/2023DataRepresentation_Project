//dependencies
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';



// Define the MvReviews component
const ViewMovieReviews = () => {

    const navigate = useNavigate();
    const [movieReviews, setMovieReviews] = useState([]); //state for movie reviews
    useEffect(() => {
        axios.get('http://localhost:4000/api/getMovieReviews')
            .then((res) => {
                setMovieReviews(res.data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Movie Reviews</h1>
            <div className="row">
                {/* Displays movie in the format title, genre, review, rating and a trailer */}
                {movieReviews.map((review) => (
                    <div className="col-sm-4" key={review._id}>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>{review.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{review.genre}</Card.Subtitle>
                                <Card.Text>
                                    {review.review}
                                    <br />
                                    <strong>Rating:</strong> {review.rating}
                                </Card.Text>
                                {
                                    (() => {
                                        try {
                                            const videoId = new URLSearchParams(new URL(review.trailer).search).get('v');
                                            return (
                                                //Embeds the youtube video in the card using URL parametres to customise behaviours
                                                <iframe
                                                    width="100%" //Makes width responsive
                                                    height="auto" //Sets height to auto
                                                    src={`https://www.youtube.com/embed/${videoId}`}
                                                    title="YouTube video player"
                                                    frameborder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen>
                                                </iframe>
                                            );
                                        } catch {
                                            //Returns an error message or alternative content if the URL is not valid
                                            return <p>Trailer not available</p>;
                                        }
                                    })()
                                }
                                <button onClick={() => navigate(`/edit-review/movie/${review._id}`)}>Edit</button>
                                <button onClick={() => navigate(`/delete-review/movie/${review._id}`)}>Delete</button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

//Export the MvReviews component as the default export
export default ViewMovieReviews;


