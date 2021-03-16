const ProductNotFoundException = require('../utilities/exceptions/ProductNotFoundException');
const AnotherCustomerProductException = require('../utilities/exceptions/AnotherCustomerProductException');

const _productService = require('../services/ProductService');
const _tokenMiddleware = require('../middlewares/token/TokenMiddleware');

class ProductController{
    async create(request, response){
        try{
            const customerId = _tokenMiddleware.getCustomerAuthenticatedData(request).id;
            const { name, description, quantity, price } = request.body;

            var product = await _productService.create(customerId, name, description, quantity, price);

            response.json({
                message: "Produto criado com sucesso!",
                success: true,
                data: product
            });
        }
        catch(e){
            response.status(500).send({
                message: "An internal server error has been thrown, please try again",
                success: false,
                data: null
            });
        }
    }

    async getById(request, response){
        try{
            const productId = request.params.id;
            const customerId = _tokenMiddleware.getCustomerAuthenticatedData(request).id;

            var product = await _productService.getbyId(customerId, productId);

            response.json({
                message: "Produto encontrado com sucesso!",
                success: true,
                data: product
            });
        }
        catch(e){
            if (e instanceof ProductNotFoundException)
                response.status(200).send({
                    message: e.message,
                    success: true,
                    data: {}
                });
            else if(e instanceof AnotherCustomerProductException)
                response.status(401).send({
                    message: e.message,
                    success: false,
                    data: null
                });
            else
                response.status(500).send({
                    message: "An internal server error has been thrown, please try again",
                    success: false,
                    data: null
                });
        }
    }

    async searchByName(request, response){
        try{
            const nameSearch = request.query.name;
            const customerId = _tokenMiddleware.getCustomerAuthenticatedData(request).id;

            const products = await _productService.searchByName(customerId, nameSearch);

            response.json({
                message: "Produto encontrado com sucesso!",
                success: true,
                data: products
            });
        }
        catch(e){
            console.log(e);
            response.status(500).send({
                message: "An internal server error has been thrown, please try again",
                success: false,
                data: null
            });
        }
    }

    async delete(request, response){
        try{
            const productId = request.params.id;
            const customerId = _tokenMiddleware.getCustomerAuthenticatedData(request).id;

            await _productService.delete(customerId, productId);

            response.json({
                message: "Produto deletado com sucesso!",
                success: true,
                data: {}
            });
        }
        catch(e){
            if (e instanceof ProductNotFoundException)
                response.status(200).send({
                    message: e.message,
                    success: true,
                    data: {}
                });
            else if(e instanceof AnotherCustomerProductException)
                response.status(401).send({
                    message: e.message,
                    success: false,
                    data: null
                });
            else
                response.status(500).send({
                    message: "An internal server error has been thrown, please try again",
                    success: false,
                    data: null
                });
        }
    }

    async update(request, response){
        try{
            const customerId = _tokenMiddleware.getCustomerAuthenticatedData(request).id;
            const { id, name, description, quantity, price } = request.body;

            const product = await _productService.update(customerId, id, name, description, quantity, price);

            response.json({
                message: "Produto atualizado com sucesso!",
                success: true,
                data: product
            });
        }
        catch(e){
            console.log(e);
            if (e instanceof ProductNotFoundException)
                response.status(200).send({
                    message: e.message,
                    success: true,
                    data: {}
                });
            else if(e instanceof AnotherCustomerProductException)
                response.status(401).send({
                    message: e.message,
                    success: false,
                    data: null
                });
            else
                response.status(500).send({
                    message: "An internal server error has been thrown, please try again",
                    success: false,
                    data: null
                });
        }
    }
}

module.exports = new ProductController();