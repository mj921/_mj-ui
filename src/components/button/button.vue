<style>
    
</style>
<template>
    <div :class="'mj-button mj-button-' + this.size + 'mj-button-' + this.type + (isDisabled ? 'mj-button-disabled' : '')" @click="click()"><slot></slot></div>
</template>
<script>
    export default {
        data(){
            return {
                isDisabled:false
            }
        },
        props:{
            size:{
                type:String,
                default:"middle"
            },
            disabled:{
                type:String,
                default:"false"
            },
            type:{
                type:String,
                default:"default"
            }
        },
        methods:{
            click:function(){
                if(this.isDisabled){
                    return function(e){
                        this.$emit("click",e)
                    }
                }
            }
        },
        created:function(){
            this.isDisabled = (this.disabled === "" || this.disabled === "disabled" || this.disabled === "true" || this.disabled) && this.disabled !== "false";
        },
        name:"mj-button"
    }
</script>