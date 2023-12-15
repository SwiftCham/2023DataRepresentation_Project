// NavbarWithSearch.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/esm/Navbar';
import Nav from 'react-bootstrap/esm/Nav';
import Container from 'react-bootstrap/Container';

const NavbarWithSearch = () => {
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const navigate = useNavigate(); // Used to navigate to different pages

    const handleSearchChange = (e) => { // Updates the search term when the user types in the search box
        setSearchTerm(e.target.value);  //updates search term
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <Navbar className='navbar'>
            <Container>
                <Navbar.Brand as={Link} to="/">Media Review Site</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/view-music-reviews">Music Reviews</Nav.Link>
                    <Nav.Link as={Link} to="/view-movie-reviews">Movie Reviews</Nav.Link>
                    <Nav.Link as={Link} to="/add-review">Add a Review</Nav.Link>
                </Nav>
            </Container>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search Reviews..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>
        </Navbar>
    );
};

export default NavbarWithSearch;
