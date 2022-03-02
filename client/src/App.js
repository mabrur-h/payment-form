import './App.css';
import FormInput from "./components/FormInput";
import { useState } from "react";

function App() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: ""
    })

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "username",
            label: "username"
        },
        {
            id: 2,
            name: "email",
            type: "text",
            placeholder: "email",
            label: "email"
        },
        {
            id: 3,
            name: "birthday",
            type: "text",
            placeholder: "birthday",
            label: "birthday"
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "password",
            label: "password"
        },
        {
            id: 5,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            label: "confirmPassword"
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
