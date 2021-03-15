const database = require('../database/Connection');

class CustomerRepository{
    async create(name, email, password){
         var customerId = await database.insert(
            {
                "customer_name": name.toUpperCase(),
                "customer_email": email.toLowerCase(),
                "customer_password": password
            }
        ) 
        .table("customer");

        return customerId[0];
    }

    async getById(id){
        return await database.where('id', id)
                        .table("customer");
    }

    async getByEmail(email){
        return await database.where('customer_email', email.toLowerCase())
                        .table("customer");
    }
}

module.exports = new CustomerRepository();