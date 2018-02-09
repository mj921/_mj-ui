if(top != this){
    document.onkeydown = function(e){
        if(e.keyCode === 116){
            e.preventDefault();
            this.location.reload()
        }
    }
}
// Vue.component("mj-table",{
//     render:function(createElement){
//         var defSlots = this.$slots.default;
//         var tableColumns = []//表格列数组
//         var ths = [];
//         var fixedThs = [];
//         var tableProps = [];//表格列的参数名数组
//         var tableWidth = 0;
//         var fixedWidth = 0;
//         for(var i = 0,len = defSlots.length;i < len;i++){
//             if(defSlots[i].tag && /^vue-component-\d*-mj-table-column$/.test(defSlots[i].tag)){
//                 tableColumns[tableColumns.length] = defSlots[i];
//                 var propsData = defSlots[i].componentOptions.propsData;
//                 var style = {};
//                 if(/^[left|center|right]$/.test(propsData.align)){
//                     style.textAlign = propsData.align;
//                 }else{
//                     style.textAlign = "center";
//                 }
//                 if(propsData.minWidth && /^\d*px$/.test(propsData.minWidth)){
//                     style.minWidth = propsData.minWidth;
//                 }
//                 if(propsData.fixed === "right"){//判断该列是否悬浮
//                     fixedWidth += propsData.width ? +propsData.width.replace(/px/g,"") + 20 : 100;
//                 }
//                 var thAttrs = {width:propsData.width || "80px"}
//                 tableWidth += propsData.width ? +propsData.width.replace(/px/g,"") + 20 : 100;
//                 if(defSlots[i].componentOptions.propsData.checkbox){
//                     ths[ths.length] = createElement("th",{ref:"th",attrs:{width:"60px"}},[createElement("mj-checkbox",{props:{value:this.allChecked},style:{paddingTop:"3px"},on:{click:this._clickAllCheckbox}})]);
//                     fixedThs[fixedThs.length] = createElement("th",{attrs:{width:"60px"}},[createElement("mj-checkbox",{props:{value:this.allChecked},style:{paddingTop:"3px"},on:{click:this._clickAllCheckbox}})]);
//                 }else{
//                     ths[ths.length] = createElement("th",{ref:"th",style:style,domProps:{innerHTML:propsData.label},attrs:thAttrs});
//                     if(i === len - 1){
//                         fixedThs[fixedThs.length] = createElement("th",{ref:"lastTh",style:style,domProps:{innerHTML:propsData.label},attrs:thAttrs});
//                     }else{
//                         fixedThs[fixedThs.length] = createElement("th",{style:style,domProps:{innerHTML:propsData.label},attrs:thAttrs});
//                     }
//                 }
//                 tableProps[tableProps.length] = propsData.prop;
//             }
//         }
//         var trs = [];//tr数组
//         var fixedTrs = [];
//         var tem;
//         var fixedTem;
//         if(this.data.length > 0){//判断是否有数据
//             var checkedflagList = [];
//             for(var i = 0,len = this.data.length;i < len;i++){
//                 var tds = [];
//                 var fixedTds = [];
//                 var rowData = this.data[i];
//                 rowData.$index = i;
//                 for(var j = 0,len1 = tableProps.length;j < len1;j++){
//                     if(tableColumns[j].componentOptions.propsData.checkbox){//判断是否是选择框列
//                         if(tableColumns[j].componentOptions.propsData.filterCheckbox){//判断是否有checkbox过滤方法
//                             var f = tableColumns[j].componentOptions.propsData.filterCheckbox(rowData);
//                             if(f === false || !f || f === "false"){
//                                 f = false;
//                             }else{
//                                 f = true;
//                             }
//                             checkedflagList[i] = f;
//                             tds[tds.length] = createElement("td",[createElement("mj-checkbox",{props:{value:this.checkedList[i],disabled:f},style:{paddingTop:"3px"},on:{click:this._clickCheckbox(i)}})]);
//                             fixedTds[fixedTds.length] = createElement("td",[createElement("mj-checkbox",{props:{value:this.checkedList[i]},style:{paddingTop:"3px"},on:{click:this._clickCheckbox(i)}})]);
//                         }else{
//                             checkedflagList[i] = false;
//                             tds[tds.length] = createElement("td",[createElement("mj-checkbox",{props:{value:this.checkedList[i]},style:{paddingTop:"3px"},on:{click:this._clickCheckbox(i)}})]);
//                             fixedTds[fixedTds.length] = createElement("td",[createElement("mj-checkbox",{props:{value:this.checkedList[i]},style:{paddingTop:"3px"},on:{click:this._clickCheckbox(i)}})]);
//                         }
//                     }else if(tableColumns[j].data.scopedSlots){//判断是否是scoped列
//                         tem = tableColumns[j].data.scopedSlots.default(rowData);
//                         fixedTem = tableColumns[j].data.scopedSlots.default(rowData);
//                         tds[tds.length] = createElement("td",tem);
//                         fixedTds[fixedTds.length] = createElement("td",fixedTem);
//                     }else{
//                         if(tableColumns[j].componentOptions.propsData.formatter){
//                             var d = tableColumns[j].componentOptions.propsData.formatter(rowData);
//                             tds[tds.length] = createElement("td",{domProps:{innerHTML:d}});
//                             fixedTds[fixedTds.length] = createElement("td",{domProps:{innerHTML:d}});
//                         }else{
//                             tds[tds.length] = createElement("td",{domProps:{innerHTML:rowData[tableProps[j]] === undefined ? "" : rowData[tableProps[j]]}});
//                             fixedTds[fixedTds.length] = createElement("td",{domProps:{innerHTML:rowData[tableProps[j]] === undefined ? "" : rowData[tableProps[j]]}});
//                         }
//                     }
//                 }
//                 trs[i] = createElement("tr",tds);
//                 fixedTrs[i] = createElement("tr",fixedTds);
//             }
//             this.checkedflagList = checkedflagList;
//         }else{
//             trs[0] = createElement("tr",[
//                 createElement("td",{domProps:{innerText:"暂无数据"},style:{lineHeight:"4em"},attrs:{colspan:tableColumns.length}})
//             ]);
//             fixedTrs[0] = createElement("tr",[
//                 createElement("td",{domProps:{innerText:"暂无数据"},style:{lineHeight:"4em"},attrs:{colspan:tableColumns.length}})
//             ]);
//         }
//         var divClass = {
//             "mj-table":true
//         }
//         if(fixedWidth > 0){
//             var fixedTable = createElement("div",{ref:"fixDiv","class":"mj-table-fixed",style:{width:fixedWidth + "px",overflow:"hidden",top:"10px"}},[
//                         createElement("table",{ref:"table2",style:{width:tableWidth + "px",float:"right"}},[
//                             createElement("thead",[
//                                     createElement("tr",fixedThs)
//                                 ]),
//                             createElement("tbody",fixedTrs)
//                         ])
//                     ])
//         }else{
//             var fixedTable = [];
//         }
//         if(this.loadNum > 0){//判断加载层数是否大于0 大于0则显示加载层
//             var loadDiv = createElement("div",{ref:"load","class":"mj-table-loading"},[createElement("div",{domProps:{innerText:"加载中..."}})]);
//         }else{
//             var loadDiv = [];
//         }
//         var scrollBar = createElement("div",{"class":"mj-table-scrollBar",ref:"scrollBar"},[
//                 createElement("div", {"class":"mj-table-bar",ref:"bar",on:{mousedown:this._barMouseDown}})
//             ])
//         return createElement("div",{"class":divClass},[
//                 scrollBar,
//                 createElement("div",{ref:"tableBg",style:{width:"100%",overflow:"hidden",scrollLeft:"0"}},[
//                     createElement("table",{ref:"table1",style:{width:tableWidth + "px"}},[
//                         createElement("thead",[
//                             createElement("tr",ths)
//                         ]),
//                         createElement("tbody",trs)
//                     ]),
//                     fixedTable
//                 ]),
//                 loadDiv,
//                 createElement("mj-page",{props:{total:this.total,pages:this.pages,pageCurr:this.pageCurr,pageChange:this.pageChange}})
//             ])
//     },
//     props:{
//         data:{//列表数据
//             type:Array,
//             default:[]
//         },
//         pages:{//总页数
//             type:Number,
//             default:0
//         },
//         "page-curr":{//当前页
//             type:Number,
//             default:0
//         },
//         total:{
//             type:Number,
//             default:0
//         },
//         "page-change":Function,//当前页变化触发的方法
//         "load-num":{//加载层数
//             type:Number,
//             default:0
//         }
//     },
//     data:function(){
//         return {
//             checkedList:[],//每一行的选中状态数组
//             checkedData:[],//选中的数据数组
//             allChecked:false,//全选状态
//             checkedflagList:[]//checkbox是否可选择数组
//         }
//     },
//     methods:{
//         //选择框选择方法
//         _clickCheckbox:function(i){
//             var self = this;
//             return function(){
//                 self.checkedList[i] = !self.checkedList[i];
//                 self.checkedData = [];
//                 for(var j = 0,len = self.checkedList.length;j < len;j++){
//                     if(self.checkedList[j]){
//                         self.checkedData[self.checkedData.length] = self.data[j];
//                     }
//                 }
//                 self.checkedList = objCopy(self.checkedList);
//             }
//         },
//         //全选框选择方法
//         _clickAllCheckbox:function(){
//             this.allChecked = !this.allChecked;
//         },
//         _barMouseDown:function(e){
//             e = e || window.event;
//             if(e.pageX){
//                 var x = e.pageX;
//             }else{
//                 var x = e.clientX;
//             }
//             var bar = this.$refs.bar;
//             var scrollBar = this.$refs.scrollBar;
//             var tableBg = this.$refs.tableBg;
//             var table1 = this.$refs.table1;
//             var left = +bar.style.left.replace(/[a-z]/g,"");
//             document.onmousemove = function(e){
//                 if(e.pageX){
//                     var x1 = e.pageX - x;
//                 }else{
//                     var x1 = e.clientX - x;
//                 }
//                 if(left + x1 < 0){
//                     bar.style.left = "0px";
//                     tableBg.scrollLeft = 0;
//                 }else if(left + x1 > tableBg.offsetWidth - bar.offsetWidth){
//                     bar.style.left = tableBg.offsetWidth - bar.offsetWidth + "px";
//                     tableBg.scrollLeft = table1.offsetWidth - tableBg.offsetWidth;
//                 }else{
//                     bar.style.left = left + x1 + "px";
//                     tableBg.scrollLeft = (table1.offsetWidth - tableBg.offsetWidth) * (left + x1) / (tableBg.offsetWidth - bar.offsetWidth);
//                 }
//             }
//             document.onmouseup = function(e){
//                 document.onmousemove = null;
//                 document.onmouseup = null;
//             }
//         }
//     },
//     watch:{
//         data:function(){
//             this.allChecked = false;
//             this.checkedData = [];
//             for(var i = 0,len = this.data.length;i < len;i++){
//                 if(!this.checkedflagList[i]){
//                     this.checkedList[i] = false;
//                 }
//             }
//             this.checkedList = objCopy(this.checkedList);
//         },
//         allChecked:function(){
//             this.checkedData = [];
//             for(var i = 0,len = this.data.length;i < len;i++){
//                 if(!this.checkedflagList[i]){
//                     this.checkedList[i] = this.allChecked;
//                     if(this.allChecked){
//                         this.checkedData[this.checkedData.length] = this.data[i];
//                     }
//                 }
//             }
//             this.checkedList = objCopy(this.checkedList);
//         }
//     },
//     updated:function(){
//         if(this.$refs.tableBg){
//             this.$refs.tableBg.scrollLeft = 0;
//             if(this.$refs.load && this.$refs.th){//设置加载层样式
//                 this.$refs.load.style.height = this.$refs.tableBg.offsetHeight - this.$refs.th.offsetHeight + "px";
//                 this.$refs.load.style.top = this.$refs.th.offsetHeight + 10 + "px";
//             }
//         }
//         if(this.$refs.table2){//设置fixed table的宽度
//             this.$refs.fixDiv.style.width = this.$refs.lastTh.offsetWidth + "px";
//             this.$refs.table2.style.width = this.$refs.table1.offsetWidth + "px";
//         }
//         if(this.$refs.bar && this.$refs.tableBg && this.$refs.table1){
//             this.$refs.scrollBar.style.width = this.$refs.tableBg.offsetWidth + "px";
//             this.$refs.bar.style.width = this.$refs.tableBg.offsetWidth / this.$refs.table1.offsetWidth * this.$refs.tableBg.offsetWidth + "px";
//         }
//     },
//     mounted:function(){
//         var table2 = this.$refs.table2;
//         var fixDiv = this.$refs.fixDiv;
//         if(table2){//设置fixed table的宽度
//             this.$refs.fixDiv.style.width = this.$refs.lastTh.offsetWidth + "px";
//             table2.style.width = this.$refs.table1.offsetWidth + "px";
//         }
//         var bar = this.$refs.bar;
//         var scrollBar = this.$refs.scrollBar;
//         var tableBg = this.$refs.tableBg;
//         var table1 = this.$refs.table1;
//         if(bar && tableBg && table1){
//             scrollBar.style.width = tableBg.offsetWidth + "px";
//             if(tableBg.offsetWidth === table1.offsetWidth){
//                 scrollBar.style.display = "none";
//             }else{
//                 scrollBar.style.display = "block";
//                 bar.style.width = tableBg.offsetWidth / table1.offsetWidth * tableBg.offsetWidth + "px";
//             }
//         }
//         window.addEventListener("resize",function(){
//             if(bar && tableBg && table1){
//                 scrollBar.style.width = tableBg.offsetWidth + "px";
//                 if(tableBg.offsetWidth === table1.offsetWidth){
//                     scrollBar.style.display = "none";
//                 }else{
//                     scrollBar.style.display = "block";
//                     bar.style.width = tableBg.offsetWidth / table1.offsetWidth * tableBg.offsetWidth + "px";
//                 }
//             } 
//         })
//     },
//     created:function(){
//         this.checkedList = [];
//         //选择框默认全不选
//         for(var i = 0,len = this.data.length;i < len;i++){
//             this.checkedList[i] = false;
//         }
//     }
// })
//表格列
// Vue.component("mj-table-column",{
//     render:function(createElement){
//         return createElement("div")
//     },
//     props:{
//         prop:String,//列参数名
//         label:String,//列名称
//         width:String,//列宽度
//         "min-width":String,
//         align:String,//列对齐方式
//         fixed:String,//列浮动
//         formatter:Function,//列数据格式化方法
//         checkbox:Boolean,//列是否是选择框
//         "filter-checkbox":Function//选择框是否可选择过滤方法
//     },
// })
//按钮
// Vue.component("mj-button",{
//     render:function(createElement){
//         var disabled = (this.disabled === "" || this.disabled === "disabled" || this.disabled === "true" || this.disabled) && this.disabled !== "false";
//         var divClass = {
//             "mj-button":true,
//             "mj-button-small":this.size === "small",
//             "mj-button-large":this.size === "large",
//             "mj-button-text":this.type === "text",
//             "mj-button-disabled":disabled,
//             "mj-button-danger":this.type === "danger"
//         }
//         var divOn = {
//             click:disabled ? function(){} : this.click
//         }
//         return createElement("div",{"class":divClass,on:divOn},this.$slots.default);
//     },
//     props:{
//         size:String,
//         disabled:String,
//         type:{
//             type:String,
//             default:"default"
//         }
//     },
//     methods:{
//         click:function(e){
//             this.$emit("click",e)
//         }
//     }
// })
// //分页
// Vue.component("mj-page",{
//     render:function(createElement){
//         if(this.pages <= 0){
//             return createElement("div");
//         }else{
//             var prevClass = {
//                 "mj-page-prev":true,
//                 "mj-page-btn":true
//             }
//             var btns = [];
//             if(this.pages <= 7){
//                 for(var i = 1;i <= this.pages;i++){
//                     btns[i] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-current":this.currPage === i},on:{click:this.pageNumClick(i)},domProps:{innerHTML:i}});
//                 }
//             }else{
//                 if(this.currPage <= 4){
//                     for(var i = 1;i <= 6;i++){
//                         btns[i] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-current":this.currPage === i},on:{click:this.pageNumClick(i)},domProps:{innerHTML:i}});
//                     }
//                     btns[btns.length] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-omitted":true},domProps:{innerHTML:"···"}});
//                     btns[btns.length] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-current":this.currPage === this.pages},on:{click:this.pageNumClick(this.pages)},domProps:{innerHTML:this.pages}});
//                 }else if(this.currPage >= this.pages - 3){
//                     btns[btns.length] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-current":this.currPage === 1},on:{click:this.pageNumClick(1)},domProps:{innerHTML:1}});
//                     btns[btns.length] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-omitted":true},domProps:{innerHTML:"···"}});
//                     for(var i = this.pages - 5;i <= this.pages;i++){
//                         btns[i] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-current":this.currPage === i},on:{click:this.pageNumClick(i)},domProps:{innerHTML:i}});
//                     }
//                 }else{
//                     btns[btns.length] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-current":this.currPage === this.pages},on:{click:this.pageNumClick(1)},domProps:{innerHTML:1}});
//                     btns[btns.length] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-omitted":true},domProps:{innerHTML:"···"}});
//                     for(var i = this.currPage - 2;i <= this.currPage + 2;i++){
//                         btns[i] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-current":this.currPage === i},on:{click:this.pageNumClick(i)},domProps:{innerHTML:i}});
//                     }
//                     btns[btns.length] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-omitted":true},domProps:{innerHTML:"···"}});
//                     btns[btns.length] = createElement("div",{"class":{"mj-page-btn":true,"mj-page-current":this.currPage === this.pages},on:{click:this.pageNumClick(this.pages)},domProps:{innerHTML:this.pages}});

