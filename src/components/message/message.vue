<template>
    <div :class="'mj-message mj-message-' + type"><p>{{message}}</p></div>
</template>
<script>
    export default {
        props:{
            type:{
                type:String,
                default:"info"
            },
            message:String,
        },
        name:"mj-message"
    }
</script>
<style scoped>
    .mj-message{
        position: fixed;
        left: 35%;
        top: 15%;
        width: 30%;
        padding: 20px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        font-size: 14px;
        border-radius: 1px;
        text-align: center;
        line-height: 24px;
        color:#fff;
        z-index: 9999999999;
    }
    .mj-message p{
        word-break:break-word;
    }
    .mj-message-success{
        background-color: #13ce66;
    }
    .mj-message-waring{
        background-color: #f7ba2a;
    }
    .mj-message-info{
        background-color: #2283ef;
    }
    .mj-message-error{
        background-color: #ff4949;
    }
</style>