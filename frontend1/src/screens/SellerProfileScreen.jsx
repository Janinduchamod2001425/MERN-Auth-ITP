import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useUpdateSellerMutation } from "../slices/sellersApiSlice";
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SellerProfileScreen = () => {
   
    const [name, setName] = useState('');
    const [nic, setNic] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sellerInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateSellerMutation();

    useEffect(() => {
        setName(sellerInfo.name);
        setNic(sellerInfo.nic);
        setEmail(sellerInfo.email);
    }, [sellerInfo.setName, sellerInfo.setNic, sellerInfo.setEmail]);

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
        } else {
            try {
                const res = await updateProfile({
                    _id: sellerInfo._id,
                    name,
                    nic,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('Profile Updated', {
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
            } catch (error) {
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
            <h1>Update Profile</h1>

            <Form onSubmit={ submitHandler }>

                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={name} onChange={ (e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="nic">
                    <Form.Label>NIC</Form.Label>
                    <Form.Control type="text" placeholder="Enter NIC number" value={nic} onChange={ (e) => setNic(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={ (e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
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
                
                <Form.Group className="my-2" controlId="confirmPassword">
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

                <Button type="submit" variant="primary" className="mt-3">
                    Update
                </Button>
            </Form>
        </FormContainer>
    )
}

export default SellerProfileScreen;
