import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
      <Navbar bg = "dark" variant = "dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="calculator">Calculator</Nav.Link>S
            <Nav.Link href="History">History</Nav.Link>
            <Nav.Link href = "Games">Games</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href ="SignUp">SignUp</Nav.Link>
            <Nav.Link href ="LogIn">LogIn</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default NavBar;