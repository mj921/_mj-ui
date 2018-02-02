<style></style>
<template>
    <div class="mj-table">
        <div class="mj-table-scrollBar" ref="scrollBar">
            <div class="mj-table-bar" ref="bar" @mousedown="_barMouseDown"></div>
        </div>
        <div ref="tableBg" class="mj-table-bg">
            <table ref="table1" :style="'width:' + tableWidth + 'px'">
                <thead>
                    <tr>
                        <template v-for="column in columnList">
                            <th v-if="column.checkbox" width="60px" ref="th">
                                <mj-checkbox v-model="allChecked"></mj-checkbox>
                            </th>
                            <th v-else :class="'mj-text-' + column.align" :width="column.width">{{column.label}}</th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="data.length <= 0"></template>
                    <template v-else>
                        <tr v-for="(row,i) in data">
                            <template v-for="column in columnList">
                                <td v-if="column.checkbox" :class="'mj-text-' + column.align">
                                    <mj-checkbox v-model="checkedList[i]"></mj-checkbox>
                                </td>
                                <td v-else-if="column.formatter" :class="'mj-text-' + column.align">{{column.formatter(row,row[column.prop])}}</td>
                                <td v-else :class="'mj-text-' + column.align">{{row[column.prop]}}</td>
                            </template>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div v-if="fixedWidth > 0" ref="fixDiv" class="mj-table-fixed" :style="'width:' + fixedWidth + 'px'">
                <table ref="table2" :style="'width:' + fixedWidth + 'px;'">
                    <thead>
                        <tr>
                            <template v-for="column in columnList">
                                <template v-if="column.fixed === 'right'">
                                    <th v-if="column.checkbox" :width="tableBgWidth < tableWidth ? '60px' : (60 / tableWidth * tableBgWidth + 'px')" ref="th">
                                        <mj-checkbox v-model="allChecked"></mj-checkbox>
                                    </th>
                                    <th v-else :class="'mj-text-' + column.align" :width="tableBgWidth < tableWidth ? column.width : (+column.width.replace('px','') / tableWidth * tableBgWidth + 'px')">{{column.label}}</th>
                                </template>
                            </template>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="data.length <= 0"></template>
                        <template v-else>
                            <tr v-for="(row,i) in data">
                                <template v-for="column in columnList">
                                    <template v-if="column.fixed === 'right'">
                                        <td v-if="column.checkbox" :class="'mj-text-' + column.align">
                                            <mj-checkbox v-model="checkedList[i]"></mj-checkbox>
                                        </td>
                                        <td v-else-if="column.formatter" :class="'mj-text-' + column.align">{{column.formatter(row,row[column.prop])}}</td>
                                        <td v-else :class="'mj-text-' + column.align">{{row[column.prop]}}</td>
                                    </template>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div ref="load" class="mj-table-loading" v-show="loadNum > 0">
            <div>加载中...</div>
        </div>
        <mj-page :total="total" :pages="pages" :pageCurr="pageCurr" :pageChange="pageChange"></mj-page>
        <slot v-show="false"></slot>
    </div>
