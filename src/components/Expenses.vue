<template>
    <div>
        <h3>{{expenseType}}</h3>

        <table class="table table-striped">
            <tbody>
            <tr class="actionableRow" v-for="(expense, i) in expenses">
                <td>{{expense.name}}</td>
                <td>{{expense.amount | currency('£')}}</td>
                <td><span @click="deleteExpense(expense,i)" class="rowActions" >delete</span></td>
            </tr>
            </tbody>
        </table>
        
    </div>
</template>

<script>
    import * as firebase from 'firebase';
    import {mapActions} from 'vuex'
    
    const db = firebase.database();
    let users = db.ref('users');
    
    export default {
		data(){
			return {
                
			}
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
        props: ['expenseType','user'],
        computed: {
            expenses(){
                return this.$store.getters.expenses(this.expenseType);
            },
            allExpenses(){
                return this.$store.getters.allexpenses;
            }
        },
        methods:{
             ...mapActions([
                'setExpenses'
            ]),
            deleteExpense(expense,i){
                console.log('is is---------', i);
                this.$firebaseRefs.users.child(this.user.uid).child('expenses').child(this.expenseType).child(i).remove()
                this.getExpenses();
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
