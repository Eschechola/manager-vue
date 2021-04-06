class ApiConfig{
    get BASE_URL(){
        return "http://localhost:4000/api/"
    }

    get CUSTOMER_URL(){
        return {
            LOGIN: this.BASE_URL + "v1/customers/login",
            SIGNUP: this.BASE_URL + "v1/customers/create",
            ME: this.BASE_URL + "v1/me"
        }
    }


    get PRODUCT_URL(){
        return {

        }
    }
}

module.exports = new ApiConfig();