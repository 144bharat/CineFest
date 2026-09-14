import Header from "./Header";
import loginBanner from "../assets/login-banner.jpg";
import { useState } from "react";

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

  function toggleSignInForm() {
    setIsSignInForm(!isSignInForm);
  }

return (
   <main className="min-h-screen bg-cover bg-center bg-black/40 bg-blend-darken"
      style={{ backgroundImage: `url(${loginBanner})` }}
   >
      
      <Header />
      
      <section className="relative flex min-h-screen items-center justify-center">
        <form className="w-full max-w-md space-y-6 rounded-lg bg-black/80 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-white"> { isSignInForm? 'Sign In': 'Sign Up' } </h2>

          <div className="space-y-4">
            { !isSignInForm? 
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded bg-neutral-700 px-4 py-3 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-primary font-serif"
            />
            : null
            }
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded bg-neutral-700 px-4 py-3 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-primary font-serif"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded bg-neutral-700 px-4 py-3 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-primary font-serif"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-primary py-3 font-semibold text-white transition hover:opacity-90"
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