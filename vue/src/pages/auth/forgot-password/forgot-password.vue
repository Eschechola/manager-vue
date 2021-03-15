<template>
  <section class="forgot-password-section">
        <main class="forgot-password-modal">
            <div class="forgot-password-modal-user-icon">
                <img src="../../../assets/images/user-icon.png" />
            </div>

            <p class="forgot-password-modal-text">Forgot your password?</p>

            <ch-input placeholder='Email'/>

            <div class="forgot-password-modal-footer">
                <div class="forgot-password-modal-footer-component">
                    <p class="text-modal-footer text-align-left">
                        <router-link to="/sign-up">Doesn't have a account?</router-link>
                    </p>
                </div>
            </div>

            <ch-button class="forgot-password-button">RECOVERY PASSWORD</ch-button>
        </main>
    </section>
</template>


<style src="./forgot-password.css" />

<script>
import ChInput from '@/components/ch-input/ch-input';
import ChButton from '@/components/ch-button/ch-button';


    export default{
        name: 'ForgotPassword',
        components:{
            ChInput,
            ChButton
        },
        metaInfo: {
            title: 'Forgot Password - CHManager',
        },
    }
</script>