<!-- Vue.component("mj-tabs",{
    render:function(createElement){
        var titles = [];
        var contents = [];
        for(var i = 0,len = this.$slots.default.length;i < len;i++){
            if(this.$slots.default[i] && this.$slots.default[i].tag && /^vue-component-\d*-mj-tab-panel$/.test(this.$slots.default[i].tag)){
                var title = this.$slots.default[i].componentOptions.propsData.title || "标题";
                titles[titles.length] = createElement("dl",{domProps:{innerText:title},"class":{"curr":titles.length === this.currIndex},on:{click:this.selectTab(titles.length)}});
                contents[contents.length] = createElement("div",{"class":{"hidden":contents.length !== this.currIndex}},[this.$slots.default[i]]);
            }
        }
        return createElement("div",{"class":"mj-tabs"},[
            createElement("div",{"class":"mj-tabs-titles"},titles),
            createElement("div",{"class":"mj-tabs-panels"},contents),
        ])
    },
}) -->
<style></style>
<template>
    <div class="mj-tabs" ref="tab">
        <div class="mj-tabs-titles">
            <dl v-for="panel in panelList" @click="selectTab(panel.index)">{{panel.title}}</dl>
        </div>
        <div class="mj-tabs-panels">
            <div class="mj-tabs-panel-list clearfix" :style="'width:' + panelList.length * width + 'px;margin-left:-' + width * currIndex + 'px;-webkit-transition-duration:' + (0.55 + 0.05 * changeIndex) + 's;transition-duration:' + (0.55 + 0.05 * changeIndex) + 's;'">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                changeIndex:1,
                currIndex:0,
                panelList:[],
                width:0
            }
        },
        methods:{
            selectTab:function(n){
                if(n !== this.currIndex){
                    this.changeIndex = Math.abs(this.currIndex - n);
                    this.currIndex = n;
                }
            }
        },
        watch:{
            panelList:function(){
                for(var i = 0,len = this.panelList.length;i < len;i++){
                    this.panelList[i].child.width = this.width - 20 + "px";
                }
            }
        },
        mounted:function(){
            this.width = this.$refs.tab.offsetWidth;
        },
        name:"mj-tab"
    }
</script>