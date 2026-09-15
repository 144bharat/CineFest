import { useEffect } from "react";
import Browse from "./Browse";
import Login from "./Login";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/Slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

const appRouter = createBrowserRouter([
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/browse',
                element: <Browse />
            }
])


const Body = () => {
    const dispatch  = useDispatch();
useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            const {uid, displayName, email } = user;

            const userDetail = {
                uid: uid,
                displayName: displayName,
                email: email
            };

            dispatch(addUser(userDetail));
        } else {
            // User is signed out
            
            dispatch(removeUser());
        }
    });

}, []);

    return (
            <RouterProvider router={appRouter}>
            </RouterProvider>
    )
}
export default Body;