const database = require('../database/Connection');

class ProductRepository{
    async create(userId, name, description, quantity, price){
        var productId = await database.insert(
            {
                "userId": userId,
                "product_name": name.toUpperCase(),
                "product_description": description,
                "product_quantity": quantity,
                "product_price": price
            }
        ) 
        .table("product");

        return productId[0];
    }

    async getById(id){
        return await database.where('id', id)
            .table("product");
    }

    async searchByName(name){
        var products = await database.whereRaw('LOWER(product_name) like \'%??%\'', [name.toLowerCase()])
                            .table("product");

        return products;
    }

    async delete(productId){
        await database.where('id', productId)
                .table("product")
                .del();
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
}

module.exports = new ProductRepository();