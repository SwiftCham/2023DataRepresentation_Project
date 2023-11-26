import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const ViewMusicReviews = () => {

    const navigate = useNavigate(); 
    const [musicReviews, setMusicReviews] = useState([]); //state for music reviews
    useEffect(() => {
        axios.get('http://localhost:4000/api/getMusicReviews') 
            .then((res) => {
                setMusicReviews(res.data); //set music reviews to data 
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Music Reviews</h1>
            <div className="row">
                {musicReviews.map((review) => (
                    <div className="col-sm-4" key={review._id}>
                        {/* Displays track in the format img, title,  artist, genre, review, rating and a soundcloud sample */}
                        <Card className="h-100">
                            <Card.Img variant="top" src={review.albumCover} alt="Album Cover" />
                            <Card.Body>
                                <Card.Title>{review.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{review.artist}</Card.Subtitle> 
                                <Card.Subtitle className="mb-2 text-muted">{review.genre}</Card.Subtitle>
                                <Card.Text>
                                    {review.review}
                                    <br />
                                    <strong>Rating:</strong> {review.rating}
                                </Card.Text>
                                {/* Calls the soundcloud player to be embedded in the with URL parametres to customise behaviours */}
                                <iframe
                                    width="100%"
                                    height="166"
                                    frameborder="no"
                                    allow="autoplay"
                                    src={`https://w.soundcloud.com/player/?url=${review.soundcloud}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}>
                                </iframe>
                                <button onClick={() => navigate(`/edit-review/music/${review._id}`)}>Edit</button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewMusicReviews;
