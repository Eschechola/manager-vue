const faker = require('faker');
const ProductNotFoundException = require('../../src/utilities/exceptions/ProductNotFoundException');
const AnotherCustomerProductException = require('../../src/utilities/exceptions/AnotherCustomerProductException');

const _productFixture = require('../fixtures/ProductFixture');

jest.mock('../../src/infraestructure/repositories/ProductRepository');
const _productRepository = require('../../src/infraestructure/repositories/ProductRepository');
const _productService = require('../../src/services/ProductService');

describe("Create Tests", () => {
    it('Sucessful create returns a product', async () => {
        //Arrange
        const createdProduct = _productFixture.generateNewProduct();

        await _productRepository.create
            .mockResolvedValue(createdProduct.id);

        await _productRepository.getById
            .mockResolvedValue([createdProduct]);

        //Act
        const response = await _productService.create(
            createdProduct.customerId,
            createdProduct.name,
            createdProduct.description,
            createdProduct.quantity,
            createdProduct.price);

        //Assert
        expect(response).toEqual(createdProduct); 
    });
});

describe("Get By ID Tests", () => {
    it('Sucessful get returns a product', async () => {
        //Arrange
        const getProduct = _productFixture.generateNewProduct();

        await _productRepository.exists
            .mockResolvedValue(true);

        await _productRepository.verifyCustomerId
            .mockResolvedValue(true);

        await _productRepository.getById
            .mockResolvedValue([getProduct]);

        //Act
        const response = await _productService.getbyId(getProduct.customerId, getProduct.id);

        //Assert
        expect(response).toEqual(getProduct);
    });

    it('When product not exists throws a ProductNotFoundException', async () => {
        //Arrange
        const getProduct = _productFixture.generateNewProduct();

        await _productRepository.exists
            .mockResolvedValue(false);

        //Act
        const response = async () => {
            await _productService.getbyId(getProduct.customerId, getProduct.id);
        };
        
        //Assert
        expect(response).rejects.toEqual(new ProductNotFoundException("The product not found."));
    });

    it('When the product is from another customer throws a AnotherCustomerProductException', async () => {
        //Arrange
        const getProduct = _productFixture.generateNewProduct();

        await _productRepository.exists
            .mockResolvedValue(true);

        await _productRepository.verifyCustomerId
            .mockResolvedValue(false);

        const anotherUid = await faker.datatype.uuid;

        //Act
        const response = async () => {
            await _productService.getbyId(anotherUid, getProduct.id);
        };
        
        //Assert
        expect(response).rejects.toEqual(new AnotherCustomerProductException("The product is another customer!"));
    });
});

describe("Delete Tests", () => {
    it('Sucessful delete', async () => {
        //Arrange
        const createdProduct = _productFixture.generateNewProduct();

        await _productRepository.exists
            .mockResolvedValue(true);

        await _productRepository.verifyCustomerId
            .mockResolvedValue(true);

        await _productRepository.delete
            .mockResolvedValue();

        //Act
        await _productService.delete(createdProduct.customerId, createdProduct.id);

        //Assert
        expect(_productRepository.delete).toHaveBeenCalledWith(createdProduct.id);
    });

    it('When product not exists throws a ProductNotFoundException', async () => {
        //Arrange
        const getProduct = _productFixture.generateNewProduct();

        await _productRepository.exists
            .mockResolvedValue(false);

        //Act
        const response = async () => {
            await _productService.delete(getProduct.customerId, getProduct.id);
        };
        
        //Assert
        expect(response).rejects.toEqual(new ProductNotFoundException("The product not found."));
    });

    it('When the product is from another customer throws a AnotherCustomerProductException', async () => {
        //Arrange
        const getProduct = _productFixture.generateNewProduct();

        await _productRepository.exists
            .mockResolvedValue(true);

        await _productRepository.verifyCustomerId
            .mockResolvedValue(false);

        const anotherUid = await faker.datatype.uuid;

        //Act
        const response = async () => {
            await _productService.delete(anotherUid, getProduct.id);
        };
        
        //Assert
        expect(response).rejects.toEqual(new AnotherCustomerProductException("The product is another customer!"));
    });
});

describe("Update Tests", () => {
    it('Sucessful update returns a updated product', async () => {
        //Arrange
        const createdProduct = _productFixture.generateNewProduct();
        const productUpdated = _productFixture.generateNewProduct({id: createdProduct.id});

        await _productRepository.exists
            .mockResolvedValue(true);

        await _productRepository.verifyCustomerId
            .mockResolvedValue(true);

        await _productRepository.getById
            .mockResolvedValue([productUpdated]);

        //Act
        const response = await _productService.create(
            createdProduct.customerId,
            createdProduct.name,
            createdProduct.description,
            createdProduct.quantity,
            createdProduct.price);

        //Assert
        expect(response).toEqual(productUpdated); 
    });

    it('When product not exists throws a ProductNotFoundException', async () => {
        //Arrange
        const createdProduct = _productFixture.generateNewProduct();

        await _productRepository.exists
            .mockResolvedValue(false);

        //Act
        const response = async () => {
            await _productService.update(
                createdProduct.customerId,
                createdProduct.name,
                createdProduct.description,
                createdProduct.quantity,
                createdProduct.price);
        };
        
        //Assert
        expect(response).rejects.toEqual(new ProductNotFoundException("The product not found."));
    });

    it('When the product is from another customer throws a AnotherCustomerProductException', async () => {
        //Arrange
        const createdProduct = _productFixture.generateNewProduct();

        await _productRepository.exists
            .mockResolvedValue(true);

        await _productRepository.verifyCustomerId
            .mockResolvedValue(false);

        const anotherUid = await faker.datatype.uuid;

        //Act
        const response = async () => {
            await _productService.update(
                anotherUid,
                createdProduct.name,
                createdProduct.description,
                createdProduct.quantity,
                createdProduct.price);
        };
        
        //Assert
        expect(response).rejects.toEqual(new AnotherCustomerProductException("The product is another customer!"));
    });
});

describe("Search By Name Tests", () => {
    it('Sucessful search returns a list of products', async () => {
        //Arrange
        const customerId = faker.database.uuid;
        console.log('caraio' + customerId);
        const randomTerm = faker.lorem.word();

        const productsList = [
            await _productFixture.generateNewProduct(customerId),
            await _productFixture.generateNewProduct(customerId),
            await _productFixture.generateNewProduct(customerId),
            await _productFixture.generateNewProduct(customerId)
        ];

        await _productRepository.searchByName
            .mockResolvedValue([productsList]);

        //Act
        const response = await _productService.searchByName(customerId, randomTerm);

        //Assert
        expect(response).toEqual(productsList); 
    });

    it('Sucessful search returns only customer products', async () => {
        //Arrange
        const customerId = faker.database.uuid;
        console.log('caraio' + customerId);
        const randomTerm = faker.lorem.word();

        const productsList = [
            await _productFixture.generateNewProduct(customerId),
            await _productFixture.generateNewProduct(customerId),
            await _productFixture.generateNewProduct(customerId),
            await _productFixture.generateNewProduct()
        ];

        await _productRepository.searchByName
            .mockResolvedValue([productsList]);

        //Act
        const response = await _productService.searchByName(customerId, randomTerm);

        //Assert
        expect(response.length).toEqual(3); 
    });
});