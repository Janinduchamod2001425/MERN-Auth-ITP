import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const RegisterScreen = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [register, {isLoading}] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);  

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
        toast.error('Passwords do not match', {
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
    }else{
        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Registration successful', {
                position: "top-right", 
                autoClose: 3000, 
                hideProgressBar: false,
                style: {
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
    }
  };

  return (
    <FormContainer>
        <h1>Sign Up</h1>

        <Form onSubmit={ submitHandler }> 

            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={ (e) => setName(e.target.value) }></Form.Control>
            </Form.Group>

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

            <Form.Group className='my-2' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Enter Password Again'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>

            {isLoading && <Loader />}

            <Button type='submit' variant='primary' className='mt-3'>Sign Up</Button>

            <Row className='py-3'>
                <Col>
                    Already have an account? <Link to='/login'>Login</Link>
                </Col>
            </Row>

        </Form>

    </FormContainer>
  )
}
 
export default RegisterScreen;
