<!-- Vue.component("mj-tree",{
    render:function(createElement){
        var defSlots = this.$slots.default || [];
        var tableColumns = []//表格列数组
        var ths = [];
        for(var i = 0,len = defSlots.length;i < len;i++){
            if(defSlots[i].tag && /^vue-component-\d*-mj-tree-column$/.test(defSlots[i].tag)){
                tableColumns[tableColumns.length] = defSlots[i];
                var propsData = defSlots[i].componentOptions.propsData;
                style = {};
                if(/^[left|center|right]$/.test(propsData.align)){
                    style.textAlign = propsData.align;
                }else{
                    style.textAlign = "left";
                }
                if(propsData.minWidth && /^\d*px$/.test(propsData.minWidth)){
                    style.minWidth = propsData.minWidth;
                }
                var thAttrs = {width:propsData.width || "80px"}
                if(defSlots[i].componentOptions.propsData.checkbox && (defSlots[i].componentOptions.propsData.checkbox === true || defSlots[i].componentOptions.propsData.checkbox === "true")){
                    ths[ths.length] = createElement("th",{style:style,attrs:thAttrs},[
                        createElement("mj-checkbox",{props:{value:this.allCheck},style:{padding:0},on:{click:this.allchecked}})
                    ]);
                }else{
                    ths[ths.length] = createElement("th",{style:style,domProps:{innerHTML:propsData.label},attrs:thAttrs});
                }
            }
        }
        var rows = this.createRows(this.list,createElement,0,true,tableColumns);
        return createElement("div",{"class":"mj-tree"},[
            createElement("table",[
                createElement("thead",[
                    createElement("tr",ths)
                ]),
                createElement("tbody",rows)
            ])
        ])
    },
    
}) -->
<style></style>
<template>
    <div class="mj-tree">
        <table>
            <thead>
                <tr>
                    <template v-for="column in columnList">
                        <th v-if="column.checkbox" :class="'mj-text-' + column.align" :style="'min-width:' + column.minWidth" :width="column.width">
                            <mj-checkbox style="padding:0;" @click="allchecked" v-model="allCheck"></mj-checkbox>
                        </th>
                        <th v-else :class="'mj-text-' + column.align" :style="'min-width:' + column.minWidth" :width="column.width">{{column.label}}</th>
                    </template>
                </tr>
            </thead>
            <template v-for="row in list">
                <mj-tree-child :row="row" :column-list="columnList"></mj-tree-child>
            </template>
        </table>
        <div class="hidden"><slot></slot></div>
    </div>
</template>
<script>
    import TreeChild from "./tree-child.vue";
    export default {
        props:{
            data:{
                type:Array
            },
            "select-all":{
                type:Boolean
            },
        },
        data:function(){
            return {
                list:[],
                allCheck:true,
                columnList:[]
            }
        },
        methods:{
            allchecked:function(){
                this.allCheck = !this.allCheck;
                for(var key in this.list){
                    this.list[key].checked = this.allCheck;
                }
                this.list = objCopy(this.list);
            },
            createRows:function(arr,createElement,i,isOpen,tableColumns){
                var list = [];
                if(isOpen){
                    for(var key in arr){
                        var o = this.list[arr[key].id];
                        if(o.level === 1 || i !== 0){
                            var tds = [];
                            for(var j = 0,len1 = tableColumns.length;j < len1;j++){
                                //判断是否有template有则吧template内的节点加入到td中去
                                if(tableColumns[j].data.scopedSlots){
                                    tem = tableColumns[j].data.scopedSlots.default(o);
                                    tds[tds.length] = createElement("td",tem);
                                }else{
                                    if(tableColumns[j].componentOptions.propsData.checkbox && (tableColumns[j].componentOptions.propsData.checkbox === true || tableColumns[j].componentOptions.propsData.checkbox === "true")){
                                        tds[tds.length] = createElement("td",[
                                            createElement("mj-checkbox",{props:{value:o.checked},style:{padding:0},on:{click:this.checkedFun(o.id)}})
                                        ]);
                                    }else{
                                        if(tableColumns[j].componentOptions.propsData.formatter){
                                            var d = tableColumns[j].componentOptions.propsData.formatter(o[tableColumns[j].componentOptions.propsData.prop]);
                                        }else{
                                            d = o[tableColumns[j].componentOptions.propsData.prop] || "";
                                        }
                                        if(tableColumns[j].componentOptions.propsData.open){
                                            if(o.length > 0){
                                                var open = createElement("i",{"class":{"open":o.isOpen},style:{}});
                                            }else{ 
                                                var open = [];
                                            }
                                            tds[tds.length] = createElement("td",{on:{click:this.openFun},attrs:{"data-id":o.id}},[
                                                createElement("span",{style:{marginLeft:i * 20 + "px",position:"relative"}},[open,d])
                                            ]);
                                        }else{
                                            tds[tds.length] = createElement("td",{domProps:{innerHTML:d}});
                                        }
                                    }
                                }
                            }
                            list[list.length] = createElement("tr",tds);
                            if(o.length > 0){
                                list[list.length] = this.createRows(o.children,createElement,i + 1,o.isOpen,tableColumns);
                            }
                        }
                    }
                }
                return list;
            },
            checkedFun:function(id){
                var self = this;
                return function(){
                    self.list[id].checked = !self.list[id].checked;
                    self.list = objCopy(self.list);
                }
            },
            openFun:function(e){
                var et = e.target;
                while(et.tagName !== "TD"){
                    et = et.parentNode;
                }
                var id = et.getAttribute("data-id");
                var o = objCopy(this.list[id]);
                o.isOpen = !o.isOpen;
                this.list[id] = o;
                this.list = objCopy(this.list);
            }
        },
        watch:{
            data:function(){
                this.list = this.data;
            }
        },
        components:{
            "mj-tree-child":TreeChild
        },
        created:function(){
            this.list = this.data;
            this.allCheck = this.selectAll;
        },
        name:"mj-tree"
    }
</script>