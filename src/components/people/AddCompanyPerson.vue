<template>
    <div>

        <form class="form-inline"  v-on:submit.prevent>

            <div class="form-group">
                <input
                    placeholder="Name"
                    class="form-control"
                    type="text"
                    v-model="newPersonName"
                    ref="newPersonInput"
                >

            </div>
            <button @click="addCompanyPerson" class="btn btn-default">Add</button>
        </form>
    </div>
</template>

<script>
    import * as firebase from 'firebase/app';

    import {config} from '../firebase/config.js'

    import getPeople from '../mixins'

    import {mapActions} from 'vuex'
    import {addNotifications} from '../../lib/notification'
    const db = firebase.database();

    let users = db.ref('users');

    export default {
        data() {
            return {
                newPersonName: '',
            }
        },

        mixins: [getPeople],
        computed: {
            loginState() {
                return this.$store.getters.login
            },

            people() {
                return this.$store.getters.people
            },
            addPersonVisible(){
                return this.$store.getters.addPersonVisible
            },


        },

        firebase: () => {
            return {
                users: {
                    source: users,
                    // optionally bind as an object
                    asObject: true,
                    // optionally provide the cancelCallback
                    cancelCallback: function () {}
                }
            }
        },

        methods:{
            ...mapActions([
                'setPersonModal'
            ]),
            addCompanyPerson(){

                const db = firebase.database().ref('users/'+ this.user.uid).child('/people/');
                const ref = db.push().key;
                //hide the set new type of expense input field
                let name = this.newPersonName

                var newData = {
                    name: name,
                    id: ref,
                };
                const that = this;
                db.child(ref).set(newData, function(error){
                    if(error){
                        console.log('oops something went wrong');
                    }
                    else {
                        that.getPeople();
                        that.personAdded();
                    }
                })

            },
            personAdded() {
                //this.success = false
                addNotifications({
                    title: 'Success!',
                    string: 'Person added',
                    type: 'is-success'
                    }
                );
                this.setPersonModal(false);
            },

        },
        created() {
            this.getPeople();
        }
    }
</script>

