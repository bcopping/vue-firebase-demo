<template>
    <div>
        <h2>{{company.company}}</h2>
        <h2>{{company.date}}</h2>

         <a href="#" @click="test">Edit</a>

         <div class="modal" :class="{'is-active': editCompanyModal}">
            <div class="modal-background" @click="handleClose"></div>
            <div class="modal-content">
                <div class="box">
                    <h1>Company Details</h1>
                    <app-add-company-details></app-add-company-details>
                    <a @click="handleClose">Cancel</a>


                </div>
            </div>
            <button @click="handleClose" class="modal-close is-large"></button>
        </div>


    </div>

</template>

<script>
    import * as firebase from 'firebase/app';

    import {config} from '../firebase/config.js'

    import {mapActions} from 'vuex'

    import addCompanyDetails from './AddCompanyDetails.vue'

    export default {
        data() {
            return {
                addCompanyModal: false
            }
        },
        components: {
            appAddCompanyDetails: addCompanyDetails
        },

        computed: {
            company() {

                return this.$store.getters.companyDetails
            },
            editCompanyModal() {
                return this.$store.getters.editCompany
            }
        },

        methods:{
            ...mapActions([
                'setEditCompany'
            ]),
            test() {
                var that = this
                that.setEditCompany(true)

            },
            handleClose(){
                this.addCompanyModal = false
                this.setEditCompany(false)

            }


        },
        created() {


        },
        mounted(){
            var that = this;
           if(!this.$store.getters.companyDetails.company) {

               that.setEditCompany(true)
           }
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
