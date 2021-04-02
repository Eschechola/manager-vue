const faker = require('faker');

class CustomerFixture{
    generateNewCustomer({
        id = null,
        name = null, 
        email = null,
        password = null
    } = {})
    {
        return{
            "id" : id != null ? id : faker.datatype.uuid(),
            "customer_name" : name != null ? name : faker.name.findName(),
            "customer_email" : email != null ? email : faker.internet.email(),
            "customer_password" : password != null ? password: faker.internet.password()
        }
    }
}

module.exports = new CustomerFixture();