import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice'; 
import '../styles/Cart.css';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>Supply & Demand</Navbar.Brand>
            </LinkContainer>
            <Link to='/cart' className='cart-button'>Cart 💰</Link>
            <Link to="http://localhost:3001" style={{marginLeft: '50px', textDecoration: 'none', fontFamily: 'monospace', color: 'aqua'}}>Switch to Selling</Link>   
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                  { userInfo ? (
                    <>
                      <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>
                            Profile
                          </NavDropdown.Item>
                        </LinkContainer>
                          <NavDropdown.Item onClick={ logoutHandler }>
                            Logout
                          </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <LinkContainer to='/login'>
                        <Nav.Link className='btn btn-primary me-2'>
                          Sign In
                        </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/register'>
                          <Nav.Link className='btn btn-success'>
                            Sign Up
                          </Nav.Link>
                      </LinkContainer>  
                    </>
                  ) }
                    
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
