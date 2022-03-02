import './App.css';
import FormInput from "./components/FormInput";
import { useState } from "react";

function App() {
    const [values, setValues] = useState({
        cardNumber: "",
        expiration: "",
        cvv: "",
        amount: ""
    })

    const inputs = [
        {
            id: 1,
            name: "cardNumber",
            type: "text",
            placeholder: "Card Number",
            label: "cardNumber",
            errorMessage: "This field should be only numbers and length 16 symbols",
            pattern: "^[0-9]{16}$",
            required: true,
        },
        {
            id: 2,
            name: "expiration",
            type: "text",
            placeholder: "email",
            label: "expiration",
            pattern: "^(0[1-9]|1[0-2])\\/?([0-9]{4})$",
            errorMessage: "Expiration date should be in format MM/YYYY",
            required: true
        },
        {
            id: 3,
            name: "cvv",
            type: "text",
            placeholder: "card cvv",
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
            pattern: `^[0-9]$`,
            required: true
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    console.log(values)

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <h1>Payment Form</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <button>Submit</button>
            </form>
        </div>
    );
}

export default App;
