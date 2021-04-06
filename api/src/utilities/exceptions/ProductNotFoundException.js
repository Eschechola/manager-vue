class ProductNotFoundException extends Error{
    constructor (message) {
        super(message);
        
        //capture error sttack trace
        Error.captureStackTrace(this, this.constructor);

        //assign the error class name in your custom error
        this.name = this.constructor.name;
    }
}

module.exports = ProductNotFoundException;