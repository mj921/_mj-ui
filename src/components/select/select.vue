<style></style>
<template>
    <div class="mj-select">
        <i ref="selectIcon" :class="{'mj-select-icon-show':isShow,'mj-select-icon-hide':!isShow}"></i>
        <input type="text" ref="inputRef" class="mj-select-input" :disabled="filterFlag" :readonly="filterFlag" v-model="str" @blur="_handleBlur" @input="_handleInput">
        <div ref="list" :class="{'mj-select-list':true,'mj-select-show':isShow}" @click="_handleScroll">
            <mj-select-item v-for="option in list" :key="option.label || option.value" :label="option.label" :value="option.value" v-show="option.showFlag" :created="true" :click-fun="_selectValue"></mj-select-item>
        </div>
        <div class="hidden"><slot></slot></div>
    </div>
</template>
<script>
    import SelectItem from "./select-item.vue";

    import { objCopy } from "../../util.js";

    export default {
        data(){
            return {
                list:[],
                listLength:0,
                childrenList:[],
                width:120,
                isShow:true,
                str:"",
                selected:{},
                disabled:"false",
                strCurr:""
            }
        },
        props:{
            value:{
                validator: function (value) {
                    return true;
                },
                default:""
            },
            filterFlag:{
                type:Boolean,
                default:false
            },
        },
        methods:{
            _handleScroll:function(e){
                e.preventDefault();
            },
            _handleBlur:function(e){
                this.str = this.strCurr;
            },
            _handleInput:function(e){
                var list = [];
                this.isShow = true;
                for(var i = 0,len = this.list.length;i < len;i++){
                    list[i] = this.list[i];
                    list[i].showFlag = this.list[i].label.indexOf(this.$refs.inputRef.value) > -1;
                }
                this.list = list;
            },
            _selectValue:function(value,str){
                console.log(value,str)
                this.isShow = false;
                var list = [];
                this.isShow = true;
                if(this.filterFlag){
                    for(var i = 0,len = this.list.length;i < len;i++){
                        list[i] = this.list[i];
                        list[i].showFlag = this.list[i].label.indexOf(str) > -1;
                    }
                    this.list = list;
                }
                this.$emit("input",value);
                this.str = str;
                this.strCurr = str;
                this.$parent && this.$parent.validate && this.$parent.validate(null,"change");
            },
            _domClick:function(e){
                if(e.target !== this.$refs.inputRef && e.target !== this.$refs.selectIcon){
                    this.isShow = false;
                }else{
                    this.isShow = !this.isShow;
                }
            }
        },
        watch:{
            value:function(){
                var flag = false;
                var self = this;
                setTimeout(function(){
                    for(var i = 0,len = self.list.length;i < len;i++){
                        if(self.value === self.list[i].value){
                            self.str = self.list[i].label || self.list[i].value;
                            self.strCurr = self.list[i].label || self.list[i].value;
                            flag = true;
                            self.selected = self.list[i];
                        }
                    }
                    if(!flag){
                        self.str = "";
                        self.strCurr = "";
                    }
                    self.$emit("change");
                },16)
            }
        },
        mounted:function(){
            document.addEventListener("click",this._domClick);
            this.$refs.inputRef.style.minWidth = this.$refs.list.offsetWidth + 2 + "px";
            this.$refs.list.style.minWidth = this.$refs.list.offsetWidth >= 164 ? this.$refs.list.offsetWidth : 164 + "px";
            this.isShow = false;
        },
        components:{
            SelectItem
        },
        name:"mj-select"
    }
</script>