import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Seller from '../models/sellerModel.js';

// @desc Auth Seller/set token
// route POST /api/sellers/auth
// @access public
const authSeller = asyncHandler (async(req, res) => {

    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });

    if(seller && (await seller.matchPassword(password))) {

        generateToken(res, seller._id); 
        
        res.status(201).json({
            _id: seller._id,
            name: seller.name,
            email: seller.email,
            nic: seller.nic
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
    
    //res.status(200).json({ message: 'Auth Seller' });
});

// @desc Register new Seller
// route POST /api/sellers
// @access public
const registerSeller = asyncHandler (async(req, res) => {
    const { name, email, password, nic } = req.body;

    const sellerExist = await Seller.findOne({ email });

    if(sellerExist) {
        res.status(400);
        throw new Error('Seller already exists');
    }

    const seller = await Seller.create({
        name,
        email,
        password,
        nic
    });

    if(seller) {
        
        generateToken(res, seller._id); 

        res.status(201).json({
            _id: seller._id,
            name: seller.name,
            email: seller.email,
            nic: seller.nic
        });
    } else {
        res.status(400);
        throw new Error('invalid Seller Data');
    }
});

// @desc Logout Seller
// route POST /api/sellers/logout
// @access public
const logoutSeller = asyncHandler (async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Seller Logged out' });
});

// @desc Get Seller profile
// route GET /api/sellers/profile
// @access private
const getSellerProfile = asyncHandler (async(req, res) => {
    
    const seller = {
        _id: req.seller._id,
        name: req.seller.name,
        email: req.seller.email,
        nic: req.seller.nic, 
    };

    res.status(200).json(seller);
});

// @desc Update Seller profile
// route PUT /api/sellers/profile
// @access private
const updateSellerProfile = asyncHandler (async(req, res) => {
    const seller = await Seller.findById(req.seller._id);

    if(seller) {
        seller.name = req.body.name || seller.name;
        seller.email = req.body.email || seller.email;
        seller.nic = req.body.nic || seller.nic;

        if(req.body.password) {
            seller.password = req.body.password;
        }

        const updatedSeller = await seller.save();

        res.status(200).json({
            _id: updatedSeller._id,
            name: updatedSeller.name,
            email: updatedSeller.email,
            nic: updatedSeller.nic
        });

    } else {
        res.status(404);
        throw new Error('Seller not found');
    }
});


export {
    authSeller, 
    registerSeller, 
    logoutSeller, 
    getSellerProfile, 
    updateSellerProfile
}