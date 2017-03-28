<template>
    <div :class="{loggedOn : loginState}">
        <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
            >
            <button class="btn btn-secondary">Sign in with Google</button>
        </g-signin-button>
        <p>{{test}}</p>
    </div>
</template>

<script>
    import * as firebase from 'firebase'
    import logout from './logout'
    import {mapActions} from 'vuex'
    import {config} from '../firebase/config.js'

    const db = firebase.initializeApp(config).database();
    let usersObj = db.ref('users');
    export default {
        
        data() {
            return {
                //google auth client id required for google sign in..
                googleSignInParams: {
                    client_id: '142374137340-i7jsm29fbde3e7csgv9grn97rjvam6i9.apps.googleusercontent.com'
                }   
            }
        },
        props: ['loginState'],
        
        firebase: () => {
            return {
        
                users: {
                    source: usersObj,
                    // optionally bind as an object
                    asObject: true,
                    // optionally provide the cancelCallback
                    cancelCallback: function () {}
                }
            }
        },

        methods: {
            ...mapActions([
                'setLogin',
                'setUser'
            ]),
            onSignInSuccess (googleUser) {
                var that = this;
                console.log('Google Auth Response', googleUser);
                // We need to register an Observer on Firebase Auth to make sure auth is initialized.
                var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
                    unsubscribe();
                    // Check if we are already signed-in Firebase with the correct user.
                    if (!that.isUserEqual(googleUser, firebaseUser)) {
                    // Build Firebase credential with the Google ID token.
                    // [START googlecredential]
                    var credential = firebase.auth.GoogleAuthProvider.credential(
                        googleUser.getAuthResponse().id_token);
                    // [END googlecredential]
                    // Sign in with credential from the Google user.
                    // [START authwithcred]
                    firebase.auth().signInWithCredential(credential).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // [START_EXCLUDE]
                        if (errorCode === 'auth/account-exists-with-different-credential') {
                        alert('You have already signed up with a different auth provider for that email.');
                        // If you are using multiple auth providers on your app you should handle linking
                        // the user's accounts here.
                        } else {
                            console.error(error);
                        }
                        // [END_EXCLUDE]
                    });
                    // [END authwithcred]
                    } else {
                        console.log('User already signed-in Firebase.');
                    }
                });
            },
            onSignInError (error) {
                // `error` contains any error occurred. 
                console.log('OH NOES', error)
            },
            isUserEqual(googleUser, firebaseUser) {
                
                if (firebaseUser) {
                    var providerData = firebaseUser.providerData;
                    for (var i = 0; i < providerData.length; i++) {
                    if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                        providerData[i].uid === googleUser.getBasicProfile().getId()) {
                        // We don't need to reauth the Firebase connection.
                        return true;
                    }
                    }
                }
                return false;
            },

            
            initApp() {
                // Auth state changes.
                // [START authstatelistener]
                var that = this;
                firebase.auth().onAuthStateChanged(function(user){
                    
                    if (user) {
                        
                        var id = user.uid;
            
                        that.$firebaseRefs.users.child(id).update({
                            name: user.displayName,
                            email: user.email
                        });
                        
                        var userDetails = {
                            displayName: user.displayName,
                            email: user.email,
                            uid: user.uid,
                            photoURL: user.photoURL
                        }

                        //set loggedin status to true in store
                        that.setLogin(true);
                        //set user details in store
                        that.setUser(userDetails);

                        //redirect the user to the homepage
                        that.$router.push({name: 'home'});

                    } else {
                        console.log('user isnt signed in');
                        that.setLogin(false);
                    
                    }
                });
                // [END authstatelistener]
            }
            
        },
        created(){
             this.initApp();
        }
    }

</script>

<style>
.loggedOn {
    color:green;
}

</style>