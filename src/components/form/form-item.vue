<style></style>
<template>
    <div :class="{'mj-form-item':true,'mj-form-error':this.isError,'mj-form-item-inline':!!this.inline}" :style="_formItemStyle">
        <label :class="'mj-form-item-label mj-text-' + labelAlign" :style="'width:' + _labelWidth">
            <span class="{'mj-form-required':_isRequired}">{{label || ""}}</span>
        </label>
        <div class="mj-form-item-content">
            <slot></slot>
            <div class="mj-form-message" v-show="message && message.length > 0">{{message}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            label:String,
            labelWidth:{
                type:String,
                default:""
            },
            prop:String,
            rules:{
                type:Array,
                default:function(){return [];}
            },
            inline:String,
            required:{
                type:String,
                default:"false"
            },
            size:{
                type:Number,
                default:1
            },
            "label-align":String,
            "auto-width":{
                type:Boolean,
                default:false
            }
        },
        data:function(){
            return {
                isNeedValid:false,
                isError:false,
                message:"",
                parent:null,
                childVal:null
            }
        },
        computed:{
            rule:function(){
                if(this.rules.length > 0){
                    return this.rules;
                }else if(this.parent && this.$parent.rules && this.$parent.rules[this.prop]){
                    return this.$parent.rules[this.prop];
                }else{
                    return [];
                }
            },
            _isRequired:function(){
                if(this.required !== "false"){
                    return true;
                }else{
                    for(var i = 0,len = this.rule.length;i < len;i++){
                        if(this.rule[i].required && this.rule[i].required === true){
                            return true;
                        }
                    }
                    return false;
                }
            },
            _labelWidth:function(){
                return this.labelWidth === "" ? (this.parent ? this.parent.labelWidth : "") : this.labelWidth;
            },
            _formItemStyle:function(){
                if(this.autoWidth){
                    return {minWidth:"auto",paddingBottom:"0"};
                }else{
                    return {minWidth:this.size * 272 - 10 + "px"};
                }
            }
        },
        methods:{
            validate:function(callback,type){
                if(this.prop && this.isNeedValid && this.rule && this.rule.length > 0){
                    for(var i = 0,len = this.rule.length;i < len;i++){
                        if((!type || type === this.rule[i].trigger) && this.rule[i].required && this.childVal === ""){
                            callback && callback(false);
                            this.message = this.rule[i].message;
                            this.isError = true;
                            return false;
                        }
                        if((!type || type === this.rule[i].trigger) && this.rule[i].validator){
                            var self = this;
                            var flag = true;
                            this.rule[i].validator(this.childVal,function(message){
                                if(message && message.length > 0){
                                    callback && callback(false);
                                    self.message = message;
                                    self.isError = true;
                                    flag = false;
                                }else{
                                    flag = false;
                                }
                            })
                            if(!flag){
                                self.isError = true;
                                return false;
                            }
                        }
                    }
                }
                callback && callback(true)
                this.message = "";
                this.isError = false;
                return true;
            },
            resetData:function(model){
                for(var i = 0;i < this.$slots.default.length;i++){
                    if(this.prop && this.$slots.default[i] && this.$slots.default[i].resetData){
                        this.$slots.default[i].resetData(model[this.prop]);
                    }
                }
                this.message = "";
                this.isError = false;
            }
        },
        created:function(){
            var parent = this.$parent;
            while (parent) {
                if (parent.$vnode && parent.$vnode.tag && /^vue-component-\d*-mj-form$/.test(parent.$vnode.tag)) {
                    this.parent = parent;
                    break;
                } else {
                    parent = parent.$parent;
                }
            }
            if (this.parent) {
                this.parent.formItemList.push(this);
            }
        },
        name:"mj-form-item"
    }
</script>