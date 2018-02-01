<!-- Vue.component("mj-table",{
    render:function(createElement){
        var defSlots = this.$slots.default;
        var tableColumns = []//表格列数组
        var ths = [];
        var fixedThs = [];
        var tableProps = [];//表格列的参数名数组
        var tableWidth = 0;
        var fixedWidth = 0;
        for(var i = 0,len = defSlots.length;i < len;i++){
            if(defSlots[i].tag && /^vue-component-\d*-mj-table-column$/.test(defSlots[i].tag)){
                tableColumns[tableColumns.length] = defSlots[i];
                var propsData = defSlots[i].componentOptions.propsData;
                var style = {};
                if(/^[left|center|right]$/.test(propsData.align)){
                    style.textAlign = propsData.align;
                }else{
                    style.textAlign = "center";
                }
                if(propsData.minWidth && /^\d*px$/.test(propsData.minWidth)){
                    style.minWidth = propsData.minWidth;
                }
                if(propsData.fixed === "right"){//判断该列是否悬浮
                    fixedWidth += propsData.width ? +propsData.width.replace(/px/g,"") + 20 : 100;
                }
                var thAttrs = {width:propsData.width || "80px"}
                tableWidth += propsData.width ? +propsData.width.replace(/px/g,"") + 20 : 100;
                if(defSlots[i].componentOptions.propsData.checkbox){
                    ths[ths.length] = createElement("th",{ref:"th",attrs:{width:"60px"}},[createElement("mj-checkbox",{props:{value:this.allChecked},style:{paddingTop:"3px"},on:{click:this._clickAllCheckbox}})]);
                    fixedThs[fixedThs.length] = createElement("th",{attrs:{width:"60px"}},[createElement("mj-checkbox",{props:{value:this.allChecked},style:{paddingTop:"3px"},on:{click:this._clickAllCheckbox}})]);
                }else{
                    ths[ths.length] = createElement("th",{ref:"th",style:style,domProps:{innerHTML:propsData.label},attrs:thAttrs});
                    if(i === len - 1){
                        fixedThs[fixedThs.length] = createElement("th",{ref:"lastTh",style:style,domProps:{innerHTML:propsData.label},attrs:thAttrs});
                    }else{
                        fixedThs[fixedThs.length] = createElement("th",{style:style,domProps:{innerHTML:propsData.label},attrs:thAttrs});
                    }
                }
                tableProps[tableProps.length] = propsData.prop;
            }
        }
        var trs = [];//tr数组
        var fixedTrs = [];
        var tem;
        var fixedTem;
        if(this.data.length > 0){//判断是否有数据
            var checkedflagList = [];
            for(var i = 0,len = this.data.length;i < len;i++){
                var tds = [];
                var fixedTds = [];
                var rowData = this.data[i];
                rowData.$index = i;
                for(var j = 0,len1 = tableProps.length;j < len1;j++){
                    if(tableColumns[j].componentOptions.propsData.checkbox){//判断是否是选择框列
                        if(tableColumns[j].componentOptions.propsData.filterCheckbox){//判断是否有checkbox过滤方法
                            var f = tableColumns[j].componentOptions.propsData.filterCheckbox(rowData);
                            if(f === false || !f || f === "false"){
                                f = false;
                            }else{
                                f = true;
                            }
                            checkedflagList[i] = f;
                            tds[tds.length] = createElement("td",[createElement("mj-checkbox",{props:{value:this.checkedList[i],disabled:f},style:{paddingTop:"3px"},on:{click:this._clickCheckbox(i)}})]);
                            fixedTds[fixedTds.length] = createElement("td",[createElement("mj-checkbox",{props:{value:this.checkedList[i]},style:{paddingTop:"3px"},on:{click:this._clickCheckbox(i)}})]);
                        }else{
                            checkedflagList[i] = false;
                            tds[tds.length] = createElement("td",[createElement("mj-checkbox",{props:{value:this.checkedList[i]},style:{paddingTop:"3px"},on:{click:this._clickCheckbox(i)}})]);
                            fixedTds[fixedTds.length] = createElement("td",[createElement("mj-checkbox",{props:{value:this.checkedList[i]},style:{paddingTop:"3px"},on:{click:this._clickCheckbox(i)}})]);
                        }
                    }else if(tableColumns[j].data.scopedSlots){//判断是否是scoped列
                        tem = tableColumns[j].data.scopedSlots.default(rowData);
                        fixedTem = tableColumns[j].data.scopedSlots.default(rowData);
                        tds[tds.length] = createElement("td",tem);
                        fixedTds[fixedTds.length] = createElement("td",fixedTem);
                    }else{
                        if(tableColumns[j].componentOptions.propsData.formatter){
                            var d = tableColumns[j].componentOptions.propsData.formatter(rowData);
                            tds[tds.length] = createElement("td",{domProps:{innerHTML:d}});
                            fixedTds[fixedTds.length] = createElement("td",{domProps:{innerHTML:d}});
                        }else{
                            tds[tds.length] = createElement("td",{domProps:{innerHTML:rowData[tableProps[j]] === undefined ? "" : rowData[tableProps[j]]}});
                            fixedTds[fixedTds.length] = createElement("td",{domProps:{innerHTML:rowData[tableProps[j]] === undefined ? "" : rowData[tableProps[j]]}});
                        }
                    }
                }
                trs[i] = createElement("tr",tds);
                fixedTrs[i] = createElement("tr",fixedTds);
            }
            this.checkedflagList = checkedflagList;
        }else{
            trs[0] = createElement("tr",[
                createElement("td",{domProps:{innerText:"暂无数据"},style:{lineHeight:"4em"},attrs:{colspan:tableColumns.length}})
            ]);
            fixedTrs[0] = createElement("tr",[
                createElement("td",{domProps:{innerText:"暂无数据"},style:{lineHeight:"4em"},attrs:{colspan:tableColumns.length}})
            ]);
        }
        var divClass = {
            "mj-table":true
        }
        if(fixedWidth > 0){
            var fixedTable = createElement("div",{ref:"fixDiv","class":"mj-table-fixed",style:{width:fixedWidth + "px",overflow:"hidden",top:"10px"}},[
                        createElement("table",{ref:"table2",style:{width:tableWidth + "px",float:"right"}},[
                            createElement("thead",[
                                    createElement("tr",fixedThs)
                                ]),
                            createElement("tbody",fixedTrs)
                        ])
                    ])
        }else{
            var fixedTable = [];
        }
        if(this.loadNum > 0){//判断加载层数是否大于0 大于0则显示加载层
            var loadDiv = createElement("div",{ref:"load","class":"mj-table-loading"},[createElement("div",{domProps:{innerText:"加载中..."}})]);
        }else{
            var loadDiv = [];
        }
        var scrollBar = createElement("div",{"class":"mj-table-scrollBar",ref:"scrollBar"},[
                createElement("div", {"class":"mj-table-bar",ref:"bar",on:{mousedown:this._barMouseDown}})
            ])
        return createElement("div",{"class":divClass},[
                scrollBar,
                createElement("div",{ref:"tableBg",style:{width:"100%",overflow:"hidden",scrollLeft:"0"}},[
                    createElement("table",{ref:"table1",style:{width:tableWidth + "px"}},[
                        createElement("thead",[
                            createElement("tr",ths)
                        ]),
                        createElement("tbody",trs)
                    ]),
                    fixedTable
                ]),
                loadDiv,
                createElement("mj-page",{props:{total:this.total,pages:this.pages,pageCurr:this.pageCurr,pageChange:this.pageChange}})
            ])
    },
}) -->
<style></style>
<template>
    <div class="mj-table">
        <div class="mj-table-scrollBar" ref="scrollBar">
            <div class="mj-table-bar" ref="bar" @mousedown="_barMouseDown"></div>
        </div>
        <div ref="tableBg" class="mj-table-bg">
            <table ref="table1" style="">
                <thead>
                    <tr>
                        <template v-for="column in columnList">
                            <th v-if="column.checkbox" width="60px" ref="th">
                                <!-- <mj-checkbox></mj-checkbox> -->
                            </th>
                            <th v-else :class="'mj-text-' + column.align" :width="column.width">{{column.label}}</th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="data.length <= 0"></template>
                    <template v-else>
                        <tr v-for="row in data">
                            <template v-for="column in columnList">
                                <td v-if="column.checkbox"></td>
                                <td v-else-if="column.formatter" :class="'mj-text-' + column.align">{{column.formatter(row,row[prop])}}</td>
                                <td v-else :class="'mj-text-' + column.align">{{row[column.prop]}}</td>
                            </template>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div ref="load" class="mj-table-loading" v-show="loadNum > 0">
            <div>加载中...</div>
        </div>
        <mj-page :total="total" :pages="pages" :pageCurr="pageCurr" :pageChange="pageChange"></mj-page>
        <slot v-show="false"></slot>
    </div>
