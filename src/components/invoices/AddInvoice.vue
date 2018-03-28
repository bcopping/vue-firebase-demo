<template>
    <div>
        <page-actions :section="sectionTitle" v-on:add="showAddInvoice"></page-actions>

        <div class="box" v-show="addInvoice" :class="{'animated fadeIn': addInvoice}">
            <div class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                         <p class="title is-4">Add invoice detail</p>
                    </div>
                </div>
                <!-- Right side -->
                <div class="level-right">
                    <div class="level-item">
                        <a @click="showAddInvoice"> <span class="icon"><i class="fa fa-close"></i></span></a>
                    </div>
                </div>
            </div>

            <hr>
            <br>
            <form class="form-inline"  v-on:submit.prevent>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="invoiceDate" class="label">Invoice date</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <datepicker :format="format" input-class="input" id="invoiceDate" placeholder="Invoice date"></datepicker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="" class="label">Company</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <input
                                    placeholder="Company Name"
                                    class="input newCompanyNameInput"
                                    :class="{ visible: addCompanyName}"
                                    type="text"
                                    v-model="newCompanyName"
                                    ref="newCompanyNameInput"
                                >
                                <div class="select" v-if="!addCompanyName">
                                    <select
                                        @change="companyNameSelectHandler"
                                        v-model="newCompanyNameSet"
                                        >
                                        <option disabled value="default">Select company</option>
                                        <option v-for="company in companies" v-bind:value="company">{{company}}</option>
                                        <option value="addNew">Add new company</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="" class="label">Description</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <input class="input" v-model="invoiceDescription" type="text" placeholder="Description">
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
                                <input class="input" v-model="invoiceAmount" type="number" step="0.01" placeholder="0.00"><br >
                                INC VAT £{{invoiceAmountVAT}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label">
                        <!-- Left empty for spacing -->
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <button @click="addInvoiceRecord" class="button is-primary">Add</button>
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

    import getInvoices from '../mixins'
    import getTradingYear from '../mixins'
    import filtersOff from '../mixins'
    import pageActions from '../tradingYear/PageActions.vue'
    import Datepicker from 'vuejs-datepicker'
    import tradingYear from '../tradingYear/selectTradingYear.vue'
    import {mapActions} from 'vuex'

    import {addDecimals} from '../../lib/decimal-operations'

    export default {
        data() {
            return {
                invoiceDescription: '',
                invoiceAmount: 0.00,
                addCompanyName: false,
                newCompanyName: '',
                newCompanyNameSet: 'default',
                invDate: '',
                format: 'yyyy-MM-dd',
                sectionTitle: "invoices",
                addInvoice: false
            }
        },
        components: {
            Datepicker,
            tradingYear,
            pageActions
        },
        mixins: [getInvoices, filtersOff],
        computed: {
            loginState() {
                return this.$store.getters.login
            },
            invNum(){
                return this.$store.getters.invoicesLength +1
            },
            invoicesCompanies() {
                return this.$store.getters.invoicesCompanies
            },
            invoiceAmountVAT(){
                let n = this.invoiceAmount*(1+(this.$store.getters.VATRate/100));
                return Number(n).toFixed(2);
            },
            companies() {
                return this.$store.getters.companies
            },
        },


        methods:{
            ...mapActions([
                'removeFilterInvoices'
            ]),
            companyNameSelectHandler(e){
                if(e.target.value === 'addNew') {
                    this.addCompanyName = true;
                    this.$refs.newCompanyNameInput.focus();
                }
            },

            addInvoiceRecord(){
                //we set which trading year the invoice goes in
                const date = document.getElementById("invoiceDate").value
                this.getTradingYear(date)

                const db = firebase.database().ref('users/'+ this.user.uid).child('/invoices/');
                const id = db.push().key;
                //hide the set new type of expense input field
                let company = '';
                if(this.addCompanyName){
                    company = this.newCompanyName
                }
                else {
                    company = this.newCompanyNameSet
                }

                //get data ready to set in our firebase db ref
                //store the key generated by firebase in this object so we can easily access the key for say delete or update methods
                //see delete in Expenses2.vue
                var timestamp = Date.now();

                var newData = {
                    id,
                    timestamp,
                    date,
                    invNum: this.invNum,
                    company,
                    invoiceDescription: this.invoiceDescription,
                    amount: this.invoiceAmount,
                    amountVAT: this.invoiceAmountVAT,
                    tradingYear: this.$store.getters.tradingYear
                };

                db.child(id).set(newData);

                this.getInvoices();
                this.removeFilterInvoices();
                this.filtersOff();

                //if we're adding a new inv company
                if(this.addCompanyName){
                    //set the dropdown to the one we just added
                    this.newCompanyNameSet = this.newCompanyName
                    //hide the manual input for company
                    this.addCompanyName = false

                }
                else {
                    this.newCompanyName = '';
                }

            },
            showAddInvoice(){
                this.addInvoice = !this.addInvoice
            }

        },
        created() {
            this.getInvoices();
        }
    }
</script>
<style>
    .newCompanyNameInput {
        opacity:0;
        position: absolute;
        left:-9999px;
    }
    .newCompanyNameInput.visible {
        position: relative;
        left: 0;
        opacity:1;
    }
</style>
