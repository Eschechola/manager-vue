const _customerRepository = require('../infraestructure/repositories/CustomerRepository');

class CustomerService{
    async createCustomer(name, email, password){
        const customerId = await _customerRepository.create(name, email, password);
        return await _customerRepository.getById(customerId);
    }
}

module.exports = new CustomerService();