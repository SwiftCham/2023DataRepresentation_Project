import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './search-results.css'

const SearchResults = () => {
    const [results, setResults] = useState({ movies: [], music: [] }); //state for search results
    const location = useLocation();  //used to get the current location
    const navigate = useNavigate(); //used to navigate to different pages

    // Extract the search query from the URL
    const searchQuery = new URLSearchParams(location.search).get('query'); //gets search query from URL


    useEffect(() => {
        const fetchResults = () => {
            axios.get(`http://localhost:4000/api/searchReviews?q=${encodeURIComponent(searchQuery)}`) //api endpoint for search
                .then((res) => {
                    setResults(res.data);
                })
                .catch((error) => {
                    console.error('Error fetching search results:', error);
                });
        };

        if (searchQuery) {
            fetchResults();
        }
    }, [searchQuery]); //re-renders when searchQuery changes

    return (
        <div>
            <h2>Search Results for "{searchQuery}"</h2>
            <div className="search-results-container">
                <div className="reviews-column">
                    <h3>Movie Reviews</h3>
                    {results.movies.map((review, index) => (
                        <Card className="search-results-card" key={index}>
                            <Card.Body>
                                <Card.Title>{review.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{review.genre}</Card.Subtitle>
                                <Card.Text>
                                    {review.review}
                                    <br />
                                    <strong>Rating:</strong> {review.rating}
                                </Card.Text>
                                {review.trailer && (
                                    <iframe
                                        width="100%"
                                        height="auto"
                                        src={`https://www.youtube.com/embed/${new URLSearchParams(new URL(review.trailer).search).get('v')}`}
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe>
                                )}
                                <button className='edit-button' onClick={() => navigate(`/edit-review/movie/${review._id}`)}>Edit</button>
                                <button className='delete-button' onClick={() => navigate(`/delete-review/movie/${review._id}`)}>Delete</button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <div className="divider"></div>
                <div className="reviews-column">
                    <h3>Music Reviews</h3>
                    {results.music.map((review, index) => (
                        <Card className="search-results-card" key={index}>
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
                                <iframe
                                    width="100%"
                                    height="166"
                                    frameborder="no"
                                    allow="autoplay"
                                    src={`https://w.soundcloud.com/player/?url=${review.soundcloud}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}>
                                </iframe>
                                <button className='edit-button' onClick={() => navigate(`/edit-review/music/${review._id}`)}>Edit</button>
                                <button className='delete-button' onClick={() => navigate(`/delete-review/music/${review._id}`)}>Delete</button>
                            </Card.Body>
                        </Card>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
