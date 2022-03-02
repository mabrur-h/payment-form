import paymentsModel from "../models/paymentsModel.js";

export default class PaymentsController {
    static async postPayment (req, res, next) {
        try {
            const { cardNumber, expiration, cvv, amount } = req.body

            if (!(cardNumber || expiration || cvv || amount)) throw new res.error(400, "Bad Request")

            const createPayment = new paymentsModel({
                cardNumber,
                expiration,
                cvv,
                amount
            })

            console.log(createPayment)

            res.json({
                ok: true,
                data: createPayment
            })
        } catch (e) {
            next(e)
            console.log(e)
        }
    }
}