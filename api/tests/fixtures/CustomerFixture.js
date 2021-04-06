const faker = require('faker');

class CustomerFixture{
    generateNewCustomer({
        id = faker.datatype.uuid(),
        name = faker.name.findName(), 
        email = faker.internet.email(),
        password = faker.internet.password()
    } = {})
    {
        return{
            "id" : id,
            "customer_name" : name,
            "customer_email" : email,
            "customer_password" : password
        }
    }
}

module.exports = new CustomerFixture();