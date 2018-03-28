
<template>
    <div>
        <router-view name="app-header"></router-view>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
        computed: {

        },
        created(){


        }
    }
</script>

<style lang="scss" src="./assets/main.scss"></style>
<style>
    #notification {
        position:absolute;
        top:0;
        right:0;
        left:0;
        z-index:1000;
    }
</style>
