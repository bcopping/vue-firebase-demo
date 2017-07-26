<template>
    <div>
        <section class="hero is-fullwidth is-info is-large">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Strappy title
                </h1>
                <h2 class="subtitle">
                    Strapp subtitle
                </h2>

                <app-logon></app-logon>

                </div>
            </div>
        </section>
    </div>

</template>

<script>

    import logon from './LoginButton.vue'

    export default {
        data() {
            return {
            }
        },
        components: {
            appLogon: logon
        }
    }
</script>
