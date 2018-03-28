<template>
    <div>
        <page-actions :section="csvTitle" v-on:add="showAddWage"></page-actions>

        <div class="box" v-show="addWage" :class="{'animated fadeIn': addWage}">
            <div class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                         <p class="title is-4">Add wage detail</p>
                    </div>
                </div>
                <!-- Right side -->
                <div class="level-right">
                    <div class="level-item">
                        <a @click="showAddWage"> <span class="icon"><i class="fa fa-close"></i></span></a>
                    </div>
                </div>
            </div>

            <hr>
            <br>
            <form v-on:submit.prevent>
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
                        <label class="label">To</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <div class="select">
                                <select

                                    v-if="!addEmployeeName"
                                    @change="employeeSelectHandler"
                                    v-model="newEmployeeNameSet"
                                    >
                                    <option disabled value="default">Select employee</option>
                                    <option v-for="person in people" v-bind:value="{name: person.name, id: person.id} ">
                                        {{person.name}}
                                    </option>
                                    <option value="addNew">Add new employee</option>
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
                                <input class="input" v-model="wageAmount" type="number" step="0.01" placeholder="0.00">
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
                                <button @click="addWageRecord" class="button is-primary">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <br>
        </div>

        <div class="modal" :class="{'is-active': addEmployeeModal}">
            <div class="modal-background" @click="addEmployeeModal = false"></div>
            <div class="modal-content">
                <div class="box">
                    <h1>Enter full name</h1>
                    <app-add-company-person :user="user"></app-add-company-person>
                    <a @click="addEmployeeModal = false">Cancel</a>
                </div>
            </div>
            <button @click="addEmployeeModal = false" class="modal-close is-large"></button>
        </div>

    </div>
</template>

<script>
    import * as firebase from 'firebase/app';
    import {config} from '../firebase/config.js'
    import getWages from '../mixins'
    import filtersOff from '../mixins'
    import {mapActions} from 'vuex'
    import addCompanyPerson from '../people/AddCompanyPerson.vue'
    import companyPersonSelect from '../people/CompanyPersonSelect.vue'
    import getTradingYear from '../mixins'
    import Datepicker from 'vuejs-datepicker'
    import tradingYear from '../tradingYear/selectTradingYear.vue'
    import pageActions from '../tradingYear/PageActions.vue'


    export default {
        data() {
            return {
                wageAmount: 0.00,
                addEmployeeName: false,
                newEmployeeName: '',
                newEmployeeNameSet: 'default',
                nameID: '',
                addEmployeeModal: false,
                format: 'yyyy-MM-dd',
                csvTitle: "wages",
                addWage: false

            }
        },

        mixins: [getWages, filtersOff],
        components: {
            appAddCompanyPerson: addCompanyPerson,
            Datepicker,
            tradingYear,
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
            employeeNames() {
                return this.$store.getters.employeeNames
            },

        },

        methods:{
            ...mapActions([
                'removeFilterWages',
                'setPersonModal',
            ]),

            employeeSelectHandler(e){
                if(e.target.value === 'addNew') {

                    this.addEmployeeModal = true
                    this.setPersonModal(true);
                    //this.$refs.newEmployeeInput.focus();
                }
            },
            addWageRecord(){

                const db = firebase.database().ref('users/'+ this.user.uid).child('/wages/');
                const ref = db.push().key;
                const date = document.getElementById("paymentDate").value
                //we set which trading year the invoice goes in
                this.getTradingYear(date)

                //get data ready to set in our firebase db ref
                //store the key generated by firebase in this object so we can easily access the key for say delete or update methods
                //see delete in Expenses2.vue
                var timestamp = Date.now();

                var newData = {
                    name: this.newEmployeeNameSet.name,
                    nameID: this.newEmployeeNameSet.id,
                    wage: this.wageAmount,
                    id: ref,
                    timestamp: timestamp,
                    date,
                    tradingYear: this.$store.getters.tradingYear
                };

                db.child(ref).set(newData);

                this.getWages();
                this.removeFilterWages();
                this.filtersOff();

            },
            showAddWage(){
                this.addWage = !this.addWage
            }

        },
        watch: {
            //bit of a hack here to get the modal to close via state and default close methods with element(esc key, close icon, modal click etc...)
            addEmployeeModal: function (val) {
               if (val === false){
                   this.setPersonModal(false)
                   this.newEmployeeNameSet = 'default'
               }
            },
            addPersonVisible:function(val){
                if (val === false){
                    this.addEmployeeModal = false
               }
            }

        },
        created() {
            this.getWages();
        }
    }
</script>
<style>

</style>
