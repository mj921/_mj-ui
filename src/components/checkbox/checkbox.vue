<style></style>
<template>
    <div :class="{'clearfix':true,'mj-checkbox':true,'mj-checkbox-disabled':disabled && disabled !== 'false'}" @click="_handleClick">
        <div :class="{'mj-checkbox-checked':value}"></div>
        <label>{{label}}</label>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                checkboxId:""
            }
        },
        props:{
            value:{
                type:Boolean,
                default:false
            },
            data:{
                type:String,
                default:""
            },
            label:{
                type:String,
                default:""
            },
            checkedValue:{
                validator:function(){
                    return true;
                },
                default:""
            },
            disabled:{
                validator: function (value) {
                    return typeof value === "boolean" || typeof value === "string";
                },
                default:false
            },
        },
        methods:{
            _handleClick:function(){
                if(this.disabled === false || this.disabled === 'false'){
                    this.$emit("input",!this.value);
                    this.$emit("click");
                }
            }
        },
        watch:{
            value:function(){
                this.$emit("change");
                if(this.isInGrouop){
                    if(this.value){
                        console.log(this.$parent)
                        this.$parent._addValue(this.checkboxId);
                    }else{
                        this.$parent._delValue(this.checkboxId);
                    }
                }
            }
        },
        computed:{
            isInGrouop:function(){
                return this.$parent && this.$parent.$vnode && this.$parent.$vnode.tag && /^vue-component-\d*-mj-checkbox-group$/.test(this.$parent.$vnode.tag);
            }
        },
        created:function(){
            if(this.isInGrouop){
                this.checkboxId = "checkboxId" + this.$parent.valueLength;
                this.$parent.valueLength++;
                this.$parent.values[this.checkboxId] = this.checkedValue;
                if(this.value){
                    this.$parent._addValue(this.checkboxId);
                }
            }
        },
        name:"mj-checkbox"
    }
</script>