<style>
    
</style>
<template>
    <button :class="buttonClass" @click="_handleclick"><slot></slot></button>
</template>
<script>
    export default {
        props:{
            size:{
                type:String,
                default:"medium"
            },
            disabled:{
                validate (val) {
                    return typeof val === "string" || typeof val === "boolean";
                },
                default: false
            },
            type:{
                type:String,
                default:"default"
            },
            round: {
                validate (val) {
                    return typeof val === "string" || typeof val === "boolean";
                },
                default: false
            }
        },
        methods:{
            _handleclick:function(){
                if(!this.disabledFlag){
                    this.$emit("click")
                }
            }
        },
        computed:{
            disabledFlag () {
                return this.disabled === true || this.disabled === "round" || this.disabled === "";
            },
            buttonClass () {
                return 'mj-button mj-button-' + this.size + ' mj-button-' + this.type + (this.disabledFlag ? ' mj-button-disabled' : '') + (this.roundFlag ? ' mj-button-round' : '')
            },
            roundFlag () {
                return this.round === true || this.round === "round" || this.round === "";
            }
        },
        name:"mj-button"
    }
</script>
<style scoped>
    .mj-button{
        display: inline-block;
        margin: 0 5px 5px;
        padding: 0 20px;
        white-space: nowrap;
        height: 36px;
        line-height: 36px;
        text-align: center;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        font-size: 14px;
        border-radius:2px; 
        cursor: pointer;
        border: none;
    }
    .mj-button-small{
        padding: 0 16px;
        line-height: 32px;
        height: 32px;
        font-size: 14px;
    }
    .mj-button-mini{
        padding: 0 10px;
        line-height: 28px;
        height: 28px;
        font-size: 12px;
    }
    .mj-button.mj-button-disabled{
        background-color: #d4d8e8;
        color: #fff;
        cursor: not-allowed;
    }
    .mj-button-default{
        background-color: #fff;
        border:1px solid #e7e9f3;
        color: #1f272e;
    }
    .mj-button-primary{
        background-color: #2283ef;
        color: #fff;
    }
    .mj-button-danger{
        background-color: #ff4949;
        color: #fff;
    }
    .mj-button-text{
        padding-left: 0;
        padding-right: 0;
        background-color: transparent;
        color: #2283ef;
    }
    .mj-button-text.mj-button-disabled{
        background-color: transparent;
        color: #d4d8e8;
    }
    .mj-button-round{
        border-radius: 18px;
    }
</style>