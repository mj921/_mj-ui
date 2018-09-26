<!-- <template>
    <div class="mj-select">
        <i ref="selectIcon" :class="{'mj-select-icon-show': isShow,'mj-select-icon-hide': !isShow}"></i>
        <input 
            type="text" 
            ref="inputRef" 
            class="mj-select-input" 
            :disabled="filterFlag" 
            :readonly="filterFlag" 
            v-model="str" 
            @blur="_handleBlur" 
            @input="_handleInput" />
        <div ref="list" class="mj-select-list" :class="{'mj-select-show':isShow}" @click="_handleScroll">
            <mj-select-item 
                v-for="option in list" 
                :key="option.label || option.value" 
                :label="option.label" 
                :value="option.value" 
                v-show="option.showFlag" 
                :created="true" 
                :click-fun="_selectValue">
            </mj-select-item>
        </div>
        <div class="hidden"><slot></slot></div>
    </div>
</template>
<script>
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
            },
            resetData:function(data){
                this.$emit("input",data);
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
        name:"mj-select"
    }
</script> -->
<template>
    <div class="mj-select">
        <div class="mj-select-main">
            <i ref="selectIcon" :class="{'mj-select-icon-show': isShow,'mj-select-icon-hide': !isShow}"></i>
            <input  
                v-model="str" 
                type="text" 
                ref="inputRef"
                :placeholder="placeholder"
                class="mj-select-input"
                :class="{'mj-select-disabled': disabledFlag}"
                :disabled="disabled"
                :readonly="!filterableFlag"
                @blur="_handleBlur"
                @input="_handleInput" />
            <i class="mj-select-icon-clear" v-show="clearableFlag && str !==''" @click="_clearIpt"></i>
        </div>
        <div ref="list" class="mj-select-list" v-show="isShow" @click="_handleScroll">
            <mj-option v-if="allowCreateFlag && allowCreateStr !== ''" :value="allowCreateStr"></mj-option>
            <slot></slot>
            <dl v-show="noDateFlag" class="mj-select-null">{{noDataText}}</dl>
        </div>
    </div>
</template>
<script>
    import { objCopy } from "../../util.js";

    export default {
        data(){
            return {
                width: 120,
                isShow: false,
                str:"",
                selected:{},
                strCurr:"",
                allowCreateList: [],
                allowCreateStr: "",
                noDateFlag: false
            }
        },
        provide: function () {
            return {
                _selectValue: this._selectValue
            }
        },
        props:{
            value:{
                validator: function (value) {
                    return true;
                },
                default:""
            },
            filterable: {
                validator: function (val) {
                    return true;
                }
            },
            placeholder: String,
            disabled: {
                validator: function (val) {
                    return true;
                }
            },
            clearable: {
                validator: function (val) {
                    return true;
                }
            },
            "allow-create": {
                validator: function (val) {
                    return true;
                }
            },
            "no-data-text": {
                type: String,
                default: "无数据"
            }
        },
        methods:{
            focus: function () {
                
            },
            _handleScroll:function(e){
                e.preventDefault();
            },
            _handleBlur:function(e){
                this.str = this.strCurr;
            },
            _handleInput:function(e){
                if (this.str === "") {
                    this.$children.forEach(item => {
                        if (item._setShowFlag) {
                            item._setShowFlag(true);
                        }
                    });
                    this.allowCreateStr = "";
                    this.noDateFlag = this.$slots.default.length === 0;
                } else {
                    var flag = true;
                    var noDateFlag = true;
                    this.$slots.default.forEach(item => {
                        let vc = item.componentInstance;
                        if (vc._setShowFlag) {
                            if ((vc.label && vc.label.indexOf(this.str) > -1) || (vc.label === "" && (vc.value + "").indexOf(this.str))) {
                                vc._setShowFlag(true);
                                noDateFlag = false;
                            } else {
                                vc._setShowFlag(false);
                            }
                        }
                        if (vc.label === this.str || (vc.label === "" && (vc.value + "") === this.str)) {
                            flag = false;
                        }
                    });
                    if (flag) {
                        this.allowCreateStr = this.str;
                    }
                    this.noDateFlag = !this.allowCreateFlag && noDateFlag;
                }
            },
            _selectValue:function(value, str){
                this.isShow = false;
                this.$emit("input",value);
                this.str = str;
                this.strCurr = str;
                this.$parent && this.$parent.validate && this.$parent.validate(null,"change");
            },
            _domClick:function(e){
                if (e.target !== this.$refs.inputRef && e.target !== this.$refs.selectIcon) {
                    this.isShow = false;
                } else if (!this.disabledFlag) {
                    if (this.allowCreateStr !== this.str) {
                        this.allowCreateStr = this.str
                    }
                    this.$slots.default.forEach(item => {
                        let vc = item.componentInstance;
                        if (vc._setShowFlag) {
                            vc._setShowFlag(true);
                        }
                        if (this.allowCreateStr === vc.label || (vc.label === "" && (vc.value + "" === this.allowCreateStr))) {
                            this.allowCreateStr = "";
                        }
                    });
                    this.noDateFlag = this.$slots.default.length === 0;
                    this.isShow = !this.isShow;
                }
            },
            _clearIpt: function () {
                this.str = "";
            },
            resetData:function(data){
                this.$emit("input",data);
            }
        },
        watch:{
            value:function(){
                this.$emit("change", this.value);
            }
        },
        computed: {
            disabledFlag: function () {
                return this.disabled === '' || this.disabled === 'true' || this.disabled === true || this.disabled === 'disabled';
            },
            clearableFlag: function () {
                return this.clearable === '' || this.clearable === 'true' || this.clearable === true || this.clearable === 'clearable';
            },
            filterableFlag: function () {
                return this.filterable === '' || this.filterable === 'true' || this.filterable === true || this.filterable === 'filterable';
            },
            allowCreateFlag: function () {
                return this.allowCreate === '' || this.allowCreate === 'true' || this.allowCreate === true || this.allowCreate === 'allow-create';
            }
        },
        mounted:function(){
            document.addEventListener("click",this._domClick);
            this.$refs.inputRef.style.minWidth = this.$refs.list.offsetWidth + 2 + "px";
            this.$refs.list.style.minWidth = this.$refs.list.offsetWidth >= 164 ? this.$refs.list.offsetWidth : 164 + "px";
        },
        name:"mj-select"
    }
