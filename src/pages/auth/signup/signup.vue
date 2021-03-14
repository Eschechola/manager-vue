<template>
    <section class="signup-section">
        <main class="signup-modal">
            <div class="signup-modal-user-icon">
                <img src="../../../assets/images/user-icon.png" />
            </div>

            <p class="signup-modal-text">Create your account</p>

            <ch-input placeholder='Name'/>

            <br>

            <ch-input placeholder='Email'/>

            <br>

            <ch-input placeholder='Password' type='password'/>

            <br>

            <ch-input placeholder='Confirm Password' type='password'/>

            <div class="signup-modal-footer">
                <div class="signup-modal-footer-component">
                    <p class="text-modal-footer text-align-left">
                        <router-link to="/">Have an account?</router-link>
                    </p>
                </div>
            </div>

            <ch-button class="signup-button">SIGN IN</ch-button>
        </main>
    </section>
</template>

<style src="./signup.css" />

<script>
import ChInput from '@/components/ch-input/ch-input';
import ChButton from '@/components/ch-button/ch-button';

export default {
    name: 'SignUp',
    components:{
        ChInput,
        ChButton
    },
    metaInfo: {
        title: 'Signup - CHManager',
    },
}
</script>