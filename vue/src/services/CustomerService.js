const axios = require('axios');
const apiConfig = require('../config/ApiConfig');

class CustomerService{
    async login(email, password){
        try{
            const url = apiConfig.CUSTOMER_URL.LOGIN;
            const response = await axios.post(url, {
                "email": email,
                "password": password
            });

            return response;
        }
        catch(e){
            console.log(e);
        }
    }
}

module.exports = new CustomerService();