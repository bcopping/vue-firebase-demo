<template>
    <div>
        <div v-if="!loginState" class="navbar-item has-dropdown is-hoverable">
            <router-link to="/logon" tag="a" class="navbar-item" active-class="active" exact>Logon</router-link>
        </div>
        <div v-if="loginState" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link is-active" href="#">
            <img class="avatar" :src="currentUser.photoURL"/>{{currentUser.displayName}} <span class="caret dropdown-toggle-item"></span>
            </a>
            <div class="navbar-dropdown ">
            <router-link class="navbar-item" to="/company" tag="a" exact>Company details</router-link>
            <a class="navbar-item" @click="handleSignOut">sign out</a>
            </div>
        </div>
    </div>
</template>
<script>


    import logout from '../logon/logout'
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
                isDropdownOpen: false
            }
        },
        props: ['loginState'],
        computed: {
            currentUser(){
                return this.$store.getters.user
            }
        },

        methods:{
            ...mapActions([
                'setUser',
                'setExpenses2',

            ]),
            handleSignOut(){

                logout()

                //reset store, incase a diff user logged in on the same browser  / machine


                this.$router.push({name: 'logon'});

            },
            toggleMenu(e){
                e.stopPropagation();
                this.isDropdownOpen = !this.isDropdownOpen
            }
        },
        created(){
            var that = this;
            document.addEventListener("click", function(e){
                e.stopPropagation();
                e.target.classList.contains('dropdown') ?  that.isDropdownOpen = true : that.isDropdownOpen = false
            });
        }
    }
</script>
<style>
    .avatar {
        border-radius:50%;
        margin:0 10px 0 0;
        float:left;
    }
</style>
