<template>
    <section class="login-section">
        <main class="login-modal">
            <div class="login-modal-user-icon">
                <img src="../../../assets/images/user-icon.png" />
            </div>

            <p class="login-modal-text">Have an account?</p>

            <ch-input v-model="user.email" placeholder='Email'/>

            <br>

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

            <ch-button v-on:click.native="say('tudo bem pode ir')" class="login-button">SIGN IN</ch-button>
        </main>
    </section>
</template>

<style src="./login.css" />

<script>
import ChInput from '@/components/ch-input/ch-input';
import ChButton from '@/components/ch-button/ch-button';

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
            user: {
                email: "",
                password: ""
            }
        }
    },
    methods:{
        say: function(){
            alert("Oh mani padme hum");
        }
    }
}
</script>