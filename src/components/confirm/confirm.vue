<template>
    <div class="mj-confirm">
        <div class="mj-confirm-mask"></div>
        <div class="mj-confirm-default">
            <div class="mj-confirm-header">
                <span>{{title}}</span>
                <div class="mj-confirm-close" @click="closeFun"></div>
            </div>
            <div class="mj-confirm-body">{{message}}</div>
            <div class="mj-confirm-footer">
                <mj-button @click="cancelFun" type="text" size="small">{{cancelBtnText}}</mj-button>
                <mj-button @click="confirmFun" size="small">{{confirmBtnText}}</mj-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            title:{
                type:String,
                default:"标题"
            },
            message:String,
            confirmBtnText:{
                type:String,
                default:"确定"
            },
            cancelBtnText:{
                type:String,
                default:"取消"
            },
            confirmFun:Function,
            cancelFun:Function,
            closeFun:Function,
        },
        name:"mj-confirm"
    }
</script>
<style scoped>
    .mj-confirm{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 99999;
    }
    .mj-confirm-mask{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
    }
    .mj-confirm-default{
        position: absolute;
        top: 15%;
        left: 50%;
        margin-left: -200px;
        width: 400px; 
        padding-top: 36px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        background-color: #fff;
        border-radius: 3px 3px 0 0;
    }
    .mj-confirm-header{
        position: absolute;
        left: 0;
        top: 0;
        padding: 10px 10px 0;
        width: 100%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        font-size: 16px;
        font-weight: bold;
    }
    .mj-confirm-header .mj-confirm-close{
        position: relative;
        float: right;
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
    .mj-confirm-header .mj-confirm-close:after{
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        margin-left: -3px;
        width: 140%;
        height: 1px;
        background-color: #a2a8b4;
        transform: rotate(45deg);
    }
    .mj-confirm-header .mj-confirm-close:before{
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        margin-left: -3px;
        width: 140%;
        height: 1px;
        background-color: #a2a8b4;
        transform: rotate(-45deg);
    }
    .mj-confirm-body{
        padding: 10px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .mj-confirm-footer{
        position: absolute;
        left: 0;
        top: 100%;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        font-size: 16px;
        font-weight: bold;
        text-align: right;
        border-radius: 0 0 3px 3px;
        background-color: #fff;
    }
</style>