import React from 'react';
import '../styles/Cart.css';
import { Container, Card, Button } from 'react-bootstrap';

const Cart = () => {
  return (
    <div className='py-5'> 
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card w-75' style={{borderRadius: '30px', backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)'}}>
          <h1 className='text-center mb-4'>Cart Page</h1>
          <p className='text-center mb-4'>
          "Introducing our Supply & Demand app - your go-to platform for seamless market interactions. Easily track market trends, list your products or services, and connect with buyers or suppliers in real-time. Whether you're looking to sell, buy, or simply stay updated on market dynamics, our app simplifies the process, empowering users with instant access to a dynamic marketplace at their fingertips."
          </p>
        </Card>
      </Container>
    </div>
  )
}

export default Cart
