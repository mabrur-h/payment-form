import {request, Router} from "express";
import PaymentsController from "../controllers/paymentsController.js";

const PaymentRoutes = Router()

PaymentRoutes.post('/create', PaymentsController.postPayment)

PaymentRoutes.get('/:payment_id', (req, res) => {
    res.send("Hello world")
})

export default PaymentRoutes