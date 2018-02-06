<style></style>
<template>
    <div class="mj-loading" v-show="value">
        <div>{{text}}</div>
    </div>
</template>
<script>
    export default {
        props:{
            value:{
                type:Boolean,
                default:false
            },
            text:{
                type:String,
                default:"处理中。。。"
            }
        },
        name:"mj-loading"
    }
</script>