//This hook is created to handle user detail addition to redux store and redirection on the basis of if sign in or not.

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../Slices/userSlice";
import { auth } from "../firebase";

const useAuthFlowHandler = () => {

    
    const navigate = useNavigate();
    const dispatch  = useDispatch();

    useEffect(()=>{
        const unsubscribeFn = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const {uid, displayName, email } = user;

                const userDetail = {
                    uid: uid,
                    displayName: displayName,
                    email: email
                };

                dispatch(addUser(userDetail));
                navigate("/browse");
            } else {
                // User is signed out
                
                dispatch(removeUser());
                navigate("/");

            }
        });

        // To Unsubscribe when the component unmounts.
        return () => unsubscribeFn();

    }, []);

}
export default useAuthFlowHandler;