import Vue from 'vue';
import VueMeta from 'vue-meta'
import Router from 'vue-router';

import Login from '../pages/auth/login/login';
import Signup from '../pages/auth/signup/signup';

import MyProfile from '../pages/profile/my-profile';

import Dashboard from '../pages/dashboard/dashboard';

import Product from '../pages/product/product/product';
import CreateProduct from '../pages/product/create-product/create-product';
import UpdateProduct from '../pages/product/update-product/update-product';
import SearchProducts from '../pages/product/search-products/search-products';

import ForgotPassword from '../pages/auth/forgot-password/forgot-password';

Vue.use(Router);
Vue.use(VueMeta)

const routes = [
    //Auth
    { 
        path: '/', 
        name: "Login", 
        component: Login
    },

    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    
    { 
        path: '/sign-up',
        name: "Signup",
        component: Signup
    },
    
    // Home
    { 
        path: '/my-profile',
        name: "MyProfile",
        component: MyProfile
    },

    { 
        path: '/dashboard',
        name: "Dashboard",
        component: Dashboard
    },
    
    // Products
    { 
        path: '/product/:id',
        name: "Product", 
        component: Product,
        props: true
    },

    { 
        path: '/create-product',
        name: "CreateProduct",
        component: CreateProduct
    },
    
    { 
        path: '/update-product/:id',
        name: "UpdateProduct",
        component: UpdateProduct,
        props: true
    },
    
    { 
        path: '/search-products',
        name: "SearchProducts",
        component: SearchProducts
    },
];

export default new Router({
    routes,
  });