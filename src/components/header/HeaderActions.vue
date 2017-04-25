<template>
    
    <ul class="nav navbar-nav navbar-right">
        <li v-if="loginState" 
            class="dropdown" 
            :class="{open: isDropdownOpen}"
            @click="toggleMenu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <img class="avatar" :src="currentUser.photoURL"/>{{currentUser.displayName}} <span class="caret dropdown-toggle-item"></span>
            </a>
            <ul class="dropdown-menu">
                <li><router-link to="/company" tag="a" exact>Company details</router-link></li>
                <li><a @click="handleSignOut">sign out</a></li>
            </ul>
        </li>
        
    </ul>
    
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
        height:64px;
        width:64px;
        margin-right:10px
    }
</style>