</template>
<script>
    import { objCopy } from "../../util.js";
    export default {
        props:{
            data:{//列表数据
                type:Array,
                default:[]
            },
            pages:{//总页数
                type:Number,
                default:0
            },
            "page-curr":{//当前页
                type:Number,
                default:0
            },
            total:{
                type:Number,
                default:0
            },
            "page-change":{//当前页变化触发的方法
                type:Function,
                default:null
            },
            "load-num":{//加载层数
                type:Number,
                default:0
            }
        },
        data:function(){
            return {
                checkedList:[],//每一行的选中状态数组
                checkedflagList:[],//checkbox是否可选择数组
                columnList:[],
                checkboxFlag:false,//是否已有选择框列
                filterCheckbox:function(){return false;},
                tableBgWidth:0
            }
        },
        methods:{
            objCopy,
            _barMouseDown:function(e){
                e = e || window.event;
                if(e.pageX){
                    var x = e.pageX;
                }else{
                    var x = e.clientX;
                }
                var bar = this.$refs.bar;
                var scrollBar = this.$refs.scrollBar;
                var tableBg = this.$refs.tableBg;
                var table1 = this.$refs.table1;
                var left = +bar.style.left.replace(/[a-z]/g,"");
                var self = this;
                document.onmousemove = function(e){
                    if(e.pageX){
                        var x1 = e.pageX - x;
                    }else{
                        var x1 = e.clientX - x;
                    }
                    if(left + x1 < 0){
                        bar.style.left = "0px";
                        tableBg.scrollLeft = 0;
                    }else if(left + x1 > tableBg.offsetWidth - bar.offsetWidth){
                        bar.style.left = tableBg.offsetWidth - bar.offsetWidth + "px";
                        tableBg.scrollLeft = self.tableWidth - tableBg.offsetWidth;
                    }else{
                        bar.style.left = left + x1 + "px";
                        tableBg.scrollLeft = (self.tableWidth - tableBg.offsetWidth) * (left + x1) / (tableBg.offsetWidth - bar.offsetWidth);
                    }
                }
                document.onmouseup = function(e){
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
        },
        watch:{
            data:function(){
                var checkedList = [];
                //选择框默认全不选
                for(var i = 0,len = this.data.length;i < len;i++){
                    checkedList[i] = this._filterCheckbox(this.data[i]);
                }
                this.checkedList = checkedList;
            },
            checkboxFlag:function(){
                var checkedList = [];
                //选择框默认全不选
                for(var i = 0,len = this.data.length;i < len;i++){
                    checkedList[i] = this.filterCheckbox(this.data[i]);
                }
                this.checkedList = checkedList;
            }
        },
        updated:function(){
            if(this.$refs.tableBg){
                this.$refs.tableBg.scrollLeft = 0;
                if(this.$refs.load && this.$refs.th){//设置加载层样式
                    this.$refs.load.style.height = this.$refs.tableBg.offsetHeight - this.$refs.th.offsetHeight + "px";
                    this.$refs.load.style.top = this.$refs.th.offsetHeight + 10 + "px";
                }
            }
            if(this.$refs.bar && this.$refs.tableBg && this.$refs.table1){
                this.$refs.scrollBar.style.width = this.$refs.tableBg.offsetWidth + "px";
                this.$refs.bar.style.width = this.$refs.tableBg.offsetWidth / this.tableWidth * this.$refs.tableBg.offsetWidth + "px";
            }
        },
        computed:{
            fixedWidth:function(){
                var fixedWidth = 0;
                for(var i = 0,len = this.columnList.length;i < len;i++){
                    if(this.columnList[i].fixed === "right"){
                        fixedWidth += this.tableBgWidth < this.tableWidth ? +this.columnList[i].width.replace(/px/g,"") : +this.columnList[i].width.replace(/px/g,"") / this.tableWidth * this.tableBgWidth;
                    }
                }
                return fixedWidth;
            },
            tableWidth:function(){
                var tableWidth = 0;
                for(var i = 0,len = this.columnList.length;i < len;i++){
                    tableWidth += +this.columnList[i].width.replace(/px/g,"");
                }
                return tableWidth;
            },
            //是否全选
            allChecked:{
                get:function(){
                    for(var i = 0,len = this.checkedList.length;i < len;i++){
                        if(!this.checkedList[i]){
                            return false;
                        }
                    }
                    return true;
                },
                set:function(val){
                    var list = []
                    for(var i = 0,len = this.checkedList.length;i < len;i++){
                        list[i] = val;
                    }
                    this.checkedList = list;
                }
            },
            //选中的数据数组
            checkedData:function(){
                var arr = [];
                for(var j = 0,len = this.checkedList.length;j < len;j++){
                    if(this.checkedList[j]){
                        arr[arr.length] = this.data[j];
                    }
                }
                return arr;
            }
        },
        mounted:function(){
            this.tableBgWidth = this.$refs.tableBg.offsetWidth;
            var table2 = this.$refs.table2;
            var fixDiv = this.$refs.fixDiv;
            if(table2){//设置fixed table的宽度
                this.$refs.fixDiv.style.width = this.$refs.table2.offsetWidth + "px";
                table2.style.width = this.tableWidth + "px";
            }
            var bar = this.$refs.bar;
            var scrollBar = this.$refs.scrollBar;
            var tableBg = this.$refs.tableBg;
            var table1 = this.$refs.table1;
            var self = this;
            if(bar && tableBg && table1){
                scrollBar.style.width = tableBg.offsetWidth + "px";
                if(tableBg.offsetWidth >= this.tableWidth){
                    scrollBar.style.display = "none";
                }else{
                    scrollBar.style.display = "block";
                    bar.style.width = tableBg.offsetWidth / this.tableWidth * tableBg.offsetWidth + "px";
                }
            }
            window.addEventListener("resize",function(){
                if(bar && tableBg && table1){
                    scrollBar.style.width = tableBg.offsetWidth + "px";
                    if(tableBg.offsetWidth === self.tableWidth){
                        scrollBar.style.display = "none";
                    }else{
                        scrollBar.style.display = "block";
                        bar.style.width = tableBg.offsetWidth / self.tableWidth * tableBg.offsetWidth + "px";
                    }
                } 
            })
        },
        created:function(){
            this.checkedList = [];
            //选择框默认全不选
            for(var i = 0,len = this.data.length;i < len;i++){
                this.checkedList[i] = false;
            }
        },
        name:"mj-table"
    }
</script>