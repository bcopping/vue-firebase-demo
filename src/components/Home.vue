<template>
    <div class="row">
        
        <div v-if="loginState" class="col-xs-12">
            <h1>Expenses</h1>
            <hr>
            <form class="form-inline"  v-on:submit.prevent>
                <div class="form-group">
                    <label>Type</label>
            
                    <input class="form-control newExpenseInput" :class="{ visible: addExpenseType}" type="text" v-model="newExpenseType" ref="newExpenseInput">
                    
                    <select class="form-control" v-show="!addExpenseType" @change="expenseSelectHandler" >
                        <option disabled selected>Select type of expense</option>
                        <option v-for="expense in expenseTypes">{{expense}}</option>
                        <option value="addNew">Add a new type of expense</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input class="form-control " v-model="expenseName" type="text" />
                </div>
                <div class="form-group">
                    <label>Amount</label>
                    <input class="form-control" v-model="expenseAmount" type="number" />
                </div>
                <button @click="addExpense" class="btn btn-default">Add expense</button>
                <button @click="addExpense2" class="btn btn-default">Add expense 2</button>
            </form>
            <hr>
            
                
            
            
            
        </div>
        <div class="col-xs-12">
            <div v-for="(expenseType, i) in expenseTypes">
                <!-- pass the expenseType in as a prop we can use to section out the expenses-->
                <app-expenses :expenseType="expenseType" :user="user"></app-expenses>
            </div>
            total expenses {{expensesSum | currency('£')}}
        </div>
        <br>
        <hr>
        <app-expenses2 :user="user"></app-expenses2>        
        
    </div>
</template>

<script>
    import * as firebase from 'firebase';
   
    import {config} from './firebase/config.js'
    
    import logon from './logon/LoginButton.vue'
    import expenses from './Expenses.vue'
    import expenses2 from './Expenses2.vue'

    import getExpenses2 from './mixins'

    import {addDecimals} from '../lib/decimal-operations'
    
    import {mapActions} from 'vuex'

    const db = firebase.database();

    let users = db.ref('users');
    
    export default {
        data() {
            return {
                expenseName : '',
                expenseAmount: 0,
                addExpenseType: false,
                newExpenseType: ''
            }
        },
        mixins: [getExpenses2],
        computed: {
            loginState() {
                return this.$store.getters.login
            },
            user() {
                return this.$store.getters.user
            },
            expensesSum(){
                const sum = [];
                const expenses = this.userexpenses
                for (let i = expenses.length; !!i--;){
                    sum.push(expenses[i].amount);
                }
                
                return addDecimals(sum).toFixed(2);
            },
            expenseTypes() {
                return this.$store.getters.expenseTypes
            }
               
        },
        
        components: {
            logonButton : logon,
            appExpenses: expenses,
            appExpenses2: expenses2
        },
        
        firebase: () => {
            return {
                users: {
                    source: users,
                    // optionally bind as an object
                    asObject: true,
                    // optionally provide the cancelCallback
                    cancelCallback: function () {}
                },
                userexpenses: {
                    source: users.child(firebase.auth().currentUser.uid).child('expenses')
                } 
            }
        },
              
        methods:{
            ...mapActions([
                'setExpenses',
                'setExpenses2',
                
            ]),
            expenseSelectHandler(e){
                if(e.target.value === 'addNew') {
                    this.addExpenseType = true;
                    this.$refs.newExpenseInput.focus();
                }
                else {                    
                    this.addExpenseType = false;
                    this.newExpenseType = e.target.value
                }
            },
            
            
            addExpense(){
                
                const ref = firebase.database().ref('users/'+ this.user.uid).child('/expenses/')
                
                ref.child(this.newExpenseType).push({
                    name: this.expenseName,
                    amount: this.expenseAmount
                });
                
                this.addExpenseType = false;
                this.getExpenses();
                
            },
            addExpense2(){
                
                const ref = firebase.database().ref('users/'+ this.user.uid).child('/expenses2/').push().key;
                //var key = ref.key
                console.log(ref);
                
                var newData = {
                    type:this.newExpenseType,
                    name: this.expenseName,
                    amount: this.expenseAmount,
                    id: ref
                };
                //ref.push(newData)


                firebase.database().ref('users/'+ this.user.uid).child('/expenses2/').child(ref).set(newData);
                
                
                this.addExpenseType = false;
                //this.getExpenses2();
                this.getExpenses2();
            },
            getExpenses() {
                const that = this;
                const ref = firebase.database().ref('users/'+ this.user.uid).child('/expenses/')
                
                ref.once("value")
                .then(function(snapshot) {
                    var payload = snapshot.val();
                    //set the store with expenses
                    that.setExpenses(payload);
                });

            },
           
        },
        created() {
            this.getExpenses()
            
            this.getExpenses2();
        }
    }
</script>
<style>

    .newExpenseInput {
        opacity:0;
        position: absolute;
        left:-9999px;
    }
    .newExpenseInput.visible {
        position: relative;
        left: 0;
        opacity:1;
    }
</style>
