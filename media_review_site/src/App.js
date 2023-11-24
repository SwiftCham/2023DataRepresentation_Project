
import './App.css';

//dependencies
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

//components
import mvReviews from './components/viewMovieReviews';
import msReviews from './components/viewMusicReviews';
import AddReviews from './components/addReview';


function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Media Review Site</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/msReviews">Music Reviews</Nav.Link>
              <Nav.Link href="/mvReviews">Movie Reviews</Nav.Link>
              <Nav.Link href="/AddReviews">Add a Review</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <div className="App">
          <Routes>
            <Route path="/components/viewMusicReviews" element={<mvReviews />} />
            <Route path="/components/viewMovieReviews" element={<msReviews />} />
            <Route path="/components/addReview" element={<AddReviews />} />
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
