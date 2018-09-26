<template>
    <div class="mj-button-group"><slot></slot></div>
</template>
<script>
    export default {
        name: "mj-button-group"
    }
</script>
<style scoped>
    .mj-button-group{
        display: inline-block;
        border-radius: 4px;
        overflow: hidden;
    }
    .mj-button-group >>> .mj-button{
        margin: 0;
        border-radius: 0;
    }
    .mj-button-group >>> .mj-button:not(:last-child){
        border-right: 1px solid #fff;
    }
</style>