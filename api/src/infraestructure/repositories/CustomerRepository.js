const database = require('../database/connection');

class CustomerRepository{
    async create(name, email, password){
         var customerId = await database.insert(
            {
                "customer_name": name,
                "customer_email": email,
                "customer_password": password
            }
        ) 
        .table("customer");

        return customerId[0];
    }

    async getById(id){
        var customer = await database.where('id', id)
                        .table("customer");

        return customer[0];
    }
}

module.exports = new CustomerRepository();