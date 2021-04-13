class Validators{
    validateEmail(email){
        var errors = [];
        const regex = /\S+@\S+\.\S+/;
        const isValid = regex.test(String(email).toLowerCase());
        
        if(!isValid)
            errors.push("The EMAIL is invalid.");

        return errors;
    }

    validateString(str, fieldName){
        var errors = [];
        
        if(str == null || str == "")
            errors.push(`The ${fieldName.toUpperCase()} cannot be null or empty.`);

        return errors;
    }

    validateUsername(username){
        var errors = [];

        if(username == null || username == "")
            errors.push("The NAME cannot be a null or empty.");

        if(username.length < 3)
            errors.push("The NAME must be at least 3 characters.");

        if(username.length > 50)
            errors.push("The NAME must be a maximum of 50 characters.");

        return errors;
    }

    validatePassword(password){
        var errors = [];
        
        if(password == null || password == "")
            errors.push("The PASSWORD cannot be a null or empty.");

        if(password.length < 6)
            errors.push("The PASSWORD must be at least 6 characters.");

        if(password.length > 20)
            errors.push("The PASSWORD must be a maximum of 20 characters.");
        
        return errors;
    }

    validateLoginForm(email, password){
        var errors = [];

        const emailErrors = this.validateEmail(email);
        if(emailErrors.length > 0)
            errors = [...errors, ...emailErrors];

        const passwordErrors = this.validatePassword(password);
        if(passwordErrors.length > 0)
            errors = [...errors, ...passwordErrors];

        return errors;
    }

    validateSignupForm(name, email, password, confirmPassword){
        var errors = [];

        const usernameErrors = this.validateUsername(name);
        if(usernameErrors.length > 0)
            errors = [...errors, ...usernameErrors];

        const emailErrors = this.validateEmail(email);
        if(emailErrors.length > 0)
            errors = [...errors, ...emailErrors];

        const passwordErrors = this.validatePassword(password);
        if(passwordErrors.length > 0)
            errors = [...errors, ...passwordErrors];

        if(password != confirmPassword)
            errors.push("PASSWORDS are not the same.");

        return errors;
    }
}

export default new Validators();