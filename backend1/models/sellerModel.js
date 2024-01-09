import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const sellerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    nic: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true
}); 

sellerSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

sellerSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;