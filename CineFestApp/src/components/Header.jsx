import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import { USER_LOGO_URL } from "../utils/constant";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { toastMessage } from "../utils/toasts";

import useAuthFlowHandler from "../utils/customHooks/useAuthFlowHandler";


const Header = () => {
  const [showUserProfileMenu, setShowUserProfileMenu] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  //This hook is created to handle user detail addition to redux store and redirection on the basis of if sign in or not.
  useAuthFlowHandler();

   const handleSignOut = () => {
    signOut(auth).then(() => {
        toast.success(toastMessage("signout",true));
    }).catch((error) => {
        toast.error(toastMessage("signout",false));
    });
   }

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute inset-x-0 top-0 z-20 px-8 py-6 sm:px-12 bg-linear-to-b from-black flex justify-between"
    >
      <div className="flex items-center">

        <img src={logo} alt="Cine Fest logo" className="w-18 sm:w-22" />
        <h1 className="ml-2 text-3xl font-disney text-primary sm:text-4xl">
          Cine Fest
        </h1>

      </div>

        {
          (!isLoginPage)?
          <div>
            <div onClick={() => { setShowUserProfileMenu(!showUserProfileMenu)}} className="relative flex flex-col items-center w-full">
              <img src={USER_LOGO_URL} className="w-2/5 rounded-xl outline-0 hover:outline-2 hover:outline-primary mb-5"/>
                <AnimatePresence>
                
                  {(showUserProfileMenu)? 
                      <motion.ul
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full w-4/5 p-2 bg-midnight text-secondary rounded-lg flex flex-col gap-1 items-center flex-nowrap"
                      >
                          
                          <li>User Name</li>
                          <li>+91-9999-999-999</li>
                          <button onClick={() => handleSignOut()} className="bg-primary text-secondary rounded-lg py-2 px-4 cursor-pointer hover:bg-red-700">Sign Out</button>
                      </motion.ul> : null
                  }

                </AnimatePresence>

                
            </div>
          </div> 
          :null
        }

    </motion.header>
  );
};
export default Header;
