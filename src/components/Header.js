import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <div>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d5gA5wYnU4FftSFRrETOypKx9awhtrnEaQ&usqp=CAU"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Music Visualizer
          </Navbar.Brand>
        </Container>
      </Navbar>
</div>
  )
}

export default Header;