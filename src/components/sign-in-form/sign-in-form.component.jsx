import { useState } from "react"
import { useDispatch } from "react-redux"
import FormInput from "../form-input/form-input.component"
import "./sign-in-form.styles.scss"
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action"


const defaultFormFields = {
    email : "",
    password : ""
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;
    const dispatch = useDispatch()


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password))
            // setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            switch(error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password");
                    break;
                case "auth/user-not-found":
                    alert("User not found");
                    break;
                default:
                    console.log(error)
            }
            // if(error.code === "auth/wrong-password"){
            //     alert("incorrect password for email")
            // }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name] : value});
    }

  return (
    <div className="sign-up-container">
        <h2>Already have an account ?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Email : " onChange={handleChange} type="email" required name="email" value={email}/>
            <FormInput label="Password : " onChange={handleChange} type="password" required name="password" value={password}/>
            <div className="buttons-container">
                <Button type="submit">Sign in</Button>
                <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
            </div>
        </form>
    </div>
  )
}

export default SignInForm;