const ProductNotFoundException = require('../utilities/exceptions/ProductNotFoundException');
const AnotherCustomerProductException = require('../utilities/exceptions/AnotherCustomerProductException');

const _productRepository = require('../infraestructure/repositories/ProductRepository');

class ProductService{
    async create(customerId, name, description, quantity, price){
        const productId = await _productRepository.create(customerId, name, description, quantity, price);
        const productCreated = await _productRepository.getById(productId);

        return productCreated[0];
    }

    async getbyId(customerId, productId){
        const product = await _productRepository.getById(productId); 
        
        if(!this.exists(product))
            throw new ProductNotFoundException("The product not found.");

        if(!this.verifyCustomerId(customerId, product))
            throw new AnotherCustomerProductException("The product is another customer!");

        return product[0];
    }

    async searchByName(customerId, name){
        const products = await _productRepository.searchByName(name);
        
        const productsByCustomer = products[0].filter((obj) => {
            if(obj.customerId == customerId)
                return true;
        });
        
        return productsByCustomer;
    }

    async delete(customerId, productId){
        await this.getbyId(customerId, productId);
        await _productRepository.delete(productId);
    }

    async update(customerId, productId, name, description, quantity, price){
        await this.getbyId(customerId, productId);
        
        await _productRepository.update(productId, name, description, quantity, price);
        
        var productUpdated = await _productRepository.getById(productId);

        return productUpdated[0];
    }

    exists(product){
        return product.length != 0;
    }

    verifyCustomerId(customerId, product){
        return product[0].customerId == customerId;
    }
}

module.exports = new ProductService();