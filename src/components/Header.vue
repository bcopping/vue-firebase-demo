<template>
    <nav class="navbar navbar-default">
        <div class="">
            <ul class="nav navbar-nav">
                <li><router-link to="/" tag="a" active-class="active" exact>Home</router-link></li>
                <li><router-link to="/invoices" tag="a" active-class="active" exact>Invoices</router-link></li>
                <li><router-link to="/expenses" tag="a" active-class="active" exact>Expenses</router-link></li>
                <li><router-link to="/wages" tag="a" active-class="active" exact>Wages</router-link></li>
                <li><router-link to="/dividends" tag="a" active-class="active" exact>Dividends</router-link></li>
                
                
                <li v-if="!loginState"><router-link to="/logon" tag="a" active-class="active" exact>Logon</router-link></li>
            </ul>
        
            <header-actions :loginState="loginState"></header-actions>
        
        </div>
    </nav>
</template>
<script>
    import HeaderActions from './header/HeaderActions.vue';
    export default {
        data(){
            return {

            }
        },
        computed: {
            loginState() {
                return this.$store.getters.login
            }
        },
        components: {
            headerActions: HeaderActions
        }
    }
</script>

<style>
    .nav {
        padding:20px 0;
    }
    .nav ul {
        float: left
    }
    .nav .headerActions {
        float: right
    }
</style>