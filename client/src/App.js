import './App.css';
import FormInput from "./components/FormInput";
import { useState } from "react";
import axios from "axios";

function App() {
    const [values, setValues] = useState({
        cardNumber: "",
        expiration: "",
        cvv: "",
        amount: "",
        buttonDisabled: true,
        inputState: {
            cardNumber: false,
            expiration: false,
            cvv: false,
            amount: false
        }
    })

    const inputs = [
        {
            id: 1,
            name: "cardNumber",
            type: "text",
            placeholder: "Your Card Number",
            label: "cardNumber",
            errorMessage: "This field should be only numbers and length 16 symbols",
            pattern: "^[0-9]{16}$",
            required: true,
        },
        {
            id: 2,
            name: "expiration",
            type: "text",
            placeholder: "MM/YYYY",
            label: "expiration",
            pattern: "^(0[1-9]|1[0-2])\/?([0-9]{4})$",
            errorMessage: "Expiration date should be in format MM/YYYY",
            required: true
        },
        {
            id: 3,
            name: "cvv",
            type: "text",
            placeholder: "CVV",
            label: "cvv",
            pattern: "^([0-9]{3})$",
            errorMessage: "CVV should be only numbers and length 3 symbols",
            required: true
        },
        {
            id: 4,
            name: "amount",
            type: "text",
            placeholder: "Amount",
            label: "amount",
            errorMessage: "Amount should be only numbers",
            pattern: `^[0-9]*$`,
            required: true
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()

        const payment = {
            cardNumber: values.cardNumber,
            amount: values.amount,
            cvv: values.cvv,
            expiration: values.expiration
        }
        axios.post('http://localhost:7070/api/payments/create', payment)
            .then(response => {
                alert(`RequestId: ${response.data.data._id}, Amount: ${response.data.data.amount}`)
            })
            .catch(e => {
                alert(e)
            })

        setValues({
            cardNumber: "",
            expiration: "",
            cvv: "",
            amount: "",
            buttonDisabled: true,
            inputState: {
                cardNumber: false,
                expiration: false,
                cvv: false,
                amount: false
            }
        })
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        let inputField = inputs.find(el => el.name === e.target.name)
        if (new RegExp(inputField.pattern).test(e.target.value)) {
            values.inputState[e.target.name] = true
        } else {
            values.inputState[e.target.name] = false
        }
    }

    if (Object.values(values.inputState).every(item => item === true)) {
        values.buttonDisabled = false
    } else {
        values.buttonDisabled = true
    }

    const onKeyPress = (e) => {
        if (!/[0-9]/.test(e.key) || e.target.value.length > 15) {
            e.preventDefault();
        } else if (e.target.name === 'expiration' && e.target.value.length > 1 && e.target.value.length < 3) {
            e.target.value += '/'
        } else if (e.target.name === 'expiration' && e.target.value.length > 6) {
            e.preventDefault()
        } else if (e.target.name === 'cvv' && e.target.value.length > 2) {
            e.preventDefault()
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit} id='submitForm'>
                <h1>Payment Form</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                ))}
                <button disabled={values.buttonDisabled}>Send Payment</button>
            </form>
        </div>
    );
}

export default App;
