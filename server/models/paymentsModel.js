import mongoose from "mongoose"

const paymentSchema = mongoose.Schema({
    cardNumber: {
        type: Number,
        required: true
    },
    expiration: {
        type: String,
        required: true
    },
    cvv: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        min: 1,
        required: true
    }
})

const payments = mongoose.model("payments", paymentSchema)

export default payments