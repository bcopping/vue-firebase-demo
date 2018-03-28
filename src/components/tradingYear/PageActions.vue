<template>
    <!--create global actions component for pages
        select trading year
        add (wage, inv, expense, dividen)
    -->
    <!-- Main container -->
    <nav class="level page-actions">
        <!-- Left side -->
        <div class="level-left">
            <div class="level-item">
                <p class="subtitle is-5">
                    Trading year
                </p>
            </div>
            <div class="level-item">
                <div class="field has-addons">
                    <p class="control">
                        <trading-year :yearFor="section"></trading-year>
                    </p>
                </div>
            </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
            <p class="level-item">
                <a @click="showAddWage" class="button is-success">
                    <span class="icon">
                        <i class="fa fa-plus"></i>
                    </span>
                    <span>Add {{section}}</span>
                </a>
            </p>
        </div>
    </nav>
</template>

<script>
    import tradingYear from './selectTradingYear.vue'

    export default {
        data() {
            return {

            }
        },
        props: ['section'],
        components: {
            tradingYear
        },
        methods: {
            showAddWage(){
                this.$emit('add')
            }
        }

    }

</script>
