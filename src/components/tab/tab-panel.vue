<style></style>
<template>
    <div class="mj-tab-panel" :style="'width:' + width"><slot></slot></div>
</template>
<script>
    export default {
        data:function(){
            return {
                _index:0,
                width:"100%"
            }
        },
        props:{
            title:{
                type:String,
                default:"标题"
            }
        },
        created:function(){
            if(this.$parent && this.$parent.$vnode && this.$parent.$vnode.tag && /^vue-component-\d*-mj-tab$/.test(this.$parent.$vnode.tag)){
                this._index = this.$parent.panelList.length;
                this.$parent.panelList.push({title:this.title,index:this._index,child:this});
            }
        },
        name:"mj-tab-panel"
    }
</script>
