<style></style>
<template>
    <div  class='mj-input'>
        <input ref='ipt' spellcheck='false' :value='currValue' :placeholder='placeholder' :type='type' :disabled='disabled' :readonly='readonly' @input='_handleInput' @focus='_handleFocus' @blur='_handleBlur' @change='_handleChange' />
        <div class='mj-input-append' v-if='$slots.append && this.$slots.append.length > 0'><slot name='append'></slot></div>
    </div>
</template>
<script>
    export default {
        data:function(){
            return{
                inputObj:null,
                currValue:""
            }
        },
        props:{
            value:{
                validator:function(value){
                    return true;
                }
            },
            disabled:{
                validator:function(value){
                    return typeof value === "string" || typeof value === "boolean";
                }
            },
            placeholder:String,
            type:{
                type:String,
                default:"text"
            },
            readonly:String,
            input:Function
        },
        methods:{
            _handleInput:function(e){
                this.input && this.input(e);
                this.$emit("input",e.target.value);
            },
            _handleFocus:function(e){
                this.$parent && this.$parent.validate && this.$parent.validate(null,"focus");
                this.$emit("focus");
            },
            _handleBlur:function(e){
                this.$parent && this.$parent.validate && this.$parent.validate(null,"blur");
                this.$emit("blur");
            },
            _handleChange:function(e){
                this.$emit("change");
            }
        },
        watch:{
            value:function(){
                this.currValue = this.value;
                this.$emit("change");
            }
        },
        created:function(){
            this.currValue = this.value;
        },
        mounted:function(){
            this.inputObj = this.$refs.ipt;
        },
        name:"mj-input"
    }
</script>