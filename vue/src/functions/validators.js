class Validators{
    validateEmail(email){
        const regex = /\S+@\S+\.\S+/;
        return regex.test(String(email).toLowerCase());
    }

    validateString(str){
        if(str == null || str == "")
            return false;

        return true;
    }
}

export default new Validators();