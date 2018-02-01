<style></style>
<template>
    <div :class="'mj-col mj-col' + span + ' mj-text-' + align"><slot></slot></div>
</template>
<script>
    export default {
        props:{
            span:{
                type:Number,
                default:24
            },
            align:{
                type:String,
                default:"left"
            }
        },
        name:"mj-col"
    }
</script>