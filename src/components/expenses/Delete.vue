<template>
    <a @click="erase">X</a>
</template>

<script>

    export default {
        data() {
            return {

            }
        },
        methods: {
            erase(){
                console.log(this.data);
            }
        },
        props: ['data'],
        computed: {

        },
        created(){
            alert('created')
        }

    }
</script>
