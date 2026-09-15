import Header from "./Header";
import loginBanner from "../assets/login-banner.jpg";
import { useRef, useState } from "react";
import { validateSignUpFormData, validateSignInFormData } from "../utils/validateUserData";

import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import toast from 'react-hot-toast';
import { toastMessage } from "../utils/toasts";

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorObj, setErrorObj] = useState({
    isAnyValidationError: false,
    name: null,
    email: null,
    password: null
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  //At the time of toggle we need to refresh our page and there must be no error no data in the fields.
  function refreshFormFields() {

      setErrorObj({
        isAnyValidationError: false,
        name: null,
        email: null,
        password: null
      });

      if(!isSignInForm){
        nameRef.current.value = null;
      }
      emailRef.current.value = null;
      passwordRef.current.value = null;

  }

  function toggleSignInForm() {
    //At the time of toggle we need to refresh our page and there must be no error no data in the fields.
    refreshFormFields();
    
    setIsSignInForm(!isSignInForm);
  }

  const handleSignInSignUpSubmit = (e) => {
    // HERE I AM RESTRCTING THE DEFAULT FORM SUBMIT BECAUSE I NEED TO VALIDATE FORM FIRST.
    e.preventDefault();

    const nameVal = nameRef?.current?.value?.trim();
    const emailVal = emailRef?.current?.value?.trim();
    const passwordVal = passwordRef?.current?.value?.trim();

    
    // VALIDATE FORM DATA
    //console.log(nameRef.current.value.trim());
    
    let validationErrorObj = {};

    if(isSignInForm){
      validationErrorObj = validateSignInFormData(emailVal, passwordVal);
    }else{
      validationErrorObj = validateSignUpFormData(nameVal, emailVal, passwordVal);
    }
    setErrorObj(validationErrorObj);
    //SIGN UP:
    //ERROR: Registration failed. Please correct the highlighted errors and resubmit
    //SUCCESS: Account created successfully. Welcome aboard!

    //SIGN IN:
    //ERROR: Sign-in failed. Please check your credentials and try again.
    //SUCCESS: Signed in successfully. Welcome back!

    if(validationErrorObj.isAnyValidationError === true) {
      (isSignInForm)? toast.error(toastMessage("signin",false)) :  toast.error(toastMessage("signup",false));
      return
    }


    //Now i have validated my form data and everything is okay and now we are good to go with form submition.

    //Sign Up Form:
    if(!isSignInForm) {

      createUserWithEmailAndPassword(auth, emailVal, passwordVal)
      .then((userCredential) => {
        // Signed up 
        // const user = userCredential.user;
        // console.log("Sign Up User Detail: \n");
        // console.log(user);

        toast.success(toastMessage("signup",true));
        navigate("/browse");

      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // toast.error(errorCode + " - " + errorMessage);
        toast.error(toastMessage("signup",false));

      });
      
    }else {

      signInWithEmailAndPassword(auth, emailVal, passwordVal)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        // console.log("Sign In User Detail:\n");
        // console.log(user);


        toast.success(toastMessage("signin", true));
        navigate("/browse");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        //auth/invalid-credential - Firebase: Error (auth/invalid-credential).
        // toast.error(errorCode + " - " + errorMessage);
        toast.error(toastMessage("signin", false));
      });

    }


  }

return (
   <main className="min-h-screen bg-cover bg-center bg-black/40 bg-blend-darken"
      style={{ backgroundImage: `url(${loginBanner})` }}
   >
      
      <Header />
      
      <motion.section className="relative flex min-h-screen items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
      >
        <form onSubmit={(e) => handleSignInSignUpSubmit(e)} className="w-full max-w-md space-y-6 rounded-lg bg-black/80 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-white"> { isSignInForm? 'Sign In': 'Sign Up' } </h2>

          <div className="space-y-4">
            { !isSignInForm? 
            
            <input
              ref={nameRef}
              type="text"
              placeholder="Full Name"
              className="w-full rounded bg-neutral-700 px-4 py-3 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-primary font-serif"
            />           
            : null
            }

            {(!isSignInForm && errorObj.name !== null)? <p className="text-primary font-extrabold text-sm">{errorObj.name}</p>: null}

            <input
              ref={emailRef}
              type="text"
              placeholder="Email"
              className="w-full rounded bg-neutral-700 px-4 py-3 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-primary font-serif"
            />
            
            {errorObj.email !== null? <p className="text-primary font-extrabold text-sm">{errorObj.email}</p>: null}

            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="w-full rounded bg-neutral-700 px-4 py-3 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-primary font-serif"
            />
            
            {errorObj.password !== null? <p className="text-primary font-extrabold text-sm">{errorObj.password}</p>: null}

          </div>
          <button
            type="submit"
            className="w-full rounded bg-primary py-3 font-semibold text-white transition hover:opacity-90 cursor-pointer"
          >
             { isSignInForm? 'Sign In': 'Sign Up' } 
          </button>
          <p className="text-sm text-neutral-300">
            
             { isSignInForm? 'New to Cine Fest?': 'Already Registered User?' } 
            <button type="button" className="cursor-pointer text-white hover:underline px-1" onClick={() => toggleSignInForm()}>
              
              { isSignInForm? 'Sign up now.': 'Sign in now.' } 
            </button>
          </p>
        </form>
      </motion.section>
    </main>
)
}
export default Login;