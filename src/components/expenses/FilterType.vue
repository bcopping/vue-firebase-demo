<template>
    <li class="filter">
        <a @click="addFilter($event, type.type)">{{type.type}} <span class="badge">{{type.count}}</span></a>
    </li>
</template>

<script>
    import {mapActions} from 'vuex'
    import filtersOff from '../mixins'

    export default {
        data() {
            return {
                isActive: false
            }
        },
        props: ['type'],
        mixins: [filtersOff],
        methods:{
                ...mapActions([    
                'filterByType',
                'removeFilterByExpenses'
            ]),
            addFilter(e,type){
                if(e.target.parentElement.classList.contains('active')) {
                    e.target.parentElement.classList.remove('active')
                    this.removeFilter()
                }
                else {
                    this.filtersOff()
                    e.target.parentElement.classList.add('active')
                    this.filterByType(type)
                }
             },
            removeFilter() {
                this.removeFilterByExpenses()
            }
        }
    }
</script>

