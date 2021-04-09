const faker = require('faker');
const _customerFixture = require('../fixtures/CustomerFixture');
const CustomerAlreadyExistsException = require('../../src/utilities/exceptions/CustomerAlreadyExistsException');

jest.mock('../../src/infraestructure/repositories/CustomerRepository');
const _customerRepository = require('../../src/infraestructure/repositories/CustomerRepository');
const _customerService = require('../../src/services/CustomerService');

describe("Login Tests", () => {
    it('Sucessful login returns customer', async () => {
        //Arrange
        const email = faker.internet.email();
        const password = faker.internet.password();
    
        const customerByEmail = _customerFixture.generateNewCustomer({email: email, password: password}); 
    
        await _customerRepository.getByEmail
            .mockResolvedValue([customerByEmail]);

        //Act
        const response = await _customerService.login(email, password);

        //Assert
        expect(response).toEqual(customerByEmail); 
    });

    it('Wrong email returns empty', async () => {
        //Arrange
        const email = faker.internet.email();
        const password = faker.internet.password();
    
        await _customerRepository.getByEmail
            .mockResolvedValue([]);

        //Act
        const response = await _customerService.login(email, password);

        //Assert
        expect(response).toEqual(undefined); 
    });

    it('Wrong password returns empty', async () => {
        //Arrange
        const email = faker.internet.email();
        const password = faker.internet.password();

        const customerByEmail = _customerFixture.generateNewCustomer({email: email});
        customerByEmail.password = "another_password"
    
        await _customerRepository.getByEmail
            .mockResolvedValue([customerByEmail])

        //Act
        const response = await _customerService.login(email, password);

        //Assert
        expect(response).toEqual(undefined); 
    });
});


describe("Create Tests", () => {
    it("Sucessful create returns a customer", async () => {
        //Arrange
        const createdCustomer = _customerFixture.generateNewCustomer();

        await _customerRepository.getByEmail
            .mockResolvedValue([]);

        await _customerRepository.create
            .mockResolvedValue(createdCustomer.id);

        await _customerRepository.getById
            .mockResolvedValue([createdCustomer]);

        //Act
        const response = await _customerService.create(createdCustomer.name, createdCustomer.email, createdCustomer.password);

        //Assert
        expect(response).toEqual(createdCustomer); 
    });

    it("When customer exists throws a CustomerAlreadyExistsException", async () => {
        //Arrange
        const existsCustomer = _customerFixture.generateNewCustomer();

        await _customerRepository.getByEmail
            .mockResolvedValue([existsCustomer]);
        
        //Act 
        const response = async () => {
            await _customerService.create(existsCustomer.name, existsCustomer.email, existsCustomer.password);
        };
        
        //Assert
        expect(response).rejects.toEqual(new CustomerAlreadyExistsException('Already exists a customer with this email!!'));
    });
});