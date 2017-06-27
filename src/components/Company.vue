<template>
    <div>
        
        <h2>Company Details</h2>
        
        <app-company-details :user="user"></app-company-details>
        
    </div>
</template>

<script>
   
    import {config} from './firebase/config.js'
    
    
   
    import companyDetails from './company/CompanyDetails.vue'
   
 
    export default {
        data() {
            return {
              
            }
        },
        
        computed: {
            user() {
                return this.$store.getters.user
            }
        
        },
        
        components: {
            
            appCompanyDetails: companyDetails,
            
            
        },
        
    }
</script>

