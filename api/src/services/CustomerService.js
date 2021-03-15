const CustomerAlreadyExistsException = require('../utilities/exceptions/CustomerAlreadyExistsException');
const _customerRepository = require('../infraestructure/repositories/CustomerRepository');

class CustomerService{
    async login(email, password){
        const customer = await _customerRepository.getByEmail(email);
        
        if(customer == undefined)
            return;

        if(password != customer[0].customer_password)
            return;

        return customer[0];
    }

    async create(name, email, password){
        const customerExists = await _customerRepository.getByEmail(email);

        if(customerExists.length > 0)
            return Promise.reject('Already exists a customer with this email!!').catch(err => {
                throw new CustomerAlreadyExistsException(err);
        });

        const customerId = await _customerRepository.create(name, email, password);
        const customerCreated = await _customerRepository.getById(customerId);

        return customerCreated[0];
    }
}

module.exports = new CustomerService();