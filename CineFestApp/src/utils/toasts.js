export const toastMessage = (typeOfToast, isSuccessToast) => {
    if(typeOfToast === "signout") {
        if(isSuccessToast) {
            return "You have been logged out. Thank you for visiting Cine Fest.";
        }else{
            return "An error occurred while signing out. Please try again.";
        }
    }

    if(typeOfToast === "signin") {
        if(isSuccessToast) {
            return "Signed in successfully. Welcome back!";
        }else{
            return "Sign-in failed. Please check your credentials and try again.";
        }
    }

    if(typeOfToast === "signup") {
        if(isSuccessToast) {
            return "Account created successfully. Welcome aboard!";
        }else {
            return "Registration failed. Please correct the highlighted errors and resubmit."
        }
    }

}