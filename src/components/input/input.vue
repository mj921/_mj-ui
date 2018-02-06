<style></style>
<template>
    <div  class='mj-input'>
        <input spellcheck='false' v-model='currValue' :placeholder='placeholder' :type='type' :disabled='disabled' :readonly='readonly' @focus='_handleFocus' @blur='_handleBlur' @change='_handleChange' />
        <div class='mj-input-append' v-if='$slots.append && this.$slots.append.length > 0'><slot name='append'></slot></div>
    </div>
</template>
<script>
    export default {
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
            },
            resetData:function(data){
                this.currValue = data;
            }
        },
        computed:{
            currValue:{
                get:function(){
                    return this.value;
                },
                set:function(val){
                    if(this.$parent && this.$parent.childVal){
                        this.$parent.childVal = val;
                    }
                    this.$emit("input",val);
                }
            }
        },
        created:function(){
            if(this.$parent && this.$parent.isNeedValid !== undefined){
                this.$parent.isNeedValid = true;
            }
        },
        name:"mj-input"
    }
</script>