<template>
    <div>
        <section class="hero is-fullwidth is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Company Details</h1>
                    <h2 class="subtitle">Manage company information</h2>
                </div>
            </div>
        </section>
        <div class="container">
            <app-company-details :user="user"></app-company-details>
        </div>
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

