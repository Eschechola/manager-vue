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
        if(!await _productRepository.exists(productId))
            throw new ProductNotFoundException("The product not found.");

        if(!await _productRepository.verifyCustomerId(customerId))
            throw new AnotherCustomerProductException("The product is another customer!");

        const product = await _productRepository.getById(productId); 
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
        if(!await _productRepository.exists(productId))
            throw new ProductNotFoundException("The product not found.");
        
        if(!await _productRepository.verifyCustomerId(customerId))
            throw new AnotherCustomerProductException("The product is another customer!")
        
        await _productRepository.delete(productId);
    }

    async update(customerId, productId, name, description, quantity, price){
        if(!await _productRepository.exists(productId))
            throw new ProductNotFoundException("The product not found.");

        if(!await _productRepository.verifyCustomerId(customerId))
            throw new AnotherCustomerProductException("The product is another customer!")
        
        await _productRepository.update(productId, name, description, quantity, price);
        
        var productUpdated = await _productRepository.getById(productId);

        return productUpdated[0];
    }
}

module.exports = new ProductService();