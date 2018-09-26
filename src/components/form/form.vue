<style></style>
<template>
    <div :class="'mj-form' + (!!align ? ' mj-form-inline-block' : '') + ' mj-text-' + align">
        <form :class="{'mj-form-inline':this.inline}" :action="action" :enctype="enctype" :method="method" :target="target" ref="form">
            <slot></slot>
        </form>
    </div>
</template>
<script>
    import { objCopy } from "../../util.js";
    export default {
        props:{
            inline:{
                type:Boolean,
                default:false
            },
            action:String,
            enctype:String,
            method:String,
            target:String,
            labelWidth:String,
            model:Object,
            rules:{
                type:Object,
                default: function () {return {}}
            },
            align:{
                type:String,
                default:"left"
            },
            "label-align":{
                type:String,
                default:"left"
            }
        },
        data:function(){
            return {
                formItemList:[]
            }
        },
        methods:{
            objCopy,
            validate:function(callback){
                for(var i = 0,len = this.formItemList.length;i < len;i++){
                    if(this.formItemList[i] && this.formItemList[i].validate && !this.formItemList[i].validate(null,"")){
                        callback && callback(false);
                        return false;
                    }
                }
                callback && callback(true);
                return true;
            },
            resetForm:function(){
                for(var i = 0,len = this.formItemList.length;i < len;i++){
                    if(this.formItemList[i] && this.formItemList[i].resetData){
                        this.formItemList[i].resetData(this.model);
                    }
                }
            },
            submit:function(){
                this.$refs.form.submit();
            }
        },
        name:"mj-form"
    }
</script>