import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";

function Header( {setSearch}: any) {
  const history = useNavigate();

  const dispatch: any = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history("/");
  };
  return (
    <Navbar collapseOnSelect expand='lg' bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>Patient Management</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='m-auto'>
            <Form inline>
              <FormControl
                type='text'
                placeholder='Search'
                className='mr-sm-2'
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          <Nav>
            <>
              <Nav.Link href='/mypatients'>
                <Link to='/mypatients'>My Patients</Link>
              </Nav.Link>
              <NavDropdown title={`Bipin`} id='collasible-nav-dropdown'>
                <NavDropdown.Item href='/profile'>My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
            <Nav.Link href='/login'>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
