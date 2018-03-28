<template>
    <div>
        <page-actions :section="csvTitle" v-on:add="showAddExpense"></page-actions>

        <div class="box" v-show="addExpense" :class="{'animated fadeIn': addExpense}">
            <div class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                         <p class="title is-4">Add expense detail</p>
                    </div>
                </div>
                <!-- Right side -->
                <div class="level-right">
                    <div class="level-item">
                        <a @click="showAddExpense"> <span class="icon"><i class="fa fa-close"></i></span></a>
                    </div>
                </div>
            </div>

            <hr>
            <br>
            <form  v-on:submit.prevent>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="expenseDate" class="label">Expense date</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <datepicker :format="format" input-class="input" id="expenseDate" placeholder="Expense date"></datepicker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="" class="label">Type</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <input
                                    placeholder="expense type"
                                    class="input newExpenseInput"
                                    :class="{ visible: addExpenseType}"
                                    type="text"
                                    v-model="newExpenseType"
                                    ref="newExpenseInput"
                                >
                                <div v-if="!addExpenseType" class="select">

                                <select


                                    @change="expenseSelectHandler"
                                    v-model="newExpenseTypeSET"
                                    >
                                    <option disabled value="default">Select type</option>
                                    <option v-for="type in allExpenseTypes" v-bind:value="type">{{type}}</option>
                                    <option value="addNew">Add new type</option>
                                </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="" class="label">Name/description</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <input placeholder="name / description" class="input" v-model="expenseName" type="text">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="" class="label">Amount</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <input class="input" v-model="expenseAmount" type="number" step="0.01" placeholder="0.00">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="" class="label">VAT</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <input type="radio" id="yesVAT" value="yesVAT" v-model="setVAT">
                                <label for="one">Yes</label>
                                <br>
                                <input type="radio" id="noVAT" value="noVAT" v-model="setVAT">
                                <label for="two">No</label>
                                {{expenseAmountVAT | currency('£')}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">

                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <button @click="addExpenseRecord" class="button is-primary">Add</button>
                            </div>
                        </div>
                    </div>
                </div>



            </form>
        </div>
    </div>
</template>

<script>
    import * as firebase from 'firebase/app';

    import {config} from '../firebase/config.js'

    import getExpenses from '../mixins'
    import getTradingYear from '../mixins'
    import filtersOff from '../mixins'

    import {mapActions} from 'vuex'
    import Datepicker from 'vuejs-datepicker'
    import tradingYear from '../tradingYear/selectTradingYear.vue'
    import pageActions from '../tradingYear/PageActions.vue'


    export default {
        data() {
            return {
                expenseName : '',
                expenseAmount: 0.00,
                addExpenseType: false,
                newExpenseType: '',
                newExpenseTypeSET: 'default',
                setVAT: 'noVAT',
                format: 'yyyy-MM-dd',
                csvTitle: "expenses",
                addExpense: false
            }
        },

        mixins: [getExpenses, filtersOff, getTradingYear],
        components: {
            Datepicker,
            tradingYear,
            pageActions

        },
        computed: {
            loginState() {
                return this.$store.getters.login
            },

            expenseTypes() {
                return this.$store.getters.expenses2Types
            },
            allExpenseTypes() {
                return this.$store.getters.allExpenses2Types
            },
            setDefaultExpenseType() {
                return this.newExpenseTypeSET;
            },

            expenseAmountVAT(){
                if (this.setVAT == 'noVAT') {
                    return this.expenseAmount
                }
                else {
                    return this.expenseAmount*(1+(this.$store.getters.VATRate/100)).toFixed(2);
                }

            }


        },



        methods:{
            ...mapActions([
                'setExpenses',
                'setExpenses2',
                'setExpenseTypes',
                'setFilteredExpenses',
                'removeFilterByExpenses'
            ]),
            expenseSelectHandler(e){
                if(e.target.value === 'addNew') {
                    this.addExpenseType = true;
                    this.$refs.newExpenseInput.focus();
                }
            },

            addExpenseRecord(){

                const date = document.getElementById("expenseDate").value
                const db = firebase.database().ref('users/'+ this.user.uid).child('/expenses2/');
                const ref = db.push().key;
                //we set which trading year the invoice goes in
                this.getTradingYear(date)
                //hide the set new type of expense input field
                let type = '';
                if(this.addExpenseType){
                    type = this.newExpenseType
                }
                else {
                    type = this.newExpenseTypeSET
                }

                //get data ready to set in our firebase db ref
                //store the key generated by firebase in this object so we can easily access the key for say delete or update methods
                //see delete in Expenses2.vue
                var timestamp = Date.now();

                var newData = {
                    type: type,
                    name: this.expenseName,
                    amount: this.expenseAmount,
                    amountVAT: this.expenseAmountVAT,
                    id: ref,
                    timestamp: timestamp,
                    date,
                    tradingYear: this.$store.getters.tradingYear
                };

                db.child(ref).set(newData);

                this.getExpenses();
                this.removeFilterByExpenses();
                this.filtersOff();

                //if we're adding a new expense type
                if(this.addExpenseType){
                    //set the dropdown to the one we just added
                    this.newExpenseTypeSET = this.newExpenseType
                    //hide the manual input for new expense
                    this.addExpenseType = false

                }
                else {
                    this.newExpenseType = '';
                }

            },
            showAddExpense(){
                this.addExpense = !this.addExpense
            }

        },
        created() {
            this.getExpenses();
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
