<style></style>
<template>
    <dl v-if="created" :class="{'mj-select-item':true,'hidden':!this.showFlag}" @click="_handleClick">{{label || value}}</dl>
</template>
<script>
    export default {
        props:{
            label:String,
            value:{
                required:true
            },
            showFlag:{
                type:Boolean,
                default:true
            },
            created:{
                type:Boolean,
                default:false
            },
            clickFun:{
                type:Function,
                default:null
            }
        },
        methods:{
            _handleClick:function(){
                console.log(this.value,this.label || this.value)
                this.clickFun(this.value,this.label || this.value);
            },
            setShowFlag:function(showFlag){
                this.showFlag = showFlag;
            }
        },
        created:function(){
            if(!this.created && this.$parent && this.$parent.list && Array.isArray(this.$parent.list) && this.$parent.listLength !== undefined){
                this.$parent.list.push({
                    showFlag:this.showFlag,
                    label:this.label || this.value,
                    value:this.value,
                    attrs:this.$vnode.data.attrs,
                    _selectItemId:"_selectItemId" + this.$parent.listLength
                });
                if(this.$parent.value === this.value){
                    this.$parent.str = this.label || this.value;
                    this.$parent.strVal = this.label || this.value;
                    this.$parent.selected = {
                        showFlag:this.showFlag,
                        label:this.label || this.value,
                        value:this.value,
                        attrs:this.$vnode.data.attrs,
                        _selectItemId:"_selectItemId" + this.$parent.listLength
                    }
                }
                this.$parent.listLength++;
            }
        },
        name:"mj-select-item"
    }
</script>