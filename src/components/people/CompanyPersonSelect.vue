<template>
    <div>
       <select 
            class="form-control" 
           
            @change=""
            v-model="personSet"
            >
            <option disabled value="default">Select Person</option>
            <option v-for="person in people" v-bind:value="person.name">
                {{person.name}}: ID {{person.id}}
            </option>
            
        </select>           
    </div>
</template>

<script>
    export default {
        data() {
            return {
               personSet: 'default' 
            }
        },
        computed: {
            people() {
                return this.$store.getters.people
            }
        },
        methods:{
           
        },
        created() {
            
        }
    }
</script>
<style>
   
</style>