//                 }
//             }
//             if(this.total > 0){
//                 var totalDiv = createElement("div",{"class":"mj-page-total",domProps:{innerText:"共" + this.total + "条"}});
//             }else{
//                 var totalDiv = [];
//             }
//             var prevDiv = createElement("div",{"class":prevClass,domProps:{innerHTML:"<<"},on:{click:this.prevFun}});
//             var nextDiv = createElement("div",{"class":prevClass,domProps:{innerHTML:">>"},on:{click:this.nextFun}});
//             var ipt = createElement("div",{"class":"mj-page-ipt"},[
//                     createElement("div",{style:{width:"42px",textAlign:"right"},domProps:{innerHTML:"到第"}}),
//                     createElement("input",{on:{input:this.inputFun,keydown:this.keyDownFun},domProps:{value:this.iptNum}}),
//                     createElement("div",{style:{width:"22px",textAlign:"center"},domProps:{innerHTML:"页"}})
//                 ]);
//             var btn = createElement("div",{"class":"mj-page-yes",domProps:{innerHTML:"确定"},on:{click:this.iptBtnFun}});
//             return createElement("div",{"class":"mj-page"},[
//                     createElement("div",{"class":"mj-page-main"},[
//                         totalDiv,prevDiv,btns,nextDiv,ipt,btn
//                     ])
//                 ]);
//         }
//     },
//     data:function(){
//         return {
//             currPage:0,
//             iptNum:""
//         }
//     },
//     props:{
//         pages:{
//             type:Number,
//             default:0
//         },
//         "page-curr":{
//             type:Number,
//             default:0
//         },
//         "page-change":Function,
//         total:{
//             type:Number,
//             default:0
//         }
//     },
//     methods:{
//         //页面数字按钮点击事件
//         pageNumClick:function(num){
//             var self = this;
//             return function(){
//                 self.currPage = num;
//                 self.pageChange && self.pageChange(self.currPage);
//             }
//         },
//         //翻页确定按钮方法
//         iptBtnFun:function(){
//             if(this.iptNum){
//                 this.iptNum = +this.iptNum
//             }else{
//                 return;
//             }
//             if(this.iptNum > this.pages){
//                 this.iptNum = this.pages;
//             }
//             if(this.iptNum < 1){
//                 this.iptNum = 1;
//             }
//             this.currPage = this.iptNum;
//             this.pageChange && this.pageChange(this.currPage);
//         },
//         //翻页输入框输入事件
//         inputFun:function(event){
//             if(!/^\d+$/.test(event.target.value)){
//                 event.target.value = event.target.value.replace(/[^\d]/g,"");
//             }
//             this.iptNum = event.target.value;
//         },
//         keyDownFun:function(event){
//             if(event.keyCode === 13){
//                 this.iptBtnFun();
//             }
//         },
//         //上一页
//         prevFun:function(){
//             if(this.currPage > 1){
//                 this.currPage--;
//                 this.pageChange && this.pageChange(this.currPage);
//             }
//         },
//         //下一页
//         nextFun:function(){
//             if(this.currPage < this.pages){
//                 this.currPage++;
//                 this.pageChange && this.pageChange(this.currPage);
//             }
//         },
//     },
//     watch:{
//         currPage:function(newP,oldP){
//             // oldP !== 0 && this.pageChange && this.pageChange(this.currPage);
//         },
//         pageCurr:function(){
//                 this.currPage = this.pageCurr;
//         },
//         pages:function(){
//             if(this.pageCurr < 0 || this.pages <= 0){
//                 this.currPage = 0;
//             }else if(this.pageCurr > this.pages){
//                 this.currPage = this.pages;
//             }else{
//                 this.currPage = this.pageCurr;
//             }
//         }
//     },
//     created:function(){
//         if(this.pageCurr < 0 || this.pages <= 0){
//             this.currPage = 0;
//         }else if(this.pageCurr > this.pages){
//             this.currPage = this.pages;
//         }else{
//             this.currPage = this.pageCurr;
//         }
//     }
// })
// Vue.component("mj-row",{
//     template:"<div class='mj-row'><slot></slot></div>"
// });
// Vue.component("mj-col",{
//     render:function(createElement){
//         return createElement("div",{"class":"mj-col mj-col" + (this.span || 24),style:{textAlign:this.align}},this.$slots.default);
//     },
//     props:{
//         span:Number,
//         align:String
//     }
// });
// Vue.component("mj-input",{
//     template:"<div class='mj-input'>" + 
//                 "<input ref='ipt' spellcheck='false' :value='currValue' :placeholder='placeholder' :type='type' :disabled='disabled' :readonly='readonly' @input='_handleInput' @focus='_handleFocus' @blur='_handleBlur' @change='_handleChange' />" +
//                 "<div class='mj-input-append' v-if='$slots.append && this.$slots.append.length > 0'><slot name='append'></slot></div>" +
//             "</div>",
//     data:function(){
//         return{
//             inputObj:null,
//             currValue:""
//         }
//     },
//     props:{
//         value:{
//             validator:function(value){
//                 return true;
//             }
//         },
//         disabled:{
//             validator:function(value){
//                 return typeof value === "string" || typeof value === "boolean";
//             }
//         },
//         placeholder:String,
//         type:{
//             type:String,
//             default:"text"
//         },
//         readonly:String,
//         input:Function
//     },
//     methods:{
//         _handleInput:function(e){
//             this.input && this.input(e);
//             this.$emit("input",e.target.value);
//         },
//         _handleFocus:function(e){
//             this.$parent && this.$parent.validate && this.$parent.validate(null,"focus");
//             this.$emit("focus");
//         },
//         _handleBlur:function(e){
//             this.$parent && this.$parent.validate && this.$parent.validate(null,"blur");
//             this.$emit("blur");
//         },
//         _handleChange:function(e){
//             this.$emit("change");
//         }
//     },
//     watch:{
//         value:function(){
//             this.currValue = this.value;
//             this.$emit("change");
//         }
//     },
//     created:function(){
//         this.currValue = this.value;
//     },
//     mounted:function(){
//         this.inputObj = this.$refs.ipt;
//     },
// })
// Vue.component("mj-select-item",{
//     render:function(createElement){
//         return createElement("dl",{"class":{"mj-select-item":true,"hidden":!this.showFlag},on:{click:this._handleClick},domProps:{innerText:this.label || this.value}})
//     },
//     props:{
//         label:String,
//         value:{
//             required:true
//         },
//         showFlag:{
//             type:Boolean,
//             default:true
//         }
//     },
//     methods:{
//         _handleClick:function(){
//             if(this.$parent && this.$parent._selectValue){
//                 this.$parent._selectValue(this.value,this.label || this.value);
//             }
//         },
//         setShowFlag:function(showFlag){
//             this.showFlag = showFlag;
//         }
//     }
// })
// Vue.component("mj-select",{
//     render:function(createElement){
//         if(this.$slots.default && (!this.list || this.list.length == 0 || this.$slots.default[0].componentOptions.propsData.label !== this.list[0].label)){
//             var j = 0;
//             this.list.length = 0;
//             for(var i = 0,len = this.$slots.default.length;i < len;i++){
//                 if(this.$slots.default[i] && this.$slots.default[i].tag && /^vue-component-\d*-mj-select-item$/.test(this.$slots.default[i].tag)){
//                     var o = {};
//                     for(var key in this.$slots.default[i].componentOptions.propsData){
//                         o[key] = this.$slots.default[i].componentOptions.propsData[key];
//                     }
//                     for(var key in this.$slots.default[i].data.attrs){
//                         o[key] = this.$slots.default[i].data.attrs[key];
//                     }
//                     o.showFlag = true;
//                     this.list[j++] = o;
//                     if(o.value === this.value){
//                         this.str = o.label || o.value;
//                     }
//                 }
//             }
//         }
//         var childrenList = [];
//         for(var i = 0,len = this.list.length;i < len;i++){
//             if(this.list[i].value === this.value){
//                 this.str = this.list[i].label || this.list[i].value;
//             }
//             childrenList[i] = createElement("mj-select-item",{props:{label:this.list[i].label,value:this.list[i].value,showFlag:this.list[i].showFlag}});
//         }
//         if(this.str === ""){
//             this.str = this.value;
//         }
//         return createElement("div",{"class":"mj-select"},[
//                 createElement("i",{"class":{"mj-select-icon-show":this.isShow,"mj-select-icon-hide":!this.isShow},on:{click:this._handleClick}}),
//                 createElement("input",{ref:"inputRef","class":"mj-select-input",props:{disabled:"disabled"},attrs:{value:this.str,readonly:!this.filterFlag},on:{click:this._handleClick,blur:this._handleBlur,input:this._handleInput}}),
//                 createElement("div",{ref:"list","class":{"mj-select-list":true,"mj-select-show":this.isShow},on:{click:this._handleScroll}},childrenList)
//             ])
//     },
//     props:{
//         value:{
//             validator: function (value) {
//                 return true;
//             },
//             default:""
//         },
//         filterFlag:{
//             type:Boolean,
//             default:false
//         },
//     },
//     data:function(){
//         return {
//             list:[],
//             childrenList:[],
//             width:120,
//             isShow:true,
//             str:"",
//             selected:{}
//         }
//     },
//     methods:{
//         _handleScroll:function(e){
//             e.preventDefault();
//         },
//         _handleClick:function(e){
//             this.isShow = !this.isShow;
//         },
//         _handleBlur:function(e){
//             this.$refs.inputRef.value = this.str;
//         },
//         _handleInput:function(e){
//             var list = [];
//             this.isShow = true;
//             for(var i = 0,len = this.list.length;i < len;i++){
//                 list[i] = this.list[i];
//                 list[i].showFlag = this.list[i].label.indexOf(this.$refs.inputRef.value) > -1;
//             }
//             this.list = list;
//         },
//         _selectValue:function(value,str){
//             this.isShow = false;
//             this.$emit("input",value);
//             var list = [];
//             this.isShow = true;
//             if(this.filterFlag){
//                 for(var i = 0,len = this.list.length;i < len;i++){
//                     list[i] = this.list[i];
//                     list[i].showFlag = this.list[i].label.indexOf(str) > -1;
//                 }
//                 this.list = list;
//             }
//             this.$parent && this.$parent.validate && this.$parent.validate(null,"change");
//         },
//         _domClick:function(e){
//             if(e.target !== this.$refs.inputRef){
//                 this.isShow = false;
//             }
//         }
//     },
//     watch:{
//         value:function(){
//             var flag = false;
//             var self = this;
//             setTimeout(function(){
//                 for(var i = 0,len = self.list.length;i < len;i++){
//                     if(self.value === self.list[i].value){
//                         self.str = self.list[i].label || self.list[i].value;
//                         self.$refs.inputRef.value = self.str;
//                         flag = true;
//                         self.selected = self.list[i];
//                     }
//                 }
//                 if(!flag){
//                     self.$refs.inputRef.value = self.value;
//                     self.str = "";
//                 }
//                 self.$emit("change");
//             },16)
//         }
//     },
//     mounted:function(){
//         document.addEventListener("click",this._domClick);
//         this.$refs.inputRef.style.minWidth = this.$refs.list.offsetWidth + 2 + "px";
//         this.$refs.list.style.minWidth = this.$refs.list.offsetWidth >= 164 ? this.$refs.list.offsetWidth : 164 + "px";
//         this.isShow = false;
//     },
//     created:function(){
//         if(this.$slots.default){
//             var j = 0;
//             for(var i = 0,len = this.$slots.default.length;i < len;i++){
//                 if(this.$slots.default[i] && this.$slots.default[i].tag && /^vue-component-\d*-mj-select-item$/.test(this.$slots.default[i].tag)){
//                     var o = {};
//                     for(var key in this.$slots.default[i].componentOptions.propsData){
//                         o[key] = this.$slots.default[i].componentOptions.propsData[key];
//                     }
//                     for(var key in this.$slots.default[i].data.attrs){
//                         o[key] = this.$slots.default[i].data.attrs[key];
//                     }
//                     o.showFlag = true;
//                     this.list[j++] = o;
//                     if(o.value === this.value){
//                         this.str = o.label || o.value;
//                     }
//                 }
//             }
//         }
//     }
// })
//文本域
// Vue.component("mj-textarea",{
//     render:function(createElement){
//         return createElement("div",{"class":"mj-textarea"},[
//             createElement("textarea",{ref:"textarea",attrs:{spellcheck:'false',rows:this.rows,readonly:this.readonly,disabled:this.disabled,placeholder:this.placeholder},on:{input:this._handleInput,focus:this._handleFocus,blur:this._handleBlur},domProps:{innerText:this.value || ""}})
//         ])
//     },
//     props:{
//         value:String,
//         rows:{
//             type:Number,
//             default:5
//         },
//         readonly:String,
//         disabled:String,
//         placeholder:String
//     },
//     methods:{
//         _handleInput:function(e){
//             this.$emit("input",e.target.value);
//             this.$refs.textarea.focus();
//         },
//         _handleFocus:function(e){
//             this.$parent && this.$parent.validate && this.$parent.validate(null,"focus");
//             this.$emit("focus");
//         },
//         _handleBlur:function(e){
//             this.$parent && this.$parent.validate && this.$parent.validate(null,"blur");
//             this.$emit("blur");
//         }
//     },
//     watch:{
//         value:function(){
//             this.$refs.textarea.innerText = this.value;
//             this.$refs.textarea.value = this.value;
//         }
//     }
// })
// Vue.component("mj-checkbox-group",{
//     render:function(createElement){
//         return createElement("div",{"class":"mj-checkbox-group"},this.$slots.default)
//     },
//     data:function(){
//         return {
//             values:[]
//         }
//     },
//     methods:{
//         _addValue:function(value){
//             var flag = true;
//             for(var i = 0,len = this.values.length;i < len;i++){
//                 if(this.values[i] === value){
//                     flag = false;
//                     break;
//                 }
//             }
//             if(flag){
//                 this.values.push(value);
//             }
//         },
//         _delValue:function(value){
//             for(var i = 0,len = this.values.length;i < len;i++){
//                 if(this.values[i] === value){
//                     this.values.splice(i,1);
//                     break;
//                 }
//             }
//         }
//     },
// })
//选择框
// Vue.component("mj-checkbox",{
//     render:function(createElement){
//         if(this.label){
//             var labelObj = createElement("label",{domProps:{innerHTML:this.label}})
//         }else{
//             var labelObj = "";
//         }
//         return createElement("div",{"class":{"mj-checkbox":true,"mj-checkbox-disabled":this.disabled && this.disabled !== "false"},on:{click:this.false === false || !this.disabled || this.disabled === "false" ? this._handleClick : function(){}}},[
//                 createElement("div",{"class":{"mj-checkbox-checked":this.currValue}}),
//                 labelObj
//             ])
//     },
//     props:{
//         value:{
//             validator: function (value) {
//                 return typeof value === "boolean" || (typeof value === "number" && (value === 0 || value === 1));
//             },
//             default:false
//         },
//         data:String,
//         label:String,
//         disabled:{
//             validator: function (value) {
//                 return typeof value === "boolean" || typeof value === "string";
//             },
//             default:false
//         },
//     },
//     data:function(){
//         return {
//             currValue:false
//         }
//     },
//     methods:{
//         _handleClick:function(){
//             this.currValue = !this.currValue;
//             if(typeof this.value === "boolean"){
//                 this.$emit("input",this.currValue);
//             }else{
//                 this.$emit("input",this.currValue ? 1 : 0);
//             }
//             this.$emit("click");
//         }
//     },
//     watch:{
//         value:function(){
//             this.currValue = this.value;
//             this.$emit("change");
//         },
//         currValue:function(){
//             if(this.currValue && this.$parent && /^vue-component-\d*-mj-checkbox-group$/.test(this.$parent.$vnode.tag) && this.$parent._addValue){
//                 this.data && this.$parent._addValue(this.data);
//             }else if(!this.currValue && this.$parent && /^vue-component-\d*-mj-checkbox-group$/.test(this.$parent.$vnode.tag) && this.$parent._delValue){
//                 this.data && this.$parent._delValue(this.data);
//             }
//         }
//     },
//     created:function(){
//         if(typeof this.value === "boolean"){
//             this.currValue = this.value;
//         }else if(typeof this.value === "number"){
//             this.currValue = (this.value !== 0);
//         }
//     }
// });
// Vue.component("mj-form-item",{
//     render:function(createElement){
//         var parent = this.$parent;
//         var labelWidth = this.labelWidth === undefined || this.labelWidth === "" ? ((parent.$vnode && parent.$vnode.tag && /^vue-component-\d*-mj-form$/.test(parent.$vnode.tag)) ? parent.labelWidth : undefined) : this.labelWidth;
//         var labelAlign = this.labelAlign || (parent.$vnode && parent.$vnode.tag && /^vue-component-\d*-mj-form$/.test(parent.$vnode.tag)) ? parent.labelAlign : "left";
//         var style = {};
//         if(labelWidth){
//             style.width = labelWidth;
//         }
//         if(labelAlign){
//             style.textAlign = labelAlign;
//         }
//         var pStyle = {minWidth:this.autoWidth ? "auto" : this.size * 272 - 10 + "px"};
//         this.autoWidth ? pStyle.paddingBottom = "0" : null;
//         var isRequired = false;
//         if(this.rule){
//             for(var i = 0,len = this.rule.length;i < len;i++){
//                 if(this.rule[i].required && this.rule[i].required === true){
//                     isRequired = true;
//                 }
//             }
//         }
//         return createElement("div",{"class":{"mj-form-item":true,"mj-form-error":this.isError,"mj-form-item-inline":!!this.inline},style:pStyle},[
//                 createElement("label",{"class":"mj-form-item-label",style:style},[
//                     createElement("span",{"class":{"mj-form-required":this.required !== "false" || isRequired},domProps:{innerHTML:this.label !== undefined ? this.label : ""}})
//                 ]),
//                 createElement("div",{"class":"mj-form-item-content"},[
//                     this.$slots.default,
//                     createElement("div",{"class":{"mj-form-message":true},domProps:{innerHTML:this.message}})
//                 ])
//             ]);
//     },
//     props:{
//         label:String,
//         labelWidth:String,
//         prop:String,
//         rules:Array,
//         inline:String,
//         required:{
//             type:String,
//             default:"false"
//         },
//         size:{
//             type:Number,
//             default:1
//         },
//         "label-align":String,
//         "auto-width":{
//             type:Boolean,
//             default:false
//         }
//     },
//     watch:{
//         prop:function(){
//             this.rule = (this.$parent.rules && this.$parent.rules[this.prop]) || [];
//         }
//     },
//     data:function(){
//         return {
//             isValid:true,
//             isError:false,
//             message:"",
//             style:{},
//             rule:[]
//         }
//     },
//     methods:{
//         validate:function(callback,type,mod,rules){
//             if(!this.isValid){
//                 return true;
//             }
//             if(!this.prop || !this._isNeedValid()){
//                 callback && callback(true);
//                 this.message = "";
//                 this.isError = false;
//                 return true;
//             }
//             if(mod){
//                 var model = mod[this.prop];
//             }else if(this.$parent && this.$parent.model){
//                 var model = this.$parent.model[this.prop];
//             }else{
//                 callback && callback(true);
//                 this.message = "";
//                 this.isError = false;
//                 return true;
//             }
//             if(rules && rules[this.prop]){
//                 for(var i = 0,len = rules[this.prop].length;i < len;i++){
//                     if((!type || type === rules[this.prop][i].trigger) && rules[this.prop][i].required && model === ""){
//                         callback && callback(false);
//                         this.message = rules[this.prop][i].message;
//                         this.isError = true;
//                         return false;
//                     }
//                     if((!type || type === rules[this.prop][i].trigger) && rules[this.prop][i].validator){
//                         var self = this;
//                         var flag = true;
//                         rules[this.prop][i].validator(model,function(message){
//                             if(message && message.length > 0){
//                                 callback && callback(false);
//                                 self.message = message;
//                                 self.isError = true;
//                                 flag = false;
//                             }else{
//                                 flag = false;
//                             }
//                         })
//                         if(!flag){
//                             self.isError = true;
//                             return false;
//                         }
//                     }
//                 }
//             }else{
//                 for(var i = 0,len = this.rule.length;i < len;i++){
//                     if((!type || type === this.rule[i].trigger) && this.rule[i].required && model === ""){
//                         callback && callback(false);
//                         this.message = this.rule[i].message;
//                         this.isError = true;
//                         return false;
//                     }
//                     if((!type || type === this.rule[i].trigger) && this.rule[i].validator){
//                         var self = this;
//                         var flag = true;
//                         this.rule[i].validator(model,function(message){
//                             if(message && message.length > 0){
//                                 callback && callback(false);
//                                 self.message = message;
//                                 self.isError = true;
//                                 flag = false;
//                             }else{
//                                 flag = false;
//                             }
//                         })
//                         if(!flag){
//                             self.isError = true;
//                             return false;
//                         }
//                     }
//                 }
//             }
//             callback && callback(true)
//             this.message = "";
//             this.isError = false;
//             return true;
//         },
//         resetData:function(data){
//             this.isValid = false;
//             for(var i = 0;i < this.$slots.default.length;i++){
//                 if(this.$slots.default[i] && this.$slots.default[i].tag && /^vue-component-\d*-mj-data-picker|vue-component-\d*-mj-input|vue-component-\d*-mj-select|vue-component-\d*-mj-checkbox|vue-component-\d*-mj-textarea$/.test(this.$slots.default[i].tag)){
//                     this.$slots.default[i].componentInstance.$emit("input",data);
//                 }
//             }
//             this.isValid = true;
//         },
//         _isNeedValid:function(){
//             for(var i = 0;i < this.$slots.default.length;i++){
//                 if(this.$slots.default[i] && this.$slots.default[i].tag && /^vue-component-\d*-mj-data-picker|vue-component-\d*-mj-input|vue-component-\d*-mj-select|vue-component-\d*-mj-textarea$/.test(this.$slots.default[i].tag)){
//                     return true;
//                 }
//             }
//             return false;
//         }
//     },
//     created:function(){
//         if(this.rules){
//             this.rule = this.rules;
//         }else{
//             this.rule = (this.$parent.rules && this.$parent.rules[this.prop]) || [];
//         }
//     }
// })
// Vue.component("mj-form",{
//     render:function(createElement){
//         if(this.align === "center" || this.align === "left" || this.align === "right"){
//             var textAlign = this.align;
//         }else{
//             var textAlign = "left";
//         }
//         var children = [];
//         if(this.$slots.default){
//             for(var i = 0,len = this.$slots.default.length;i < len;i++){
//                 if(this.$slots.default[i].tag || this.$slots.default[i].text !== " "){
//                     children[children.length] = this.$slots.default[i];
//                 }
//             }
//         }
//         return createElement("div",{"class":{"mj-form":true,"mj-form-inline-block":!!this.align},style:{textAlign:textAlign}},[createElement("form",{ref:"form","class":{"mj-form-inline":this.inline},attrs:{action:this.action,enctype:this.enctype,method:this.method,target:this.target}},children)])
//     },
//     props:{
//         inline:Boolean,
//         action:String,
//         enctype:String,
//         method:String,
//         target:String,
//         method:String,
//         labelWidth:String,
//         model:Object,
//         rules:{
//             type:Object,
//             default:function(){return {}}
//         },
//         align:String,
//         "label-align":{
//             type:String,
//             default:"left"
//         }
//     },
//     data:function(){
//         return {
//             resetModel:null
//         }
//     },
//     methods:{
//         validatechildren:function(list){
//             var flag = true;
//             for(var i = 0,len = list.length;i < len;i++){
//                 if(list[i].prop && list[i].$vnode && list[i].$vnode.tag && /^vue-component-\d*-mj-form-item$/.test(list[i].$vnode.tag) && list[i].validate && !list[i].validate(null,"",this.model,this.rules)){
//                     flag = false;
//                 }
//                 if(list[i] && list[i].$vnode && list[i].$vnode.child && list[i].$vnode.child.$children && list[i].$vnode.child.$children.length > 0){
//                     if(!this.validatechildren(list[i].$vnode.child.$children)){
//                         flag = false;
//                     }
//                 }
//                 if(list[i] && list[i].child && list[i].child.$children && list[i].$children.length > 0){
//                     if(!this.validatechildren(list[i].child.$children)){
//                         flag = false;
//                     }
//                 }else if(list[i] && list[i].children){
//                     for(var j = 0,length = list[i].children.length;j < length;j++){
//                         if(list[i].children[j] && list[i].children[j].child && list[i].children[j].child.$children && list[i].children[j].child.$children.length > 0){
//                             if(!this.validatechildren(list[i].children[j].child.$children)){
//                                 flag = false;
//                             }
//                         }
//                     }
//                 }
//             }
//             return flag;
//         },
//         validate:function(callback){
//             var flag = true;
//             for(var i = 0,len = this.$slots.default.length;i < len;i++){
//                 if(this.$slots.default[i].componentInstance && this.$slots.default[i].componentInstance.validate && !this.$slots.default[i].componentInstance.validate(null,"",this.model,this.rules)){
//                     flag = false;
//                 }
//                 if(this.$slots.default[i] && this.$slots.default[i].child && this.$slots.default[i].child.$children && this.$slots.default[i].child.$children.length > 0){
//                     if(!this.validatechildren(this.$slots.default[i].child.$children)){
//                         flag = false;
//                     }
//                 }else if(this.$slots.default[i] && this.$slots.default[i].children){
//                     for(var j = 0,length = this.$slots.default[i].children.length;j < length;j++){
//                         if(!!this.$slots.default[i].children[j] && !!this.$slots.default[i].children[j].child && !!this.$slots.default[i].children[j].child.$children && this.$slots.default[i].children[j].child.$children.length > 0){
//                             if(!this.validatechildren(this.$slots.default[i].children[j].child.$children)){
//                                 flag = false;
//                             }
//                         }
//                     }
//                 }
//             }
//             callback && callback(flag);
//             return flag;
//         },
//         resetChildren:function(list){
//             for(var i = 0,len = list.length;i < len;i++){
//                 if(list[i].resetData && list[i].prop && list[i].$vnode && list[i].$vnode.tag && /^vue-component-\d*-mj-form-item$/.test(list[i].$vnode.tag)){
//                     list[i].resetData(this.resetModel[list[i].prop] || "");
//                 }
//                 if(list[i] && list[i].$children && list[i].$children.length > 0){
//                     this.resetChildren(list[i].$children);
//                 }
//             }
//         },
//         resetForm:function(){
//             for(var i = 0,len = this.$slots.default.length;i < len;i++){
//                 if(this.$slots.default[i].componentInstance && this.$slots.default[i].componentInstance.resetData && this.$slots.default[i].componentInstance.prop){
//                     this.$slots.default[i].componentInstance.resetData(this.resetModel[this.$slots.default[i].componentInstance.prop] === undefined ? "" : this.resetModel[this.$slots.default[i].componentInstance.prop]);
//                 }
//                 if(this.$slots.default[i] && this.$slots.default[i].child && this.$slots.default[i].child.$children && this.$slots.default[i].child.$children.length > 0){
//                     this.resetChildren(this.$slots.default[i].child.$children);
//                 }
//             }
//         },
//         submit:function(){
//             this.$refs.form.submit();
//         }
//     },
//     created:function(){
//         if(!this.resetModel){
//             this.resetModel = objCopy(this.model);
//         }
//     }
// })
// Vue.component("mj-dialog",{
//     render:function(createElement){
//         if(this.src && this.value){
//             var currSrc = this.src.indexOf("?") > 0 ? (this.src + "&mjrandomtime=" + this.randomtime) : (this.src + "?mjrandomtime=" + this.randomtime);
//             var bodyObj = createElement("div",{"class":"mj-dialog-body"},[createElement("iframe",{attrs:{src:currSrc}})]);
//         }else{
//             var bodyObj = createElement("div",{"class":"mj-dialog-body"},this.$slots.default);
//         }
//         var mainStyle = {paddingBottom:this.$slots.footer && this.$slots.footer.length > 0 ? "50px" : "0px"};
//         this.width && (mainStyle.width = this.width);
//         this.height && (mainStyle.height = this.height);
//         if(this.$slots.footer && this.$slots.footer.length > 0){
//             var footer = createElement("div",{"class":"mj-dialog-footer"},this.$slots.footer)
//         }else{
//             var footer = [];
//         }
//         return createElement("div",{"class":{"mj-dialog":true,"mj-dialog-hide":!this.value}},[
//                 createElement("div",{"class":"mj-dialog-mask"}),
//                 createElement("div",{style:mainStyle,"class":{"mj-dialog-default":true,"mj-dialog-large":this.size === "large","mj-dialog-full":this.size === "full","mj-dialog-small":this.size === "small","mj-dialog-middle":this.size === "middle"," mj-dialog-iframe":!!this.src}},[
//                     createElement("div",{"class":"mj-dialog-header"},[
//                         createElement("span",{domProps:{innerText:this.title}}),
//                         createElement("div",{"class":"mj-dialog-close",on:{click:this._handleClose}})
//                     ]),
//                     bodyObj,
//                     footer
//                 ])
//             ]);
//     },
//     props:{
//         value:{
//             type:Boolean,
//             default:false
//         },
//         size:String,
//         src:String,
//         title:{
//             type:String,
//             default:"标题"
//         },
//         width:String,
//         height:String,
//         onClose:{
//             type:Function,
//             default:function(){}
//         }
//     },
//     data:function(){
//         return {
//             overflow:"",
//             randomtime:""
//         }
//     },
//     methods:{
//         _handleClose:function(){
//             this.onClose();
//             this.$emit("input",false);
//         }
//     },
//     watch:{
//         value:function(){
//             if(this.size === "full" && this.value){
//                 document.body.style.overflow = "hidden";
//             }else{
//                 document.body.style.overflow = this.overflow;
//             }
//             this.randomtime = new Date().getTime();
//             if(this.value === false){
//                 this.$emit("close")
//             }
//         },
//         src:function(){
//             this.randomtime = new Date().getTime();
//         } 
//     },
//     created:function(){
//         this.overflow = document.body.style.overflow || "auto";
//         this.randomtime = new Date().getTime();
//     }
// })
//日期选择
// Vue.component("mj-data-picker",{
//     render:function(createElement){
//         var list = [];
//         var weekText = ["日","一","二","三","四","五","六"];
//         for(var i = 0;i < 7;i++){
//             list[i] = createElement("dl",{domProps:{innerText:weekText[i]}})
//         }
//         for(var i = 0;i < this.weekDay;i++){
//             list[i + 7] = createElement("dl")
//         }
//         for(var i = 0;i < this.days;i++){
//             var disabledDayFlag = this.year === this.minYear && this.month === this.minMonth && i + 1 < this.minDay || (this.year === this.maxYear && this.month === this.maxMonth && this.maxDay !== -1 && i + 1 > this.maxDay);
//             list[i + 7 + this.weekDay] = createElement("dl",{"class":{"mj-data-current":+this.day === (i + 1),"mj-data-day":true,"mj-data-disabled":disabledDayFlag},domProps:{innerText:this.addZero(i + 1)},on:{click:disabledDayFlag ? function(){} : this._selectDay}})
//         }
//         var yearText = [];
//         yearText[0] = createElement("span",{domProps:{innerText:this.year + "年"},on:{click:this._showYearList}});
//         if(this.type !== "year"){
//             yearText[1] = createElement("span",{domProps:{innerText:this.month + "月"},on:{click:this._showMonthList}});
//         }
//         if(this.type === "time"){
//             var hourList = [];
//             var minuteList = [];
//             var secondList = [];
//             hourList[0] = createElement("li");
//             hourList[1] = createElement("li");
//             minuteList[0] = createElement("li");
//             minuteList[1] = createElement("li");
//             secondList[0] = createElement("li");
//             secondList[1] = createElement("li");
//             for(var i = 0;i < 60;i++){
//                 if(i < 24){
//                     hourList[i + 2] = createElement("li",{"class":{"mj-currtime":this.hour === this.addZero(i)},domProps:{innerText:this.addZero(i)}});
//                 }
//                 minuteList[i + 2] = createElement("li",{"class":{"mj-currtime":this.minute === this.addZero(i)},domProps:{innerText:this.addZero(i)}});
//                 secondList[i + 2] = createElement("li",{"class":{"mj-currtime":this.second === this.addZero(i)},domProps:{innerText:this.addZero(i)}});
//             }
//             hourList[hourList.length] = createElement("li");
//             hourList[hourList.length] = createElement("li");
//             minuteList[minuteList.length] = createElement("li");
//             minuteList[minuteList.length] = createElement("li");
//             secondList[secondList.length] = createElement("li");
//             secondList[secondList.length] = createElement("li");
//             var times = createElement("div",{"class":"mj-data-times"},[
//                 createElement("input",{domProps:{value:this.year + "-" + this.month + "-" + this.day}}),
//                 createElement("input",{domProps:{value:this.hour + ":" + this.minute + ":" + this.second},on:{click:this._timeClick,blur:this._timeBlur},ref:"timeIpt"}),
//                 createElement("div",{"class":{"mj-data-times-main":true,"hidden":this.isTimeHide}},[
//                     createElement("div",{"class":"mj-data-times-list"},[
//                         createElement("div",[
//                             createElement("div",{on:{scroll:this._hourScroll},ref:"hourList"},[
//                                 createElement("ul",hourList)
//                             ]),
//                         ]),
//                         createElement("div",[
//                             createElement("div",{on:{scroll:this._minuteScroll},ref:"minuteList"},[
//                                 createElement("ul",minuteList)
//                             ]),
//                         ]),
//                         createElement("div",[
//                             createElement("div",{on:{scroll:this._secondScroll},ref:"secondList"},[
//                                 createElement("ul",secondList)
//                             ])
//                         ]),
//                     ]),
//                     createElement("div",{"class":"mj-data-times-btns"},[
//                         createElement("div",{domProps:{innerText:"确定"},on:{click:this._hideTimeList}})
//                     ])
//                 ])
//             ]);
//         }else{
//             var times = [];
//         }
//         var yeardls = [];
//         for(var i = 0;i < 10;i++){
//             var disabledYearFlag = this.maxYear !== -1 && this.maxYear < this.yearList[i] || this.yearList[i] < this.minYear;
//             yeardls[i] = createElement("dl",{"class":{"currYear":this.yearList[i] === +this.year,"disabledYear":disabledYearFlag},domProps:{innerText:this.yearList[i]},on:{click:disabledYearFlag ? function(){} : this._yearClick}})
//         }
//         var monthdls = [];
//         for(var i = 0;i < 12;i++){
//             var disabledMonthFlag = this.maxYear === this.year && this.maxMonth < (i + 1) || (this.minYear === this.year && this.minMonth > (i + 1));
//             monthdls[i] = createElement("dl",{"class":{"currYear":(i + 1) === +this.month,"disabledYear":disabledMonthFlag},domProps:{innerText:this.monthList[i]},on:{click:disabledMonthFlag ? function(){} : this._monthClick},attrs:{"data-month":i + 1}})
//         }
//         return createElement("div",{"class":"mj-data-picker",ref:"datePicker"},[
//                 createElement("input",{"class":"mj-data-input",attrs:{value:this.value,readonly:true},on:{blur:this._handleBlur,click:this._handleClick},ref:"input"}),
//                 createElement("i",{"class":"mj-data-icon",on:{click:this._clearClick},ref:"icon"}),
//                 createElement("div",{"class":{"mj-data-main":true,"mj-data-main-bottom":!this.isTop,"hidden":this.isHide,"mj-data-main-top":this.isTop},on:{click:this._stopPropagationFun}},[
//                     times,
//                     createElement("div",{"class":"mj-data-years"},[
//                         createElement("div",{"class":"mj-data-years-btn mj-data-prev-year",on:{click:this.prevYear}},[
//                             createElement("i",{"class":"mj-data-prev"}),
//                             createElement("i",{"class":"mj-data-prev"})
//                         ]),
//                         createElement("div",{"class":"mj-data-years-btn mj-data-prev-month",on:{click:this.prevMonth}},[
//                             createElement("i",{"class":"mj-data-prev"})
//                         ]),
//                         createElement("div",{"class":"mj-data-years-text"},yearText),
//                         createElement("div",{"class":"mj-data-years-btn mj-data-next-month",on:{click:this.nextMonth}},[
//                             createElement("i",{"class":"mj-data-next"})
//                         ]),
//                         createElement("div",{"class":"mj-data-years-btn mj-data-next-year",on:{click:this.nextYear}},[
//                             createElement("i",{"class":"mj-data-next"}),
//                             createElement("i",{"class":"mj-data-next"})
//                         ]),
//                         createElement("div",{"class":{"mj-data-yearList":true,"hidden":this.isMonthHide}},monthdls),
//                         createElement("div",{"class":{"mj-data-yearList":true,"hidden":this.isYearHide}},yeardls)
//                     ]),
//                     createElement("div",{"class":"mj-data-list"},list),
//                     createElement("div",{"class":"mj-data-button"},[
//                         createElement("div",{"class":"mj-data-button-cancle",domProps:{innerText:"取消"},on:{click:this._handleCancle}}),
//                         createElement("div",{"class":"mj-data-button-yes",domProps:{innerText:"确定"},on:{click:this._handleYes}})
//                     ])
//                 ])
//             ]);
//     },
//     props:{
//         value:String,
//         type:{
//             type:String,
//             default:"date"
//         },
//         max:String,
//         min:String
//     },
//     data:function(){
//         return {
//             isHide:true,
//             year:"",
//             month:"",
//             day:"",
//             hour:"",
//             minute:"",
//             second:"",
//             date:null,
//             days:0,
//             weekDay:0,
//             currValue:"",
//             hsto:null,
//             msto:null,
//             ssto:null,
//             isTimeHide:true,
//             isYearHide:true,
//             isMonthHide:true,
//             yearList:[],
//             monthList:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
//             isTop:false,
//             maxYear:-1,
//             maxMonth:-1,
//             maxDay:-1,
//             minYear:-1,
//             minMonth:-1,
//             minDay:-1
//         }
//     },
//     methods:{
//         addZero:function(num){
//             return num > 9 ? num : "0" + num;
//         },
//         checkMaxMonth:function(){
//             if(this.maxMonth !== -1 && this.maxMonth <= this.month){
//                 this.month = this.maxMonth;
//                 if(this.maxDay !== -1 && this.maxDay < this.day){
//                     this.day = this.maxDay;
//                 }
//             }
//         },
//         checkMinMonth:function(){
//             if(this.minMonth !== -1 && this.minMonth >= this.month){
//                 this.month = this.minMonth;
//                 if(this.minDay !== -1 && this.minDay > this.day){
//                     this.day = this.minDay;
//                 }
//             }
//         },
//         checkMaxDay:function(){
//             if(this.maxDay !== -1 && this.maxDay < this.day){
//                 this.day = this.maxDay;
//             }
//         },
//         checkMinDay:function(){
//             if(this.minDay !== -1 && this.minDay > this.day){
//                 this.day = this.minDay;
//             }
//         },
//         prevYear:function(){
//             if(!this.isYearHide){
//                 if(this.yearList[0] > this.minYear){
//                     this._getYearList(this.yearList[0] - 10);
//                 }
//             }else if(this.year > this.minYear){
//                 this.year = +this.year - 1 + "";
//                 this.checkMaxMonth();
//                 this.checkMinMonth();
//             }
//         },
//         prevMonth:function(){
//             if(!this.isYearHide){
//                 if(+this.year % 10 === 0){
//                     if(this.maxYear !== -1 && +this.year + 9 > this.maxYear){
//                         this.year = this.maxYear;
//                     }else{
//                         this.year = +this.year + 9 + "";
//                     }
//                 }else{
//                     if(this.year > this.minYear){
//                         this.year = +this.year - 1 + "";
//                     }
//                 }
//             }else if(!this.isMonthHide){
//                 if(+this.month % 12 === 1){
//                     if(this.maxMonth != -1 && this.year === this.maxYear && +this.month + 11 > this.maxMonth){
//                         this.month = this.maxMonth;
//                     }else{
//                         this.month = this.addZero(+this.month + 11) + "";
//                     }
//                 }else{
//                     if(this.year === this.minYear && this.month > this.minMonth){
//                         this.month = this.addZero(+this.month - 1) + "";
//                     }
//                 }
//             }else if(this.minYear === -1 || this.minYear !== this.year || this.month > this.minMonth){
//                 if(+this.month <= 1){
//                     this.year = +this.year - 1 + "";
//                     this.month = "12";
//                 }else{
//                     this.month = this.addZero(+this.month - 1) + "";
//                 }
//             }
//             this.checkMaxMonth();
//             this.checkMinMonth();
//         },
//         nextYear:function(){
//             if(!this.isYearHide){
//                 if(this.maxYear === -1 || this.yearList[9] < this.maxYear){
//                     this._getYearList(this.yearList[0] + 10);
//                 }
//             }else if(this.maxYear === -1 || this.year < this.maxYear){
//                 this.year = +this.year + 1 + "";
//                 this.checkMaxMonth();
//                 this.checkMinMonth();
//             }
//         },
//         nextMonth:function(){
//             if(!this.isYearHide){
//                 if(+this.year % 10 === 9){
//                     if(+this.year + 9 < this.minYear){
//                         this.year = this.minYear;
//                     }else{
//                         this.year = +this.year - 9 + "";
//                     }
//                 }else if(this.maxYear === -1 || this.year < this.maxYear){
//                     this.year = +this.year + 1 + "";
//                 }
//             }else if(!this.isMonthHide){
//                 if(+this.month % 12 === 0){
//                     if(this.year !== this.minYear || +this.minMonth <= 1){
//                         this.month = this.addZero(+this.month - 11) + "";
//                     }else{
//                         this.month = this.minMonth;
//                     }
//                 }else{
//                     if(this.year !== this.maxYear || +this.maxMonth > this.month){
//                         this.month = this.addZero(+this.month + 1) + "";
//                     }
//                 }
//             }else if(this.maxYear === -1 || this.maxYear !== this.year || this.maxMonth === -1 || this.month < this.maxMonth){
//                 if(+this.month >= 12){
//                     this.year = +this.year + 1 + "";
//                     this.month = "01";
//                 }else{
//                     this.month = this.addZero(+this.month + 1) + "";
//                 }
//             }
//             this.checkMaxMonth();
//             this.checkMinMonth();
//         },
//         _showYearList:function(){
//             if(this.type !== "year"){
//                 this.isYearHide = !this.isYearHide;
//                 if(this.type !== "month"){
//                     this.isMonthHide = true;
//                 }
//             }
//         },
//         _showMonthList:function(){
//             if(this.type !== "month" && this.type !== "year"){
//                 this.isMonthHide = !this.isMonthHide;
//                 this.isYearHide = true;
//             }
//         },
//         _yearClick:function(e){
//             this.year = e.target.innerText;
//             if(this.type !== "year"){
//                 this.isYearHide = true;
//             }
//             this.checkMaxMonth();
//             this.checkMinMonth();
//         },
//         _monthClick:function(e){
//             this.month = this.addZero(e.target.getAttribute("data-month"));
//             if(this.type !== "month"){
//                 this.isMonthHide = true;
//             }
//             this.checkMaxDay();
//             this.checkMinDay();
//         },
//         _hideTimeList:function(){
//             this.isTimeHide = true;
//         },
//         _timeBlur:function(){
//             if(/^([0-1]\d|2[0-4])\:([0-5]\d|60)\:([0-5]\d|60)$/.test(this.$refs.timeIpt.value)){
//                 var arr = this.$refs.timeIpt.value.split(":");
//                 this.hour = arr[0];
//                 this.minute = arr[1];
//                 this.second = arr[2];
//             }
//         },
//         _timeClick:function(){
//             this.isTimeHide = !this.isTimeHide;
//             if(!this.isTimeHide){
//                 var self = this;
//                 setTimeout(function(){
//                     self.$refs.hourList.scrollTop = (+self.hour) * 32;
//                     self.$refs.minuteList.scrollTop = (+self.minute) * 32;
//                     self.$refs.secondList.scrollTop = (+self.second) * 32;
//                 },100)
//             }
//         },
//         _hourScroll:function(e){
//             this.hour = this.addZero(Math.round(e.target.scrollTop / 32));
//             clearTimeout(this.hsto);
//             var self = this;
//             this.hsto = setTimeout(function(){
//                 e.target.scrollTop = (+self.hour) * 32;
//             },300);
//         },
//         _minuteScroll:function(e){
//             this.minute = this.addZero(Math.round(e.target.scrollTop / 32));
//             clearTimeout(this.msto);
//             var self = this;
//             this.msto = setTimeout(function(){
//                 e.target.scrollTop = (+self.minute) * 32;
//             },300);
//         },
//         _secondScroll:function(e){
//             this.second = this.addZero(Math.round(e.target.scrollTop / 32));
//             clearTimeout(this.ssto);
//             var self = this;
//             this.ssto = setTimeout(function(){
//                 e.target.scrollTop = (+self.second) * 32;
//             },300);
//         },
//         _getValue:function(){
//             var str = "";
//             switch(this.type){
//                 case "date":
//                     str = this.year + "-" + this.month + "-" + this.day;
//                     break;
//                 case "time":
//                     str = this.year + "-" + this.month + "-" + this.day + " " + this.hour + ":" + this.minute + ":" + this.second;
//                     break;
//                 case "year":
//                     str = this.year;
//                     break;
//                 case "month":
//                     str = this.year + "-" + this.month;
//                     break;
//                 default:
//                     str = this.year + "-" + this.month + "-" + this.day;
//                     break;
//             }
//             this.currValue = str;
//         },
//         _getDays:function(){
//             this.weekDay = new Date(this.year + "-" + this.month).getDay();
//             if(this.month === "02"){
//                 if((this.year % 100 === 0 && this.year % 400 === 0) || (this.year % 100 !== 0 && this.year % 4 === 0)){
//                     this.days = 29;
//                     if(+this.day > 29){
//                         this.day = "29";
//                     }
//                 }else{
//                     this.days = 28
//                     if(+this.day > 28){
//                         this.day = "28";
//                     }
//                 }
//             }else{
//                 if((+this.month < 8 && +this.month % 2 === 0) || (+this.month > 7 && +this.month % 2 === 1)){
//                     this.days = 30;
//                     if(+this.day > 30){
//                         this.day = "30";
//                     }
//                 }else{
//                     this.days = 31;
//                 }
//             }
//         },
//         _createValues:function(date){
//             this.year = date.getFullYear() + "";
//             this.month = this.addZero(date.getMonth() + 1) + "";
//             this.day = this.addZero(date.getDate()) + "";
//             this.hour = this.addZero(date.getHours()) + "";
//             this.minute = this.addZero(date.getMinutes()) + "";
//             this.second = this.addZero(date.getSeconds()) + "";
//             this._getDays();
//         },
//         _handleBlur:function(e){
//             this.currValue = e.target.value;
//             this.$emit("input",e.target.value);
//             if(this.currValue){
//                 var d = new Date(this.currValue);
//             }else{
//                 var d = new Date();
//             }
//             if(d != "Invalid Date"){
//                 this.date = d;
//             }
//             this._createValues(this.date);
//         },
//         _handleClick:function(){
//             this.isHide = !this.isHide;
//         },
//         _clearClick:function(){
//             this.$emit("input","");
//         },
//         _handleYes:function(){
//             this.isHide = true;
//             this.$emit("input",this.currValue);
//         },
//         _handleCancle:function(){
//             this.isHide = true;
//         },
//         _selectDay:function(e){
//             this.day = this.addZero(+(e.target.innerText)) + "";
//             this._getValue();
//             if(this.type !== "time"){
//                 this.isHide = true;
//                 this.$emit("input",this.currValue);
//             }
//         },
//         _getYearList:function(year){
//             year = year || this.year;
//             var y = ~~(year / 10) * 10;
//             var arr = []
//             for(var i = 0;i < 10;i++){
//                 arr[i] = y + i;
//             }
//             this.yearList = arr;
//         },
//         _domClick:function(e){
//             if(e.target !== this.$refs.datePicker && e.target !== this.$refs.input && e.target !== this.$refs.icon){
//                 this.isHide = true;
//             }
//         },
//         _stopPropagationFun:function(e){
//             if(e && e.stopPropagation){
//                 e.stopPropagation();
//             }else{
//                 window.event.cancelBubble = true;
//             }
//         }
//     },
//     watch:{
//         value:function(){
//             this.currValue = this.value;
//             if(this.currValue){
//                 var d = new Date(this.currValue);
//             }else{
//                 var d = new Date();
//             }
//             if(d != "Invalid Date"){
//                 this.date = d;
//             }
//             this._createValues(this.date);
//             this.$parent && this.$parent.validate && this.$parent.validate(null,"change");
//             this.$emit("change")
//         },
//         year:function(){
//             this._getValue();
//             this._getYearList();
//             this._getDays();
//         },
//         month:function(){
//             this._getValue();
//             this._getDays();
//         },
//         hour:function(){
//             this._getValue();
//         },
//         minute:function(){
//             this._getValue();
//         },
//         second:function(){
//             this._getValue();
//         },
//         max:function(){
//             if(this.max !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.max)){
//                 this.maxYear = this.max.substr(0,4);
//                 if(this.max.length >= 7){
//                     this.maxMonth = this.max.substr(5,2);
//                 }
//                 if(this.max.length === 10){
//                     this.maxDay = this.max.substr(8,2);
//                 }
//             }else{
//                 this.maxYear = -1;
//                 this.maxMonth = -1;
//                 this.maxDay = -1;
//             }
//         },
//         min:function(){
//             if(this.min !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.min)){
//                 this.minYear = this.min.substr(0,4);
//                 if(this.min.length >= 7){
//                     this.minMonth = this.min.substr(5,2);
//                 }
//                 if(this.min.length === 10){
//                     this.minDay = this.min.substr(8,2);
//                 }
//             }else{
//                 this.minYear = -1;
//                 this.minMonth = -1;
//                 this.minDay = -1;
//             }
//         },
//         isTimeHide:function(){
//             if(/^([0-1]\d|2[0-4])\:([0-5]\d|60)\:([0-5]\d|60)$/.test(this.$refs.timeIpt.value)){
//                 var arr = this.$refs.timeIpt.value.split(":");
//                 this.hour = arr[0];
//                 this.minute = arr[1];
//                 this.second = arr[2];
//             }
//         }
//     },
//     created:function(){
//         this.currValue = this.value;
//         if(this.value){
//             this.date = new Date(this.value);
//         }else{
//             this.date = new Date();
//         }
//         if(this.date == "Invalid Date"){
//             this.date = new Date();
//         }
//         this.year = this.date.getFullYear() + "";
//         this.month = this.addZero(this.date.getMonth() + 1) + "";
//         this.day = this.addZero(this.date.getDate()) + "";
//         this.hour = this.addZero(this.date.getHours()) + "";
//         this.minute = this.addZero(this.date.getMinutes()) + "";
//         this.second = this.addZero(this.date.getSeconds()) + "";
//         this.weekDay = new Date(this.year + "-" + this.month).getDay();
//         this._getDays();
//         this._getYearList();
//         if(this.type === "month"){
//             this.isMonthHide = false;
//         }
//         if(this.type === "year"){
//             this.isYearHide = false;
//         }
//         if(this.max !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.max)){
//             this.maxYear = this.max.substr(0,4);
//             if(this.max.length >= 7){
//                 this.maxMonth = this.max.substr(5,2);
//             }
//             if(this.max.length === 10){
//                 this.maxDay = this.max.substr(8,2);
//             }
//         }
//         if(this.min !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.min)){
//             this.minYear = this.min.substr(0,4);
//             if(this.min.length >= 7){
//                 this.minMonth = this.min.substr(5,2);
//             }
//             if(this.min.length === 10){
//                 this.minDay = this.min.substr(8,2);
//             }
//         }
//     },
//     mounted:function(){
//         document.addEventListener("click",this._domClick);
//         if(window.innerHeight - this.$refs.datePicker.getBoundingClientRect().bottom <= 300){
//             this.isTop = true;
//         }
//     }
// })
//树
Vue.component("mj-tree-column",{
    render:function(createElement){
        return createElement("div")
    },
    props:{
        prop:String,
        label:String,
        width:String,
        "min-width":String,
        align:String,
        formatter:Function,
        open:Boolean,
        checkbox:Boolean
    },
})
//树
// Vue.component("mj-tree",{
//     render:function(createElement){
//         var defSlots = this.$slots.default || [];
//         var tableColumns = []//表格列数组
//         var ths = [];
//         for(var i = 0,len = defSlots.length;i < len;i++){
//             if(defSlots[i].tag && /^vue-component-\d*-mj-tree-column$/.test(defSlots[i].tag)){
//                 tableColumns[tableColumns.length] = defSlots[i];
//                 var propsData = defSlots[i].componentOptions.propsData;
//                 style = {};
//                 if(/^[left|center|right]$/.test(propsData.align)){
//                     style.textAlign = propsData.align;
//                 }else{
//                     style.textAlign = "left";
//                 }
//                 if(propsData.minWidth && /^\d*px$/.test(propsData.minWidth)){
//                     style.minWidth = propsData.minWidth;
//                 }
//                 var thAttrs = {width:propsData.width || "80px"}
//                 if(defSlots[i].componentOptions.propsData.checkbox && (defSlots[i].componentOptions.propsData.checkbox === true || defSlots[i].componentOptions.propsData.checkbox === "true")){
//                     ths[ths.length] = createElement("th",{style:style,attrs:thAttrs},[
//                         createElement("mj-checkbox",{props:{value:this.allCheck},style:{padding:0},on:{click:this.allchecked}})
//                     ]);
//                 }else{
//                     ths[ths.length] = createElement("th",{style:style,domProps:{innerHTML:propsData.label},attrs:thAttrs});
//                 }
//             }
//         }
//         var rows = this.createRows(this.list,createElement,0,true,tableColumns);
//         return createElement("div",{"class":"mj-tree"},[
//             createElement("table",[
//                 createElement("thead",[
//                     createElement("tr",ths)
//                 ]),
//                 createElement("tbody",rows)
//             ])
//         ])
//     },
//     props:{
//         data:{
//             type:Object,
//             default:function(){
//                 return {};
//             }
//         },
//         "select-all":{
//             type:Boolean
//         },
//     },
//     data:function(){
//         return {
//             list:[],
//             allCheck:true
//         }
//     },
//     methods:{
//         allchecked:function(){
//             this.allCheck = !this.allCheck;
//             for(var key in this.list){
//                 this.list[key].checked = this.allCheck;
//             }
//             this.list = objCopy(this.list);
//         },
//         createRows:function(arr,createElement,i,isOpen,tableColumns){
//             var list = [];
//             if(isOpen){
//                 for(var key in arr){
//                     var o = this.list[arr[key].id];
//                     if(o.level === 1 || i !== 0){
//                         var tds = [];
//                         for(var j = 0,len1 = tableColumns.length;j < len1;j++){
//                             //判断是否有template有则吧template内的节点加入到td中去
//                             if(tableColumns[j].data.scopedSlots){
//                                 tem = tableColumns[j].data.scopedSlots.default(o);
//                                 tds[tds.length] = createElement("td",tem);
//                             }else{
//                                 if(tableColumns[j].componentOptions.propsData.checkbox && (tableColumns[j].componentOptions.propsData.checkbox === true || tableColumns[j].componentOptions.propsData.checkbox === "true")){
//                                     tds[tds.length] = createElement("td",[
//                                         createElement("mj-checkbox",{props:{value:o.checked},style:{padding:0},on:{click:this.checkedFun(o.id)}})
//                                     ]);
//                                 }else{
//                                     if(tableColumns[j].componentOptions.propsData.formatter){
//                                         var d = tableColumns[j].componentOptions.propsData.formatter(o[tableColumns[j].componentOptions.propsData.prop]);
//                                     }else{
//                                         d = o[tableColumns[j].componentOptions.propsData.prop] || "";
//                                     }
//                                     if(tableColumns[j].componentOptions.propsData.open){
//                                         if(o.length > 0){
//                                             var open = createElement("i",{"class":{"open":o.isOpen},style:{}});
//                                         }else{ 
//                                             var open = [];
//                                         }
//                                         tds[tds.length] = createElement("td",{on:{click:this.openFun},attrs:{"data-id":o.id}},[
//                                             createElement("span",{style:{marginLeft:i * 20 + "px",position:"relative"}},[open,d])
//                                         ]);
//                                     }else{
//                                         tds[tds.length] = createElement("td",{domProps:{innerHTML:d}});
//                                     }
//                                 }
//                             }
//                         }
//                         list[list.length] = createElement("tr",tds);
//                         if(o.length > 0){
//                             list[list.length] = this.createRows(o.children,createElement,i + 1,o.isOpen,tableColumns);
//                         }
//                     }
//                 }
//             }
//             return list;
//         },
//         checkedFun:function(id){
//             var self = this;
//             return function(){
//                 self.list[id].checked = !self.list[id].checked;
//                 self.list = objCopy(self.list);
//             }
//         },
//         openFun:function(e){
//             var et = e.target;
//             while(et.tagName !== "TD"){
//                 et = et.parentNode;
//             }
//             var id = et.getAttribute("data-id");
//             var o = objCopy(this.list[id]);
//             o.isOpen = !o.isOpen;
//             this.list[id] = o;
//             this.list = objCopy(this.list);
//         }
//     },
//     watch:{
//         data:function(){
//             this.list = this.data;
//         }
//     },
//     created:function(){
//         this.list = this.data;
//         this.allCheck = this.selectAll;
//     }
// })
//单选框
// Vue.component("mj-radio",{
//     render:function(createElement){
//         var children = [];
//         if(this.$slots.default){
//             for(var i = 0,len = this.$slots.default.length;i < len;i++){
//                 if(this.$slots.default[i] && this.$slots.default[i].tag && /^vue-component-\d*-mj-radio-item/.test(this.$slots.default[i].tag)){
//                     children[children.length] = this.$slots.default[i];
//                 }
//             }
//         }
//         return createElement("div",{"class":"mj-radio"},children);
//     },
//     props:{
//         value:String,
//         clear:{
//             type:Boolean,
//             default:false
//         },
//         defaultValue:String
//     },
//     methods:{
//         _checkeValue:function(value){
//             if(this.clear && this.value === value){
//                 this.$emit("input",this.defaultValue);
//             }else{
//                 this.$emit("input",value);
//             }
//             this.$emit("change");
//         }
//     }
// })
// Vue.component("mj-loading",{
//     render:function(createElement){
//         return createElement("div",{"class":"mj-loading",style:{display:this.value ? "block" : "none"}},[createElement("div",{domProps:{innerText:this.text}})]);
//     },
//     props:{
//         value:{
//             type:Boolean,
//             default:false
//         },
//         text:{
//             type:String,
//             default:"处理中。。。"
//         }
//     }
// });
// Vue.component("mj-radio-item",{
//     render:function(createElement){
//         return createElement("dl",{"class":{"mj-radio-checked":this.$parent && this.$parent.value && this.value === this.$parent.value},on:{click:this._handleClick}},[
//             createElement("div",{"class":"mj-radio-div"}),
//             createElement("label",{domProps:{innerText:this.label}})
//         ])
//     },
//     props:{
//         value:{
//             type:String,
//             required:true
//         },
//         label:{
//             type:String,
//             required:true
//         }
//     },
//     methods:{
//         _handleClick:function(){
//             if(this.$parent && this.$parent._checkeValue){
//                 this.$parent._checkeValue(this.value);
//             }
//         }
//     }
// })
//标签页
// Vue.component("mj-tab-panel",{
//     render:function(createElement){
//         return createElement("div",this.$slots.default);
//     },
//     props:{
//         title:{
//             type:String,
//             default:"标题"
//         }
//     }
// })
// Vue.component("mj-tabs",{
//     render:function(createElement){
//         var titles = [];
//         var contents = [];
//         for(var i = 0,len = this.$slots.default.length;i < len;i++){
//             if(this.$slots.default[i] && this.$slots.default[i].tag && /^vue-component-\d*-mj-tab-panel$/.test(this.$slots.default[i].tag)){
//                 var title = this.$slots.default[i].componentOptions.propsData.title || "标题";
//                 titles[titles.length] = createElement("dl",{domProps:{innerText:title},"class":{"curr":titles.length === this.currIndex},on:{click:this.selectTab(titles.length)}});
//                 contents[contents.length] = createElement("div",{"class":{"hidden":contents.length !== this.currIndex}},[this.$slots.default[i]]);
//             }
//         }
//         return createElement("div",{"class":"mj-tabs"},[
//             createElement("div",{"class":"mj-tabs-titles"},titles),
//             createElement("div",{"class":"mj-tabs-panels"},contents),
//         ])
//     },
//     data:function(){
//         return {
//             currIndex:0
//         }
//     },
//     methods:{
//         selectTab:function(n){
//             var self = this;
//             return function(){
//                 self.currIndex = n;
//             }
//         }
//     },
// })
//消息弹框
// var MjMessage = Vue.extend({
//     template:"<div :class='\"mj-message mj-message-\" + type'><p>{{message}}</p></div>",
//     props:{
//         type:{
//             type:String,
//             default:"info"
//         },
//         message:String,
//     }
// })
// var MjConfirm = Vue.extend({
//     render:function(createElement){
//         return createElement("div",{"class":"mj-confirm"},[
//                 createElement("div",{"class":"mj-confirm-mask"}),
//                 createElement("div",{"class":{"mj-confirm-default":true}},[
//                     createElement("div",{"class":"mj-confirm-header"},[
//                         createElement("span",{domProps:{innerText:this.title}}),
//                         createElement("div",{"class":"mj-confirm-close",on:{click:this.closeFun}})
//                     ]),
//                     createElement("div",{"class":"mj-confirm-body",domProps:{innerText:this.message}}),
//                     createElement("div",{"class":"mj-confirm-footer"},[
//                         createElement("mj-button",{domProps:{innerText:this.cancelBtnText},on:{click:this.cancelFun},props:{type:"text",size:"small"}}),
//                         createElement("mj-button",{domProps:{innerText:this.confirmBtnText},on:{click:this.confirmFun},props:{size:"small"}})
//                     ])
//                 ])
//             ]);
//     },
//     props:{
//         title:{
//             type:String,
//             default:"标题"
//         },
//         message:String,
//         confirmBtnText:{
//             type:String,
//             default:"确定"
//         },
//         cancelBtnText:{
//             type:String,
//             default:"取消"
//         },
//         confirmFun:Function,
//         cancelFun:Function,
//         closeFun:Function,
//     }
// })
// Vue.prototype.$message = function(opt){
//     opt = opt || {};
//     var message = new MjMessage();
//     if(/^info|waring|error|success$/.test(opt.type)){
//         message.type = opt.type;
//     }else{
//         message.type = "info";
//     }
//     message.message = (opt.message === undefined || opt.message === null) ? "" : opt.message;
//     document.body.appendChild(message.$mount().$el);
//     setTimeout(function(){
//         document.body.removeChild(message.$mount().$el);
//         message.$destroy();
//     },opt.time || 3000);
// }
// Vue.prototype.$confirm = function(opt){
//     opt = opt || {};
//     var confirm = new MjConfirm();
//     confirm.message = (opt.message === undefined || opt.message === null) ? "" : opt.message;
//     opt.title ? confirm.title = opt.title : "";
//     opt.confirmBtnText ? confirm.confirmBtnText = opt.confirmBtnText : "";
//     opt.cancelBtnText ? confirm.cancelBtnText = opt.cancelBtnText : "";
//     confirm.confirmFun = function(){
//         if(opt.confirmFun){
//             opt.confirmFun();
//         }
//         document.body.removeChild(confirm.$mount().$el);
//         confirm.$destroy();
//     };
//     confirm.cancelFun = function(){
//         if(opt.cancelFun){
//             opt.cancelFun();
//         }
//         document.body.removeChild(confirm.$mount().$el);
//         confirm.$destroy();
//     };
//     confirm.closeFun = function(){
//         document.body.removeChild(confirm.$mount().$el);
//         confirm.$destroy();
//     };
//     document.body.appendChild(confirm.$mount().$el);
// }
//异步请求ajax
var MJajax = function(option){
    if(window.XMLHttpRequest){
        var xmlHttp = new XMLHttpRequest();
    }else{
        var xmlHttp =  new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(option.url){
        option.type = option.type.toLowerCase();
        if(option.type === "post"){
            xmlHttp.open("post",option.url,option.async === false ? false : true);
            if(option.isFormData){
                var dataStr = new FormData();
                for(maitem in option.data){
                    var s = option.data[maitem];
                    dataStr.append(maitem,s);
                }
                if(option.fileParameter && option.fileParameter.length > 0){
                    for(var i = 0,len = option.fileParameter.length;i < len;i++){
                        dataStr.append(option.fileParameter[i],option.file[i],option.filename[i]);
                    }
                }
                xmlHttp.send(dataStr);
            }else{
                xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");
                var dataStr = "";
                for(maitem in option.data){
                    var s = option.data[maitem];
                    if(typeof s === "object"){
                        s = JSON.stringify(s);
                    }else{
                        s += "";
                    }
                    s = s.replace(/\%/g,"%25");
                    s = s.replace(/\//g,"%2F");
                    s = s.replace(/\?/g,"%3F");
                    s = s.replace(/\+/g,"%2B");
                    s = s.replace(/\&/g,"%26");
                    s = s.replace(/\=/g,"%3D");
                    s = s.replace(/\#/g,"%23");
                    dataStr += maitem + "=" + s + "&";
                }
                if(dataStr.charAt(dataStr.length - 1) === "&"){
                    dataStr = dataStr.substr(0,dataStr.length - 1);
                }
                xmlHttp.send(dataStr);
            }
        }else if(option.type == "get"){
            xmlHttp.open("get",option.url,option.async === false ? false : true);
            xmlHttp.send();
        }
        xmlHttp.onreadystatechange = function(){
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
                if(option.success){
                    switch(option.dataType){
                        case "json":
                            var result = xmlHttp.responseText[0] == "{" && xmlHttp.responseText[xmlHttp.responseText.length - 1] == "}" || (xmlHttp.responseText[0] == "[" && xmlHttp.responseText[xmlHttp.responseText.length - 1] == "]") ? JSON.parse(xmlHttp.responseText) : xmlHttp.responseText;
                            break;
                        case "text":
                            var result = xmlHttp.responseText;
                            break;
                        default:
                            var result = xmlHttp.responseText;
                            break;
                    }
                    option.success(result);
                };
            }else if(xmlHttp.readyState == 4 && xmlHttp.status == 400){
                if(option.error){
                    option.error({errorMsg:"请输入url",result:xmlHttp.responseText});
                }
            }else if(xmlHttp.readyState == 4){
                if(option.error){
                    option.error();
                }
            }
        }
    }else{
        if(option.error){
            option.error({errorMsg:"请输入url"});
        }
    }
}
var objCopy = function(obj){
    var o = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
    for(var key in obj){
        if(typeof obj[key] == "object"){
            o[key] = arguments.callee(obj[key]);
        }else{
            o[key] = obj[key];
        }
    }
    return o;
}
var MJutil = {};
MJutil.addZero = function(n){
    return n < 10 ? "0" + n : n + "";
}
MJutil.dateFmt = function(date,type){
    switch(type){
        case "date":
            return date.getFullYear() + "-" + this.addZero(date.getMonth() + 1) + "-" + this.addZero(date.getDate());
        case "time":
            return date.getFullYear() + "-" + this.addZero(date.getMonth() + 1) + "-" + this.addZero(date.getDate()) + " " + this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes()) + ":" + this.addZero(date.getSeconds());
        default:
            return date.getFullYear() + "-" + this.addZero(date.getMonth() + 1) + "-" + this.addZero(date.getDate()) + " " + this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes()) + ":" + this.addZero(date.getSeconds());
    }
}
MJutil.validPhone = function(value,cb){
    if(value !== "" && !/^1[3|4|5|7|8]\d{9}$/.test(value)){
        cb("手机号码格式不正确");
    }
}
MJutil.validCardId = function(value,cb){
    if(value !== "" && !/^\d{17}[\d|x|X]$/.test(value)){
        cb("身份证号码格式不正确");
    }
}
MJutil.validNum = function(value,cb){
    if(value !== "" && !/^\d*$/.test(value)){
        cb("请输入整数");
    }
}
MJutil.validNonNegNum = function(value,cb){
    if(value !== "" && !/^\d*\.?\d*$/.test(value)){
        cb("请输入非负数");
    }
}
MJutil.validMoreNum = function(num){
    return function(value,cb){
        if(value !== "" && !/^\-?\d*\.?\d*$/.test(value) || value <= num){
            cb("请输入大于" + num + "的数字");
        }
    }
}

