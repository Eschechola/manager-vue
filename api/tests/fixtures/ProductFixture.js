const faker = require('faker');

class ProductFixture{
    generateNewProduct({
        id = faker.datatype.uuid(),
        customerId = faker.datatype.uuid(),
        name = faker.lorem.word(2),
        description = faker.lorem.text(5),
        quantity = faker.datatype.number(0, 100),
        price = faker.datatype.number(20,300)
      }={})
    {
        return{
            "id" : id,
            "customerId" : customerId,
            "product_name": name, 
            "product_description": description, 
            "product_quantity" : quantity,
            "product_price" : price
        }
    }

    generateNewProductList({
        items = 10,
        id = faker.datatype.uuid(),
        customerId = faker.datatype.uuid(),
    }={})
    {
        var products = [];

        for(var i = 0; i < items; i++){
            products.push(this.generateNewProduct({id: id, customerId: customerId}));
        }

        return products;
    }
}

module.exports = new ProductFixture();