</template>
<script>
    import Page from "../page/page.vue";

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
            "page-change":Function,//当前页变化触发的方法
            "load-num":{//加载层数
                type:Number,
                default:0
            }
        },
        data:function(){
            return {
                checkedList:[],//每一行的选中状态数组
                checkedData:[],//选中的数据数组
                allChecked:false,//全选状态
                checkedflagList:[],//checkbox是否可选择数组
                columnList:[],
            }
        },
        methods:{
            //选择框选择方法
            _clickCheckbox:function(i){
                var self = this;
                return function(){
                    self.checkedList[i] = !self.checkedList[i];
                    self.checkedData = [];
                    for(var j = 0,len = self.checkedList.length;j < len;j++){
                        if(self.checkedList[j]){
                            self.checkedData[self.checkedData.length] = self.data[j];
                        }
                    }
                    self.checkedList = objCopy(self.checkedList);
                }
            },
            //全选框选择方法
            _clickAllCheckbox:function(){
                this.allChecked = !this.allChecked;
            },
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
                        tableBg.scrollLeft = table1.offsetWidth - tableBg.offsetWidth;
                    }else{
                        bar.style.left = left + x1 + "px";
                        tableBg.scrollLeft = (table1.offsetWidth - tableBg.offsetWidth) * (left + x1) / (tableBg.offsetWidth - bar.offsetWidth);
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
                this.allChecked = false;
                this.checkedData = [];
                for(var i = 0,len = this.data.length;i < len;i++){
                    if(!this.checkedflagList[i]){
                        this.checkedList[i] = false;
                    }
                }
                this.checkedList = objCopy(this.checkedList);
            },
            allChecked:function(){
                this.checkedData = [];
                for(var i = 0,len = this.data.length;i < len;i++){
                    if(!this.checkedflagList[i]){
                        this.checkedList[i] = this.allChecked;
                        if(this.allChecked){
                            this.checkedData[this.checkedData.length] = this.data[i];
                        }
                    }
                }
                this.checkedList = objCopy(this.checkedList);
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
            if(this.$refs.table2){//设置fixed table的宽度
                this.$refs.fixDiv.style.width = this.$refs.lastTh.offsetWidth + "px";
                this.$refs.table2.style.width = this.$refs.table1.offsetWidth + "px";
            }
            if(this.$refs.bar && this.$refs.tableBg && this.$refs.table1){
                this.$refs.scrollBar.style.width = this.$refs.tableBg.offsetWidth + "px";
                this.$refs.bar.style.width = this.$refs.tableBg.offsetWidth / this.$refs.table1.offsetWidth * this.$refs.tableBg.offsetWidth + "px";
            }
        },
        mounted:function(){
            var table2 = this.$refs.table2;
            var fixDiv = this.$refs.fixDiv;
            if(table2){//设置fixed table的宽度
                this.$refs.fixDiv.style.width = this.$refs.lastTh.offsetWidth + "px";
                table2.style.width = this.$refs.table1.offsetWidth + "px";
            }
            var bar = this.$refs.bar;
            var scrollBar = this.$refs.scrollBar;
            var tableBg = this.$refs.tableBg;
            var table1 = this.$refs.table1;
            if(bar && tableBg && table1){
                scrollBar.style.width = tableBg.offsetWidth + "px";
                if(tableBg.offsetWidth === table1.offsetWidth){
                    scrollBar.style.display = "none";
                }else{
                    scrollBar.style.display = "block";
                    bar.style.width = tableBg.offsetWidth / table1.offsetWidth * tableBg.offsetWidth + "px";
                }
            }
            window.addEventListener("resize",function(){
                if(bar && tableBg && table1){
                    scrollBar.style.width = tableBg.offsetWidth + "px";
                    if(tableBg.offsetWidth === table1.offsetWidth){
                        scrollBar.style.display = "none";
                    }else{
                        scrollBar.style.display = "block";
                        bar.style.width = tableBg.offsetWidth / table1.offsetWidth * tableBg.offsetWidth + "px";
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