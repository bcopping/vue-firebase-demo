<template>
    <div>
        <p>Please login first</p>
        <login-button></login-button>

    </div>

</template>

<script>
    
    import logon from './LoginButton.vue'

    export default {
        data() {
            return {
            }
        },
        components: {
            loginButton: logon
        }
    }
</script>