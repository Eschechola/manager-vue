<template>
    <section class="login-section">
        <main class="login-modal">
            <div class="login-modal-user-icon">
                <img src="../../../assets/images/user-icon.png" />
            </div>

            <p class="login-modal-text">Have an account?</p>

            <form action="#">
                <ch-input v-model="user.email" placeholder='Email'/>
                
                <ch-input v-model="user.password" placeholder='Password' type='password'/>

                <div class="login-modal-footer">
                    <div class="login-modal-footer-component">
                        <p class="text-modal-footer text-align-left">
                            <router-link to="/sign-up">Sign up</router-link>
                        </p>
                    </div>
                    <div class="login-modal-footer-component">
                        <p class="text-modal-footer text-align-right">
                            <router-link to="/forgot-password">Forgot password</router-link>
                        </p>
                    </div>
                </div>
                
                <div v-if="layout.isLoading == true" class="loading-content">
                    <div class="loading"></div>
                </div>

                <ch-button v-if="layout.isLoading == false" v-on:click.native="login()" class="login-button">SIGN IN</ch-button>
            </form>
        </main>
    </section>
</template>

<style src="./login.css" />

<script>
import ChInput from '@/components/ch-input/ch-input';
import ChButton from '@/components/ch-button/ch-button';

import _customerService from '../../../services/customerService';
import _validator from '../../../functions/validators';

export default {
    name: 'Login',
    components:{
        ChInput,
        ChButton
    },
    metaInfo: {
        title: 'Login - CHManager',
    },
    data: function () {
        return {
            layout:{
                isLoading: false,
                emailFormErrors: [],
                passwordFormErrors:[]
            },
            user: {
                email: "",
                password: ""
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

        clearFields: function(){
            this.user.email = "";
            this.user.password = "";
        },

        validateForm: function(){
            const errors = _validator.validateLoginForm(this.user.email, this.user.password);

            if(errors.length > 0){
                for(var i = 0; i < errors.length; i++)
                    this.$notification.error(errors[i]);
                return false;
            }

            return true;
        },

        login : async function(){
            this.enableLoading();

            if(this.validateForm()){
                try{
                    const response = await _customerService.login(this.user.email, this.user.password);
                    
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
        },
    }
}
</script>