</script>
<style scoped>
    .mj-select{
        position: relative;
        display: inline-block;
        text-align: left;
    }
    .mj-select .mj-select-icon-hide{
        position: absolute;
        top: 16px;
        right: 11px;
        border-width: 5px;
        border-style: solid;
        border-color:transparent;
        border-top-color: #26282c;
        border-bottom-width:0; 
    }
    .mj-select .mj-select-icon-hide:after{
        content: "";
        position: absolute;
        left: -3px;
        top: -5px;
        display: block;
        border-width: 3px;
        border-style: solid;
        border-color:transparent;
        border-top-color: #fff;
        border-bottom-width:0; 
    }
    .mj-select .mj-select-icon-show{
        position: absolute;
        top: 15px;
        right: 11px;
        border-width: 5px;
        border-style: solid;
        border-color:transparent;
        border-bottom-color: #26282c;
        border-top-width:0; 
    }
    .mj-select .mj-select-icon-show:after{
        content: "";
        position: absolute;
        left: -3px;
        top: 2px;
        display: block;
        border-width: 3px;
        border-style: solid;
        border-color:transparent;
        border-bottom-color: #fff;
        border-top-width:0; 
    }
    .mj-select .mj-select-icon-clear{
        display: none;
        position: absolute;
        top: 10px;
        right: 11px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #c0c4cc;
        cursor: pointer;
    }
    .mj-select .mj-select-icon-clear:after{
        position: absolute;
        content: "";
        top: 6px;
        left: 3px;
        width: 6px;
        height: 1px;
        background-color: #fff;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .mj-select .mj-select-icon-clear:before{
        position: absolute;
        content: "";
        top: 6px;
        left: 3px;
        width: 6px;
        height: 1px;
        background-color: #fff;
        -webkit-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
    .mj-select .mj-select-main:hover .mj-select-icon-clear{
        display: block;
    }
    .mj-select .mj-select-input{
        padding: 6px 20px 6px 10px;
        width: 164px;
        height: 34px;
        line-height: 22px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        border-radius: 1px;
        color:#26282c;
        font-size: 12px;
        border:1px solid #e7e9f3;
        background-color: #fff;
        outline: none;
        cursor: pointer;
    }
    .mj-form-item.mj-form-error .mj-select-input{
        border-color: #ff4949;
    }
    .mj-select-list{
        display: block;
        position: absolute;
        left: 0;
        top: 40px;
        padding: 6px 0;
        border:1px solid #e7e9f3;
        max-height: 150px;
        overflow: auto;
        min-width: 164px;
        box-shadow: 0 1px 1px #e7e9f3;
        z-index: 999;
        background-color: #fff;
    }
    .mj-select-input.mj-select-disabled{
        cursor: not-allowed;
        background-color: #f5f7fa;
        color: #c0c4cc;
    }
    .mj-select-null{
        line-height: 30px;
        height: 30px;
        font-size: 12px;
        color: #26282c;
        white-space: nowrap;
        cursor: pointer;
        text-align: center;
    }
</style>