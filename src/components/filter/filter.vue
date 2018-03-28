<template>
    <div>
        <nav class="level page-actions" v-show="showFilter">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <p class="subtitle is-6">
                        <b>Filters:</b>
                    </p>
                </div>
                <div class="level-item">
                    <div class="tabs">
                        <ul>
                            <app-filter-item v-for="(data, index) in filterObject" :key="index" :filterData="data" :filtering="filterTitle"></app-filter-item>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
    import filterItem from './filterItem.vue'
    export default {
        props: ['showFilter', 'filterObject', 'filterData', 'filterTitle'],
        components: {
            appFilterItem: filterItem,
        }
    }
</script>
