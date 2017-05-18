<template>
    <div>
        
        <h2>Dividends</h2>
        <div class="row">
            <div class="col-xs-12">
                <app-add-dividends :user="user"></app-add-dividends>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">                
                <app-dividend-filters :isDividendsFiltered="isDividendsFiltered"></app-dividend-filters>
            </div>
        </div>
        <app-dividends :user="user"></app-dividends>
        
    </div>
</template>

<script>
   
    import {config} from './firebase/config.js'
    
    import logon from './logon/LoginButton.vue'
   
    import addDividends from './dividends/AddDividend.vue'
    import dividendFilters from './dividends/DividendsFilters.vue'
    import dividends from './dividends/Dividends.vue'
 
    export default {
        data() {
            return {
              
            }
        },
        
        computed: {
            user() {
                return this.$store.getters.user
            },
            
            isDividendsFiltered(){
                return this.$store.getters.dividendsFilterActive;
            },
        
        },
        
        components: {
            
            appAddDividends: addDividends,
            appDividendFilters: dividendFilters,
            appDividends: dividends,
            
        },
        
    }
</script>