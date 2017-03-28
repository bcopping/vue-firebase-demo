<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th><a @click="orderBy($event, type =!type)">type</a></th>
                    <th><a @click="orderBy($event, name = !name)">name</a></th>
                    <th><a @click="orderBy($event, amount = !amount)">amount</a></th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
            <tr class="actionableRow" v-for="expense in expenses">
                <td>{{expense.type}}</td>
                <td>{{expense.name}}</td>
                <td>{{expense.amount | currency('£')}}</td>
                <td><span @click="deleteExpense(expense)" class="rowActions" >delete</span></td>
            </tr>
            </tbody>
        </table>
        {{expenseAmountsAry | currency('£')}}

        {{expenseTypes}}
    </div>
</template>

<script>
    import * as firebase from 'firebase';
    import {mapActions} from 'vuex'
    import testing from './mixins'
    import getExpenses2 from './mixins'
    import {addDecimals} from '../lib/decimal-operations'
    import _ from 'lodash'

    const db = firebase.database();
    let users = db.ref('users');
    
    export default {
		data(){
			return {
                type: false,
                name: false,
                amount: false
            }
		},
        mixins: [testing,getExpenses2],
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
        props: ['user'],
        computed: {
            expenses(){
                return this.$store.getters.expenses2
            },
            expenseAmountsAry(){
                var sum = this.$store.getters.expenseAmountsAry;
                return addDecimals(sum).toFixed(2);
            },
            expenseTypes(){
                return this.$store.getters.expenses2Types
            }

            
        },
        methods:{
             ...mapActions([    
                'expensesOrdering',
                'setExpenses2'
            ]),
            orderBy(event, a){
                console.log(a);
                
                let order = '';
                a === true ? order = 'asc' : order = 'desc'
                
                console.log(order);

                var payload = {
                    asDs: order,
                    orderBy: event.target.innerHTML
                }
                
                this.expensesOrdering(payload)
            },
            deleteExpense(expense){
                
                this.$firebaseRefs.users.child(this.user.uid).child('/expenses2/').child(expense.id).remove()
                this.getExpenses2();
                this.testing();
            },
        }
	}
</script>
<style>
    .actionableRow .rowActions {
        opacity:0
    }
    .actionableRow:hover .rowActions {
        opacity:1;
        float:right;
        cursor:pointer;
    }
</style>
