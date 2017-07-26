<template>
    <div class="container">
        <nav class="navbar">
            <div class="navbar-brand">
                <a class="navbar-item" href="">
                    bjc
                </a>
                <div class="navbar-burger" @click="toggleMenu" :class="{'is-active': isDropdownOpen}">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div v-if="loginState" id="navMenuExample" class="navbar-menu"  :class="{'is-active': isDropdownOpen}">
                <div class="navbar-start">
                    <router-link to="/" tag="a" class="navbar-item" active-class="active" exact>Home</router-link>
                    <router-link to="/invoices" tag="a" class="navbar-item" active-class="active" exact>Invoices</router-link>
                    <router-link to="/expenses" tag="a" class="navbar-item" active-class="active" exact>Expenses</router-link>
                    <router-link to="/wages" tag="a" class="navbar-item" active-class="active" exact>Wages</router-link>
                    <router-link to="/dividends" tag="a" class="navbar-item" active-class="active" exact>Dividends</router-link>

                </div>
                <div class="navbar-end">
                    <header-actions :loginState="loginState"></header-actions>
                </div>
            </div>

        </nav>
    </div>
</template>
<script>
    import HeaderActions from './header/HeaderActions.vue';
    export default {
        data(){
            return {
                isDropdownOpen: false
            }
        },
        computed: {
            loginState() {
                return this.$store.getters.login
            }
        },
        methods: {
            toggleMenu(e){
                e.stopPropagation();
                this.isDropdownOpen = !this.isDropdownOpen
            }
        },
        components: {
            headerActions: HeaderActions
        }
    }
</script>
