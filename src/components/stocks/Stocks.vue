<template>
    <div class="row">
        <app-stock v-for="(stock, index) in activeStock" :stock="stock"> </app-stock>
    </div>
</template>

<script>
    import stock from './Stock.vue';
    export default {
        data(){
            return {
                stocks : this.activeStock
            }
        },
        components: {
            appStock : stock
        },
        computed: {
            activeStock() {
                console.log('active stock')
                return this.$store.getters.stocks
            }
        }
    }
</script>