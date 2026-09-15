import Header from "./Header";
import loginBanner from "../assets/login-banner.jpg";
import { useRef, useState } from "react";
import { validateSignUpFormData, validateSignInFormData } from "../utils/validateUserData";

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


  function toggleSignInForm() {
    setErrorObj({
    isAnyValidationError: false,
    name: null,
    email: null,
    password: null
  });
    setIsSignInForm(!isSignInForm);
  }

  const handleSignInSignUpSubmit = (e) => {
    // HERE I AM RESTRCTING THE DEFAULT FORM SUBMIT BECAUSE I NEED TO VALIDATE FORM FIRST.
    e.preventDefault();
    
    // VALIDATE FORM DATA
    //console.log(nameRef.current.value.trim());
    
    let validationErrorObj = {};

    if(isSignInForm){
      validationErrorObj = validateSignInFormData(emailRef.current.value.trim(), passwordRef.current.value.trim(), isSignInForm)
    }else{
      validationErrorObj = validateSignUpFormData(nameRef?.current?.value?.trim(), emailRef.current.value.trim(), passwordRef.current.value.trim(), isSignInForm)
      console.log(validationErrorObj);

    }

    setErrorObj(validationErrorObj);
  }

return (
   <main className="min-h-screen bg-cover bg-center bg-black/40 bg-blend-darken"
      style={{ backgroundImage: `url(${loginBanner})` }}
   >
      
      <Header />
      
      <section className="relative flex min-h-screen items-center justify-center">
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
              type="email"
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
      </section>
    </main>
)
}
export default Login;