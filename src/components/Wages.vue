<template>
    <div>
        <h2>Wages</h2>
        <div class="row">
            <div class="col-xs-12">
                <app-add-wages :user="user"></app-add-wages>
            </div>  
        </div>
        <div class="row">
            <div class="col-xs-12">                
                <app-wage-filters :isWagesFiltered="isWagesFiltered"></app-wage-filters>
            </div>
        </div>
        <app-wages :user="user"></app-wages>
        <hr />
        
    </div>
</template>

<script>
   
    import {config} from './firebase/config.js'
    
    import logon from './logon/LoginButton.vue'
   
    import addWages from './wages/AddWage.vue'
    import wageFilters from './wages/WagesFilters.vue'
    import wages from './wages/Wages.vue'
    
    
    export default {
        data() {
            return {
              
            }
        },
        
        computed: {
            user() {
                return this.$store.getters.user
            },
            
            isWagesFiltered(){
                return this.$store.getters.wagesFilterActive;
            },
        },
        
        components: {
            appAddWages: addWages,
            appWageFilters: wageFilters,
            appWages: wages,
            
        },
        
        created() {
            
        }
    }
</script>