const CustomerAlreadyExistsException = require('../utilities/exceptions/CustomerAlreadyExistsException');

const _customerService = require('../services/CustomerService');
const _tokenMiddleware = require('../middlewares/token/TokenMiddleware');

class CustomerController {
    async me(request, response){
        const customerData = await _tokenMiddleware.getCustomerAuthenticatedData(request);

        try{
            response.status(200).send({
                message: "User is authenticated!",
                success: true,
                data: customerData
            });
        }
        catch(e){
            response.status(500).send({
                message: "An internal server error has been thrown, please try again",
                success: false,
                data: null
            });
        }
    }

    async login(request, response){
        try{
            const { email, password } = request.body;

            var customerLogin = await _customerService.login(email, password);
            
            if(customerLogin != undefined)
                response.status(200).send({
                    message: "Login successful, Welcome again!",
                    success: true,
                    data: {
                        id: customerLogin.id,
                        name: customerLogin.customer_name,
                        email: customerLogin.customer_email,
                        token: _tokenMiddleware.generateToken(customerLogin.id, customerLogin.customer_name, customerLogin.customer_email)
                    }
                });
            else
                response.status(500).send({
                    message: "Email and/or password is invalid.",
                    success: false,
                    data: null
                });
            
        }
        catch(e){
            response.status(500).send({
                message: "An internal server error has been thrown, please try again",
                success: false,
                data: null
            });
        }
    }

    async create(request, response){
        try {
            const { name, email, password } = request.body;
            
            const customer = await _customerService.create(name, email, password); 

            response.json({
                message: "Cliente criado com sucesso!",
                success: true,
                data: {
                    id: customer.id,
                    name: customer.customer_name,
                    email: customer.customer_email,
                    token: _tokenMiddleware.generateToken(customer.id, customer.customer_name, customer.customer_email)
                }
            });
        }
        catch(e){
            if (e instanceof CustomerAlreadyExistsException)
                response.status(401).send({
                    message: e.message,
                    success: false,
                    data: null
                });
            else
                response.status(500).send({
                    message: "An internal server error has been thrown, please try again",
                    success: false,
                    data: null
                });
        }
    }
}

module.exports = new CustomerController();