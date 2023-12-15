import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const DeleteReview = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState({ title: '', genre: '', rating: 0, review: '', artist: '', albumCover: '', soundcloud: '', trailer: '' }); //state for review
    const [loading, setLoading] = useState(true);
    

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


    // This will delete the review by making a DELETE request to the API
    const handleDelete = async () => {
        const apiEndpoint = type === 'movie' ? `http://localhost:4000/api/deleteMovieReview/${id}` : `http://localhost:4000/api/deleteMusicReview/${id}`;
        try {
            await axios.delete(apiEndpoint); // Make the DELETE request
            navigate(`/view-${type}-reviews`); // Navigate back to the list of reviews after deleting
        } catch (err) {
            console.error(err);
        }
    };


    // This will display a loading message while the data is being fetched
    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (!review) {
        return <h1>Review not found</h1>;
    }

    return (
        <div>
                {/*Buttons which will confirm if the user wishes to delete the media or return to the reviews page */}
                <button className='delete-button' onClick={handleDelete}>Delete Review??</button>
                <br></br>
                <button className='edit-button' onClick={() => navigate(`/view-${type}-reviews`)}>Cancel</button>
        </div>
    );
};

export default DeleteReview;

