<style></style>
<template>
    <div class="mj-dialog" v-show="visible">
        <div class="mj-dialog-mask" @click="_maskClose"></div>
        <div :class="'mj-dialog-default' + ' mj-dialog-' + size + (src && src.length > 0 ? ' mj-dialog-iframe' : '')" :style="mainStyle">
            <div class="mj-dialog-header">
                <span>{{title}}</span>
                <div class="mj-dialog-close" @click="_handleClose"></div>
            </div>
            <div class="mj-dialog-body">
                <iframe :src="currSrc" frameborder="0" v-if="src && src.length > 0"></iframe>
                <slot v-else></slot>
            </div>
            <slot class="mj-dialog-footer" name="footer"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: "middle"
            },
            src: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                default: "标题"
            },
            maskFlag:  {
                type:  Boolean,
                default:  true
            },
            width: String,
            height: String
        },
        data () {
            return {
                overflow: ""
            }
        },
        methods: {
            _handleClose () {
                this.$emit("update:visible", false);
                this.$emit("close");
            },
            _maskClose () {
                if (this.maskFlag) {
                    this._handleClose();
                }
            }
        },
        computed: {
            currSrc () {
                return this.src.indexOf("?") > 0 ? (this.src + "&mjrandomtime=" + new Date().getTime()) : (this.src + "?mjrandomtime=" + new Date().getTime());
            },
            mainStyle () {
                var mainStyle = {paddingBottom:this.$slots.footer && this.$slots.footer.length > 0 ? "50px" : "0px"};
                if(this.width){
                    mainStyle.width = this.width;
                }
                if(this.height){
                    mainStyle.height = this.height;
                }
                return mainStyle;
            }
        },
        watch:{
            visible () {
                if(this.size === "full" && this.visible){
                    document.body.style.overflow = "hidden";
                }else{
                    document.body.style.overflow = this.overflow;
                }
                if(this.visible === false){
                    this.$emit("close")
                }
            }
        },
        created () {
            this.overflow = document.body.style.overflow || "auto";
        },
        name:"mj-dialog"
    }
</script>

<style scoped>
    .mj-dialog{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 99999;
    }
    .mj-dialog.mj-dialog-hide{
        display: none;
    }
    .mj-dialog-mask{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
    }
    .mj-dialog-default{
        position: absolute;
        top: 15%;
        left: 20%;
        width: 60%; 
        padding-top: 36px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        background-color: #fff;
        border-radius: 3px 3px 0 0;
    }
    .mj-dialog-large{
        left: 10%;
        width: 80%;
    }
    .mj-dialog-middle{
        left: 20%;
        width: 60%;
        min-width: 520px;
    }
    .mj-dialog-small{
        left: 35%;
        width: 30%;
        min-width: 450px;
    }
    .mj-dialog-full{
        top: 0;
        left: 0;
        width: 100%;
        border-radius: 0;
    }
    .mj-dialog-header{
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
    .mj-dialog-header .mj-dialog-close{
        position: relative;
        float: right;
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
    .mj-dialog-header .mj-dialog-close:after{
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
    .mj-dialog-header .mj-dialog-close:before{
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
    .mj-dialog-body{
        padding: 10px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .mj-dialog-iframe{
        height: 75%;
    }
    .mj-dialog-full.mj-dialog-iframe{
        height: 100%;
    }
    .mj-dialog-iframe .mj-dialog-body>iframe{
        width: 100%;
        height: 100%;
        border:0;
        background-color: #fff;
    }
    .mj-dialog-footer{
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        font-size: 16px;
        border-radius: 0 0 3px 3px;
        background-color: #fff;
    }
</style>