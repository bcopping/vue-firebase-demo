<template>
    <div>
        <page-actions :section="csvTitle" v-on:add="showAddDividend"></page-actions>
        <div class="box" v-show="addDividend" :class="{'animated fadeIn': addDividend}">
            <div class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                         <p class="title is-4">Add dividend detail</p>
                    </div>
                </div>
                <!-- Right side -->
                <div class="level-right">
                    <div class="level-item">
                        <a @click="showAddDividend"> <span class="icon"><i class="fa fa-close"></i></span></a>
                    </div>
                </div>
            </div>

            <hr>
            <br>
            <form class="form-inline"  v-on:submit.prevent>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="paymentDate" class="label">Payment date</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <datepicker :format="format" input-class="input" id="paymentDate" placeholder="Payment date"></datepicker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="" class="label">Shareholder</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <div class="select">
                                    <select
                                        @change="shareholderSelectHandler"
                                        v-model="newShareholderNameSet"
                                        >
                                        <option disabled value="default">Select shareholder</option>
                                        <option v-for="person in people" v-bind:value="{name: person.name, id: person.id} ">
                                            {{person.name}}
                                        </option>
                                        <option value="addNew">Add new shareholder</option>
                                    </select>
                                </div>
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
                                <input class="input" v-model="dividendAmount" type="number" step="0.01" placeholder="0.00">
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
                                <button @click="addShareholder" class="button is-primary">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>


        <div class="modal" :class="{'is-active': addShareholderModal}">
            <div class="modal-background" @click="addShareholderModal = false"></div>
            <div class="modal-content">
                <div class="box">
                    <h1>Enter full name</h1>
                    <app-add-company-person :user="user"></app-add-company-person>
                    <a @click="addShareholderModal = false">Cancel</a>
                </div>
            </div>
            <button @click="addShareholderModal = false" class="modal-close is-large"></button>
        </div>


    </div>
</template>

<script>
    import * as firebase from 'firebase/app';

    import {config} from '../firebase/config.js'

    import getDividends from '../mixins'
    import getTradingYear from '../mixins'
    import filtersOff from '../mixins'
    import Datepicker from 'vuejs-datepicker'
    import {mapActions} from 'vuex'
    import pageActions from '../tradingYear/PageActions.vue'
    import addCompanyPerson from '../people/AddCompanyPerson.vue'



    export default {
        data() {
            return {
                dividendAmount: 0.00,
                newShareholderNameSet: 'default',
                dateTEST: '',
                addShareholderModal: false,
                format: 'yyyy-MM-dd',
                addDividend: false,
                csvTitle: "dividends",
            }
        },

        mixins: [getDividends, filtersOff],
        components: {
            appAddCompanyPerson: addCompanyPerson,
            Datepicker,
            pageActions
        },
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



        methods:{
            ...mapActions([
                'removeFilterDividends',
                'setPersonModal'
            ]),
            shareholderSelectHandler(e){
                if(e.target.value === 'addNew') {
                    this.addShareholderModal = true
                    this.setPersonModal(true);
                }
            },
            cancelHandler(){
                this.setPersonModal(false)
                this.newShareholderNameSet = 'default'
            },
            addShareholder(){


                const db = firebase.database().ref('users/'+ this.user.uid).child('/dividends/');
                const id = db.push().key;
                const date = document.getElementById("paymentDate").value

                //we set which trading year the invoice goes in
                this.getTradingYear(date)
                //get data ready to set in our firebase db ref
                //store the key generated by firebase in this object so we can easily access the key for say delete or update methods
                //see delete in Expenses2.vue
                var timestamp = Date.now();

                var newData = {
                    name: this.newShareholderNameSet.name,
                    nameID: this.newShareholderNameSet.id,
                    dividend: this.dividendAmount,
                    id,
                    timestamp,
                    date,
                    tradingYear: this.$store.getters.tradingYear
                };

                db.child(id).set(newData);

                this.getDividends();
                this.removeFilterDividends();
                this.filtersOff();
            },
            showAddDividend(){
                this.addDividend = !this.addDividend
            }

        },
        watch: {
            //bit of a hack here to get the modal to close via state and default close methods with element(esc key, close icon, modal click etc...)
            addShareholderModal: function (val) {
               if (val === false){
                   this.setPersonModal(false)
                   this.newShareholderNameSet = 'default'
               }
            },
            addPersonVisible:function(val){
                if (val === false){
                    this.addShareholderModal = false
               }
            }

        },
        created() {
            this.getDividends();
        }
    }
</script>

