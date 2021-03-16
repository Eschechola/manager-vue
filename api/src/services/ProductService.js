const _productRepository = require('../infraestructure/repositories/ProductRepository');

class ProductService{
    async create(userId, name, description, quantity, price){
        const productId = await _productRepository.create(userId, name, description, quantity, price);
        const productCreated = await _productRepository.getById(productId);

        return productCreated[0];
    }

    async searchByName(name){
        const products = _productRepository.searchByName(name);
        return products;
    }

    async delete(productId){
        await _productRepository.delete(productId);
    }

    async update(productId, name, description, quantity, price){
        await _productRepository.update(productId, name, description, quantity, price);
        var productUpdated = await _productRepository.getById(productId);

        return productUpdated[0];
    }
}

module.exports = new ProductService();