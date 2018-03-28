<style></style>
<template>
    <div class="mj-textarea">
        <textarea 
            ref="textarea" 
            spellcheck="false" 
            :rows="rows" 
            :readonly="readonly" 
            :disabled="disabled" 
            :placeholder="placeholder"
            @input="_handleInput" 
            @focus="_handleFocus" 
            @blur="_handleBlur">
            {{value || ""}}
        </textarea>
    </div>
</template>
<script>
    export default {
        props:{
            value:String,
            rows:{
                type:Number,
                default:5
            },
            readonly:String,
            disabled:String,
            placeholder:String
        },
        methods:{
            _handleInput:function(e){
                this.$emit("input",e.target.value);
                this.$refs.textarea.focus();
            },
            _handleFocus:function(e){
                this.$parent && this.$parent.validate && this.$parent.validate(null,"focus");
                this.$emit("focus");
            },
            _handleBlur:function(e){
                this.$parent && this.$parent.validate && this.$parent.validate(null,"blur");
                this.$emit("blur");
            },
            resetData:function(data){
                this.$emit("input",data);
            }
        },
        watch:{
            value:function(){
                this.$refs.textarea.innerText = this.value;
                this.$refs.textarea.value = this.value;
            }
        },
        name:"mj-textarea"
    }
</script>