MJutil.validMoreZero = function(num){
    return function(value,cb){
        if(value !== "" && !/^\-?\d*$/.test(value) || value <= num){
            cb("请输入大于" + num + "的整数");
        }
    }
}

MJutil.validIntRound = function(min,max){
    return function(value,cb){
        if(value !== "" && (!/^\-?\d*$/.test(value) || value < min || value > max)){
            cb("请输入" + min + "~" + max + "的整数");
        }
    }
}
MJutil.validNumRound = function(min,max,type){
    switch(type){
        case 0://两边都包括
            return function(value,cb){
                if(value !== "" && !/^\-?\d*\.?\d*$/.test(value) || value < min || value > max){
                    cb("请输入" + min + "~" + max + "的数字");
                }
            }
        case 1://左边不包括
            return function(value,cb){
                if(value !== "" && !/^\-?\d*\.?\d*$/.test(value) || value <= min || value > max){
                    cb("请输入" + min + "(不包括)~" + max + "的数字");
                }
            }
        case 2://右边不包括
            return function(value,cb){
                if(value !== "" && !/^\-?\d*\.?\d*$/.test(value) || value < min || value >= max){
                    cb("请输入" + min + "~" + max + "(不包括)的数字");
                }
            }
        case 3://左右不包括
            return function(value,cb){
                if(value !== "" && !/^\-?\d*\.?\d*$/.test(value) || value <= min || value >= max){
                    cb("请输入" + min + "(不包括)~" + max + "(不包括)的数字");
                }
            }
        default://两边都包括
            return function(value,cb){
                if(value !== "" && !/^\-?\d*\.?\d*$/.test(value) || value < min || value > max){
                    cb("请输入" + min + "~" + max + "的数字");
                }
            }
    }
}
