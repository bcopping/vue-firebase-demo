<template>
   
                    
        <li class="filter">
            <a @click="addFilter($event, name.name)">{{name.name}} <span class="badge">{{name.count}}</span></a>
        </li>

            
</template>

<script>
   
    import {mapActions} from 'vuex'

    import filtersOff from '../mixins'
    
    export default {
		data(){
			return {
                isActive: false
            }
		},
        props: ['name'],
        mixins: [filtersOff],
        methods:{
             ...mapActions([    
                'filterByName',
                'removeFilterWages'
            ]),
            addFilter(e,name){
                if(e.target.parentElement.classList.contains('active')) {
                    
                    e.target.parentElement.classList.remove('active')
                    
                    this.removeFilter();
                    
                }
                else {
                    
                    this.filtersOff();


                    e.target.parentElement.classList.add('active')
                    
                    this.filterByName(name);
                }
             },
            removeFilter(){
                this.removeFilterWages();
            }
            
            
        },
        created(){
            //this.removeFilter();
        }
	}
</script>

