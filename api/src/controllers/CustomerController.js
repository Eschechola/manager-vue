const _customerService = require('../services/CustomerService');

class CustomerController {
    async createCustomer(request, response){
        const { name, email, password } = request.body;
        
        const customer = await _customerService.createCustomer(name, email, password); 

        console.log(customer);

        response.json({
            message: "Cliente criado com sucesso!",
            success: true,
            data: {
                id: customer.id,
                name: customer.customer_name,
                email: customer.customer_email
            }
        });
    }
}

module.exports = new CustomerController();