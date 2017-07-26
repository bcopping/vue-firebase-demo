<template>
    <div>
        <section class="hero is-fullwidth is-primary">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Dashboard
                </h1>
                <h2 class="subtitle">
                    Useful stuff
                </h2>
                </div>
            </div>
        </section>
        <div class="container">

            <select-tax-year v-if="homeLoaded"></select-tax-year>
            <p>--------------------------------------------------</p>
            <corp-tax></corp-tax>
            <br /><br />

        </div>
    </div>
</template>

<script>

    import selectTaxYear from './forecasts/selectTaxYear.vue'
    import corpTax from './forecasts/corporationTax.vue'
    export default {
        data() {
            return {

            }
        },

        computed: {

            homeLoaded() {
                return this.$store.getters.homeLoaded
            }
        },

        components:{
            selectTaxYear,
            corpTax
        },
        created(){


        },

    }
</script>
<style>

</style>
