<style>
    
</style>
<template>
    <div :class="'mj-button mj-button-' + this.size + 'mj-button-' + this.type + (isDisabled ? 'mj-button-disabled' : '')" @click="_handleclick"><slot></slot></div>
</template>
<script>
    export default {
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
            },
        },
        methods:{
            _handleclick:function(){
                if(!this.isDisabled){
                    this.$emit("click")
                }
            }
        },
        computed:{
            isDisabled:function(){
                return (this.disabled === "" || this.disabled === "disabled" || this.disabled === "true" || this.disabled) && this.disabled !== "false";
            }
        },
        name:"mj-button"
    }
</script>