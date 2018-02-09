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