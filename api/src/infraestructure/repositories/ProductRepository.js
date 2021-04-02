const { getbyId } = require('../../services/ProductService');
const database = require('../database/Connection');

class ProductRepository{
    async create(customerId, name, description, quantity, price){
        var productId = await database.insert(
            {
                "customerId": customerId,
                "product_name": name.toUpperCase(),
                "product_description": description,
                "product_quantity": quantity,
                "product_price": price
            }
        ) 
        .table("product");

        return productId[0];
    }

    async update(productId, name, description, quantity, price){
        const fieldsToUpdate = {}

        if(name != undefined)
            fieldsToUpdate.product_name = name;
        
        if(description != undefined)
            fieldsToUpdate.product_description = description;

        if(quantity != undefined)
            fieldsToUpdate.product_quantity = quantity;

        if(price!= undefined)
            fieldsToUpdate.product_price = price;

        await database.where('id', productId)
                    .update(fieldsToUpdate)
                    .table("product");
    }

    async delete(productId){
        await database.where('id', productId)
                .table("product")
                .del();
    }

    async getById(id){
        return await database.where('id', id)
            .table("product");
    }

    async searchByName(name){
        var products = await database
            .raw('SELECT * FROM product WHERE product_name LIKE ?', ['%'+name+'%']);

        return products;
    }

    async exists(id){
        const product = await getbyId(id);

        return product.length != 0;
    }

    async verifyCustomerId(customerId){
        var product = await getbyId(id);
        
        return product[0].customerId == customerId;
    }
}

module.exports = new ProductRepository();