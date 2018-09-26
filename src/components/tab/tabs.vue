<style></style>
<template>
    <div class="mj-tabs" ref="tab">
        <div class="mj-tabs-titles">
            <dl v-for="(panel, i) in panelList" @click="selectTab(panel.index)" :class="{'curr': currIndex === i}">{{panel.title}}</dl>
        </div>
        <div class="mj-tabs-panels">
            <div 
                class="mj-tabs-panel-list clearfix" 
                :style="'width:' + panelList.length * width + 'px;margin-left:-' + width * currIndex + 'px;-webkit-transition-duration:' + (0.55 + 0.05 * changeIndex) + 's;transition-duration:' + (0.55 + 0.05 * changeIndex) + 's;'">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                changeIndex: 1,
                currIndex: 0,
                panelList: [],
                width: 0
            }
        },
        methods: {
            selectTab (n) {
                if (n !== this.currIndex) {
                    this.changeIndex = Math.abs(this.currIndex - n);
                    this.currIndex = n;
                }
            }
        },
        watch: {
            panelList () {
                for (var i = 0,len = this.panelList.length;i < len;i++) {
                    this.panelList[i].child.width = this.width - 20 + "px";
                }
            }
        },
        mounted () {
            this.width = this.$refs.tab.offsetWidth;
        },
        name: "mj-tabs"
    }
</script>
<style scoped>
    .mj-tabs{
        position: relative;
        width: 100%;
        padding: 40px 0 0;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        background-color: #fff;
    }
    .mj-tabs-titles{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-size: 14px;
        font-weight: bold;
        color:#1f272e;
        zoom:1;
    }
    .mj-tabs-titles:after{
        content: "";
        display: block;
        clear: both;
    }
    .mj-tabs-titles:before{
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1px;
        background-color: #d1dbe5;
        width: 100%;
    }
    .mj-tabs-titles dl{
        position: relative;
        float: left;
        display: inline-block;
        padding: 10px 16px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        height: 40px;
        line-height: 20px;
        cursor: pointer;
    }
    .mj-tabs-titles dl.curr:after{
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #20a0ff;
    }
    .mj-tabs-panels{
        overflow: hidden;
    }
    .mj-tabs-panel-list{
        -webkit-transition: margin-left 0.6s;
        -o-transition: margin-left 0.6s;
        transition: margin-left 0.6s;
    }
</style>