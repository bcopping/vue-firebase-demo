<template>
    <div :class="{loggedOn : loginState}">
        <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
            >
            <button class="button is-white">
                <span class="icon">
                    <i class="fa fa-google"></i>
                </span>
                <span>Sign in with Google</span>
            </button>
        </g-signin-button>

    </div>
</template>

<script>
    import * as firebase from 'firebase/app'
    import 'firebase/auth';
    import 'firebase/database';
    import logout from './logout'
    import {mapActions} from 'vuex'
    import {config} from '../firebase/config.js'
    import getExpenses from '../mixins'
    import getWages from '../mixins'
    import getInvoices from '../mixins'
    import getDividends from '../mixins'
    import getPeople from '../mixins'
    import getTradingYear from '../mixins'

    import {getDate} from '../../lib/get-date'
    import addCompanyDetails from '../company/AddCompanyDetails.vue'

    const db = firebase.initializeApp(config).database();

    let usersObj = db.ref('users');

    export default {

        data() {
            return {
                //google auth client id required for google sign in..
                googleSignInParams: {
                    client_id: '142374137340-i7jsm29fbde3e7csgv9grn97rjvam6i9.apps.googleusercontent.com'
                },

            }
        },
        props: ['loginState'],
        mixins: [getWages,getPeople, getDividends, getTradingYear, getExpenses, getInvoices],
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
        components: {
            appAddCompanyDetails: addCompanyDetails
        },
        methods: {
            ...mapActions([
                'setLogin',
                'setUser',
                'setExpenses2',
                'setTrading',
                'setCompanyDetails',
                'setTradingYearArray',

            ]),

            onSignInSuccess (googleUser) {
                var that = this;

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
                const that = this;
                firebase.auth().onAuthStateChanged(function(user){

                    if (user) {
                        const id = user.uid;

                        firebase.database().ref('users/'+ id).update({
                            name: user.displayName,
                            email: user.email
                        });

                        const userDetails = {
                            displayName: user.displayName,
                            email: user.email,
                            uid: user.uid,
                            photoURL: user.photoURL
                        }

                        //set loggedin status to true in store
                        that.setLogin(true);
                        //set user details in store
                        that.setUser(userDetails);

                        //fetch the company details
                        const ref = firebase.database().ref('users/'+ id).child('/company/')

                        ref.once('value')
                        .then(function(snapshot) {
                            //set the company details
                            that.setCompanyDetails(snapshot.val());

                        })
                        .then(function(){
                            //
                            console.log('company details', that.$store.getters.companyDetails.company)
                            var todaysDate = getDate();
                            var setTotalYears = true;
                            todaysDate = todaysDate.split("-").reverse().join("-");

                            that.getTradingYear(todaysDate, setTotalYears);
                        })
                        .then(function(){
                            that.setTradingYearArray();


                        })
                        .then(function(){
                            that.getInvoices();
                            that.getWages();
                            that.getDividends();
                            that.getExpenses();
                            that.getPeople();
                        })
                        .then(function(){

                            if (that.$store.getters.companyDetails.company) {
                                //alert('here')
                                console.log(that.$store.getters.companyDetails);
                                //redirect the user to the homepage
                                that.$router.push({name: 'home'});
                            }

                            else {
                                console.log('no company details so take them to the company edit page...');
                                //only if we have company details should we set these in the state
                                //otherwise we need to get user to input them...

                                that.$router.push({name: 'company'});
                            }

                            //check for inactivity for auto logout
                            that.setActivityTimer();
                        });

                    } else {
                        //logged out user update the store, empty all the expenses and user data, redirect to logon page...
                        that.setLogin(false);
                        that.setUser({});
                        that.setExpenses2([]);
                        that.$router.push({name: 'logon'});
                    }
                });
                // [END authstatelistener]
            },
            setActivityTimer(){
                // DOM Events
                const body = document.querySelector('body');

                let t;
                let i;
                function timedLogout() {
                    clearTimer();

                    body.removeEventListener('mouseover', resetTimer,false);
                    body.removeEventListener('onscroll', resetTimer,false);
                    body.removeEventListener('ontouchstart', resetTimer,false);

                    firebase.auth().signOut().then(function() {
                        console.error('Signed Out');
                    }, function(error) {
                        console.error('Sign Out Error', error);
                    });
                }

                function resetTimer() {
                    clearTimeout(t);
                    t = setTimeout(timedLogout, 180000);
                }

                function clearTimer() {
                    clearTimeout(t);
                }

                body.addEventListener('mouseover', resetTimer,false);
                body.addEventListener('onscroll', resetTimer,false);
                body.addEventListener('ontouchstart', resetTimer,false);
            }

        },
        created(){
            this.initApp();
        }
    }

</script>
