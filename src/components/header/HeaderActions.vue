<template>
    <ul class="nav navbar-nav navbar-right">
        <li v-if="loginState" 
            class="dropdown" 
            :class="{open: isDropdownOpen}"
            @click="toggleMenu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <img class="avatar" :src="currentUser.photoURL"/>{{currentUser.displayName}} <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
                <li><a @click="handleSignOut">sign out</a></li>
            </ul>
        </li>
        <logon-button v-if="!loginState"></logon-button>
        
    </ul>
</template>
<script>
    
    import logon from '../logon/LoginButton.vue'
    import logout from '../logon/logout'
    //import {mapActions} from 'vuex'
    
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
        components: {
            logonButton: logon
        },
        methods:{
            handleSignOut(){
                logout()
            },
            toggleMenu(){
                console.log('toggle');
                this.isDropdownOpen = !this.isDropdownOpen
            }   
        },
        created(){
            const link = document.querySelector('.myclass');
            const test = document.getElementById("myclass");
            
            //link.addEventListener("click", toggleMenu, false);
            
            if (test) {
                test.addEventListener("click", this.toggleMenu, false);
  
            };
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