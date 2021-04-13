<template>
    <section class="signup-section">
        <main class="signup-modal">
            <div class="signup-modal-user-icon">
                <img src="../../../assets/images/user-icon.png" />
            </div>

            <p class="signup-modal-text">Create your account</p>

            <form action="#">
                <ch-input placeholder='Name' v-model="user.name"/>

                <ch-input placeholder='Email' v-model="user.email"/>

                <ch-input placeholder='Password' type='password' v-model="user.password"/>

                <ch-input placeholder='Confirm Password' type='password' v-model="user.confirmPassword"/>

                <div class="signup-modal-footer">
                    <div class="signup-modal-footer-component">
                        <p class="text-modal-footer text-align-left">
                            <router-link to="/">Have an account?</router-link>
                        </p>
                    </div>
                </div>

                <div v-if="layout.isLoading == true" class="loading-content">
                    <div class="loading"></div>
                </div>

                <ch-button v-if="layout.isLoading == false" v-on:click.native="signup()" class="signup-button">SIGN UP</ch-button>
            </form>
        </main>
    </section>
</template>

<style src="./signup.css" />

<script>
import ChInput from '@/components/ch-input/ch-input';
import ChButton from '@/components/ch-button/ch-button';

import _validator from '../../../functions/validators';
import _customerService from '../../../services/customerService';

export default {
    name: 'SignUp',
    components:{
        ChInput,
        ChButton
    },
    metaInfo: {
        title: 'Signup - CHManager',
    },
    data: function () {
        return {
            layout:{
                isLoading: false,
                emailFormErrors: [],
                passwordFormErrors:[]
            },
            user: {
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        }
    },
    methods:{
        enableLoading: function(){
            this.layout.isLoading = true;
        },

        disableLoading: function(){
            this.layout.isLoading = false;
        },

        validateForm: function(){
            const errors = _validator.validateSignupForm(this.user.name, this.user.email, this.user.password, this.user.confirmPassword);

            if(errors.length > 0){
                for(var i = 0; i < errors.length; i++)
                    this.$notification.error(errors[i]);
                return false;
            }

            return true;
        },

        signup: async function(){
            this.enableLoading();

            if(this.validateForm()){
                try{
                    const response = await _customerService.signup(this.user.name, this.user.email, this.user.password);
                    
                    if(response.data.success)
                    {
                        localStorage.setItem("user", JSON.stringify(response.data.data));
                        window.location.href = "/dashboard";
                    }
                }
                catch(e){
                    this.$notification.error(e.response.data.message);
                }
            }

            this.disableLoading();
        }
    }
}
</script>