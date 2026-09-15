export const validateSignUpFormData = (name, email, password) => {

let errorObj = {
    isAnyValidationError: false,
    name: null,
    email: null,
    password: null
}

const nameErrors = [];

if(name.length < 3 || name.length >15){
    nameErrors.push("• Must be 3–16 characters");
}

if(!/^[a-zA-Z0-9_-]+$/.test(name)){
    nameErrors.push("• Can contain only letters, numbers, _ and -");
}

if(nameErrors.length > 0){
    errorObj.isAnyValidationError = true;

    if(name.length === 0){
    errorObj.name = "Full Name is required.";    
    }else{
        errorObj.name = `Full Name is Invalid:\n${nameErrors.join("\n")}`; 
    }
}


const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
let emailErrors = [];

if(!isEmailValid){
    emailErrors = ["• Must contain a valid email format", "• Must have @", "• Must have a valid domain such as .com"];
    
    if(email.length === 0){
    errorObj.email = "Email Address is required.";    
    }else{
    errorObj.email =  `Email Address Is Invalid:\n${emailErrors.join("\n")}`;
    }
    errorObj.isAnyValidationError = true;
}

const passwordErrors = [];

if (password.length < 8) {
    passwordErrors.push("• Must be at least 8 characters");
}

if (!/[A-Z]/.test(password)) {
    passwordErrors.push("• Must contain at least one uppercase letter");
}

if (!/[a-z]/.test(password)) {
    passwordErrors.push("• Must contain at least one lowercase letter");
}

if (!/[0-9]/.test(password)) {
    passwordErrors.push("• Must contain at least one number");
}

if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(password)) {
    passwordErrors.push("• Must contain at least one special character");
}

if (passwordErrors.length > 0) { 
    errorObj.isAnyValidationError = true;
    
    if(password.length === 0){
    errorObj.password = "Password is required.";    
    }else{
    errorObj.password =  `Password Is Invalid:\n${passwordErrors.join("\n")}`;
    }
}


return errorObj;
}


export const validateSignInFormData = (email, password) => {

let errorObj = {
    isAnyValidationError: false,
    email: null,
    password: null
}

if(email.length === 0){
    errorObj.isAnyValidationError = true;
    errorObj.email = "Email Address is required.";
}else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
    errorObj.isAnyValidationError = true;
    errorObj.email = "Email Address is Invalid.";
}

if(password.length === 0){
    errorObj.isAnyValidationError = true;
    errorObj.password = "Password Address is required.";
}
// else if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
//     errorObj.email = "Email Address is Invalid.";
// }

return errorObj;

}