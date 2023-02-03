import { useState, FormEvent, ChangeEvent } from "react"
import { AuthError, AuthErrorCodes } from "firebase/auth"
import { useDispatch } from "react-redux"
import FormInput from "../form-input/form-input.component"
import "./sign-up-form.styles.scss"
import Button from "../button/button.component"
import { signUpStart } from "../../store/user/user.action"


const defaultFormFields = {
    displayName : "",
    email : "",
    password : "",
    confirmPassword : ""
}

const SignUpForm = () => {
    
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, displayName, confirmPassword } = formFields;

    // const {setCurrentUser} = useContext(UserContext)


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName))
            resetFormFields();
        } catch (error) {
            if((error as AuthError).code ===AuthErrorCodes.EMAIL_EXISTS){
                alert("Email is already in use")
            }else {
                console.log('user creation encountered an error');
            }
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name] : value});
    }

  return (
    <div className="sign-up-container">
        <h2>Don't have an account ?</h2>
        <span>Sign up your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Display Name : " onChange={handleChange} type="text" required name="displayName" value={displayName}/>
            <FormInput label="Email : " onChange={handleChange} type="email" required name="email" value={email}/>
            <FormInput label="Password : " onChange={handleChange} type="password" required name="password" value={password}/>
            <FormInput label="Confirm Password : " onChange={handleChange} type="password" required name="confirmPassword" value={confirmPassword}/>
            <Button type="submit">Sign up</Button>
        </form>
    </div>
  )
}

export default SignUpForm;