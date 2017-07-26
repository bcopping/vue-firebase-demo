<template>
    <div>
        <section class="hero is-fullwidth is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Wages</h1>
                    <h2 class="subtitle">Manage company employees wages</h2>
                </div>
            </div>
        </section>
        <div class="container">
            <app-add-wages :user="user"></app-add-wages>

            <app-wage-filters :isWagesFiltered="isWagesFiltered"></app-wage-filters>

            <app-wages :user="user"></app-wages>
        </div>
    </div>
</template>

<script>

    import {config} from './firebase/config.js'

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
