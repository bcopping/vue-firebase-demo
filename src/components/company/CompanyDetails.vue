<template>
    <div>
        <h2>{{company.company}}</h2>
        <h2>{{company.date}}</h2>

         <a href="#" @click="test">Edit</a>

        <el-dialog title="Your Company" v-model="editCompanyModal" :beforeClose="handleClose" size="small">
            <span>Please add your company details</span>
            <app-add-company-details></app-add-company-details>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCompanyModal = false">Cancel</el-button>
            </span>
        </el-dialog>
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
            handleClose(done){

                 this.setEditCompany(false)
                done();
            }


        },
        created() {

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
