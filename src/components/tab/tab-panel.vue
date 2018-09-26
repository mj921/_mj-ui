<style></style>
<template>
    <div class="mj-tab-panel" :style="'width:' + width"><slot></slot></div>
</template>
<script>
    export default {
        data () {
            return {
                _index : 0,
                width: "100%",
                parent: null
            }
        },
        props: {
            title: {
                type: String,
                default: "标题"
            }
        },
        created () {
            if (this.$parent && this.$parent.$options && this.$parent.$options._componentTag === "mj-tabs") {
                this.parent = this.$parent;
                this._index = this.$parent.panelList.length;
                this.$parent.panelList.push({title:this.title,index:this._index,child:this});
            }
        },
        name: "mj-tab-panel"
    }
</script>
<style scoped>
    .mj-tab-panel{
        float: left;
        padding: 10px;
    }
</style>
