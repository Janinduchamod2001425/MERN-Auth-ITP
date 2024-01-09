import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({...res}));
      toast.success('Login successful', {
        position: "top-right", 
        autoClose: 3000, 
        hideProgressBar: false,
        style: {
          // Customize toast styles
          backgroundColor: "#c4f9a9",
          color: "black",
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "monospace"
        }
      });
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        position: "top-right", 
        autoClose: 3000, 
        hideProgressBar: false,
        style: {
            backgroundColor: "#ffd5cc",
            color: "black",
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "monospace"
        }
      });
    }
  };

  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={ submitHandler }> 

            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={ (e) => setEmail(e.target.value) }></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroup.Text>
                        {showPassword ? (
                        <FiEyeOff onClick={() => setShowPassword(!showPassword)} />
                        ) : (
                        <FiEye onClick={() => setShowPassword(!showPassword)} />
                        )}
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>

            { isLoading && <Loader />}

            <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>

            <Row className='py-3'>
                <Col>
                    New User? <Link to='/register'>Register</Link>
                </Col>
            </Row>

        </Form>

    </FormContainer>
  )
}
 
export default LoginScreen;
