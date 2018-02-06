<style></style>
<template>
    <dl @click="_handleClick" v-if="!created" :class="{'mj-radio-checked':checked}">
        <div class="mj-radio-div"></div>
        <label>{{label}}</label>
    </dl>
</template>
<script>
    export default {
        props:{
            value:{
                type:String,
                required:true
            },
            label:{
                type:String,
                required:true
            },
            checked:{
                type:Boolean,
                default:false
            },
            created:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            _handleClick:function(){
                this.$emit("click",this.value);
            }
        },
        created:function(){
            if(this.created && this.$parent && this.$parent.$vnode && this.$parent.$vnode.tag && /^vue-component-\d*-mj-radio$/.test(this.$parent.$vnode.tag)){
                this.$parent.radioItemList.push({value:this.value,label:this.label});
            }
        },
        name:"mj-radio-item"
    }
</script>