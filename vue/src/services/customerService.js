import _axios from 'axios';
import _apiRoutes from '../config/apiRoutes';

class CustomerService{
    async login(email, password){

        const url = _apiRoutes.CUSTOMER_URL.LOGIN;

        const response = await _axios.post(url, {
            "email": email,
            "password": password
        });

        return response;
    }
}

export default new CustomerService();