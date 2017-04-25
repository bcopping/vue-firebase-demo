<template>
    <div>
        <h2>{{company.company}}</h2>
        <h2>{{company.date}}</h2>

         <a href="#" @click="addCompanyModal = !addCompanyModal">Edit</a>
         
        <el-dialog title="Company Details" v-model="addCompanyModal" size="small">
            <span>Company Details</span>
            <app-add-company-details></app-add-company-details>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCompanyModal = false">Cancel</el-button>
            </span>
        </el-dialog>           
    </div>
   
</template>

<script>
    import * as firebase from 'firebase';
   
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
           
        },
            
        methods:{
            ...mapActions([
                
            ]),
           
           
        },
        created() {
           
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
