const faker = require('faker');

class ProductFixture{
    generateNewProduct(customerId)
    {
        console.log('test + ' + customerId);
        return{
            "id" : faker.datatype.uuid(),
            "customerId" : customerId != undefined ? customerId : faker.datatype.uuid(),
            "product_name": faker.lorem.word(2),
            "product_description": faker.lorem.text(5),
            "product_quantity" : faker.datatype.number(0, 100),
            "product_price" : faker.datatype.number(20,300)
        }
    }
}

module.exports = new ProductFixture();