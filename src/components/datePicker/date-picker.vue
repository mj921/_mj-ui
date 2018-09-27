<template>
    <div class="mj-date-picker" ref="datePicker">
        <input 
            ref="input" 
            type="text" 
            class="mj-date-input" 
            v-model="value" 
            readonly 
            @blur="_handleBlur" 
            @click="_handleClick" />
        <i 
            ref="icon" 
            class="mj-date-icon" 
            @click="_clearClick"></i>
        <transition name="fade">
	        <div
	        	v-show="!isHide"
	        	class="mj-date-main"
	            :class="{'mj-date-main-bottom': !isTop,'mj-date-main-top': isTop}" 
	            @click="_stopPropagationFun">
               	<mj-datetime-panel
               		v-if="type === 'datetime'"
               		:hour.sync="hour"
               		:minute.sync="minute"
               		:second.sync="second"
               		:dateStr="dateStr"></mj-datetime-panel>
	            <div class="mj-date-years clearfix">
	                <div class="mj-date-years-btn mj-date-prev-year" @click="prevYear">
	                    <i class="mj-date-prev"></i><i class="mj-date-prev"></i>
	                </div>
	                <div class="mj-date-years-btn mj-date-prev-month" @click="prevMonth">
	                    <i class="mj-date-prev"></i>
	                </div>
	                <div class="mj-date-years-text">
	                    <span @click="_showYearList">{{year}} 年</span>
	                    <span @click="_showMonthList" v-if="type !== 'year'">{{month}} 月</span>
	                </div>
	                <div class="mj-date-years-btn mj-date-next-month" @click="nextMonth">
	                    <i class="mj-date-next"></i>
	                </div>
	                <div class="mj-date-years-btn mj-date-next-year" @click="nextYear">
	                    <i class="mj-date-next"></i><i class="mj-date-next"></i>
	                </div>
	            </div>
	            <mj-date-panel
	            	:type="type"
	            	:day.sync="day"
	            	:maxDate="maxDate"
	            	:minDate="minDate"
	            	:month.sync="month"
	            	:year.sync="year"
	            	:isMonthHide.sync="isMonthHide"
	            	:isYearHide.sync="isYearHide"
	            	:yearList="yearList"
	            	:days="days"
	            	:weekDay="weekDay"></mj-date-panel>
	            <div class="mj-date-button">
	                <div class="mj-date-button-cancle" @click="_handleCancle">取消</div>
	                <div class="mj-date-button-yes" @click="_handleYes">确定</div>
	            </div>
	        </div>
		</transition>
    </div>
</template>
<script>
    import { addZero, dateFmt } from "../../util.js";
    import MjDatePanel from './date-panel.vue';
    import MjDatetimePanel from './datetime-panel.vue';
    export default {
        props:{
            value:String,
            type:{
                type:String,
                default:"date"
            },
            max:String,
            min:String,
            valueFormat: {
                type: String,
                default: ""
            }
        },
        data () {
            return {
                isHide:true,
                year:"",
                month:"",
                day:"",
                hour:"",
                minute:"",
                second:"",
                date:null,
                days:0,
                weekDay:0,
                currValue:"",
                isYearHide:true,
                isMonthHide:true,
                yearList:[],
                isTop:false,
                valFmt: "yyyy-MM-dd",
                maxDate: null,
                minDate: null
            }
        },
        methods:{
            addZero,
            checkMaxDate () {
                if (this.maxDate && this.maxDate.getTime() < new Date(dateFmt(new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second), this.valFmt)).getTime()) {
                	this._createValues(this.maxDate);
                }
            },
            checkMinDate () {
                if (this.minDate && this.minDate.getTime() > new Date(dateFmt(new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second), this.valFmt)).getTime()) {
                	this._createValues(this.minDate);
                }
            },
            prevYear () {
                if(!this.isYearHide){
                    if(!this.minDate || this.yearList[0] > this.minDate.getFullYear()){
                        this._getYearList(this.yearList[0] - 10);
                    }
                }else if(!this.minDate || this.year > this.minDate.getFullYear()){
                    this.year = +this.year - 1 + "";
                }
            },
            prevMonth () {
            	let minYear = this.minDate ? this.minDate.getFullYear() : 0;
            	if (!this.isYearHide || this.type === "year") {
            		if (!this.minDate || minYear < +this.year) {
        				this.year = +this.year - 1 + "";
            		}
            	} else {
            		if (!this.minDate || (minYear < +this.year) || (+minYear === +this.year && (this.minDate.getMonth() + 1) < +this.month)) {
            			if (this.month === "01") {
            				if (minYear === -1 || minYear < +this.year - 1) {
	            				this.month = "12";
	            				this.year = +this.year - 1 + "";
	            			}
            			} else {
            				this.month = this.addZero(+this.month - 1);
            			}
            		}
            	}
            },
            nextYear () {
                if(!this.isYearHide){
                    if(!this.maxDate || this.yearList[9] < this.maxDate.getFullYear()){
                        this._getYearList(this.yearList[0] + 10);
                    }
                }else if(!this.maxDate || this.year < this.maxDate.getFullYear()){
                    this.year = +this.year + 1 + "";

                }
            },
            nextMonth () {
            	let maxYear = this.maxDate ? this.maxDate.getFullYear() : 0;
            	if (!this.isYearHide || this.type === "year") {
            		if (!this.maxDate || maxYear > +this.year) {
        				this.year = +this.year + 1 + "";
            		}
            	} else {
            		if (!this.maxDate || +maxYear > +this.year || (+maxYear === +this.year && (this.maxDate.getMonth() + 1) > +this.month)) {
            			if (this.month === "12") {
            				if (!this.maxDate || maxYear > +this.year - 1) {
	            				this.month = "01";
	            				this.year = +this.year + 1 + "";
	            			}
            			} else {
            				this.month = this.addZero(+this.month + 1);
            			}
            		}
            	}
            },
            _showYearList () {
                if(this.type !== "year"){
                    this.isYearHide = !this.isYearHide;
                    this.isMonthHide = true;
                }
            },
            _showMonthList () {
                if(this.type !== "year"){
                    this.isMonthHide = !this.isMonthHide;
                    this.isYearHide = true;
                }
            },
            _getValue () {
                var str = "";
                this.currValue = dateFmt(new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second), this.valFmt);
            },
            _getDays () {
                this.weekDay = new Date(this.year + "-" + this.month).getDay();
                var y = +this.year;
                var m = +this.month;
                var d = +this.day;
                if(m === "02"){
                    if((y % 100 === 0 && y % 400 === 0) || (y % 100 !== 0 && y % 4 === 0)){
                        this.days = 29;
                        if(d > 29){
                            this.day = "29";
                        }
                    }else{
                        this.days = 28
                        if(d > 28){
                            this.day = "28";
                        }
                    }
                }else{
                    if((m < 8 && m % 2 === 0) || (m > 7 && m % 2 === 1)){
                        this.days = 30;
                        if(d > 30){
                            this.day = "30";
                        }
                    }else{
                        this.days = 31;
                    }
                }
            },
            _createValues (date) {
                this.year = date.getFullYear() + "";
                this.month = this.addZero(date.getMonth() + 1) + "";
                this.day = this.addZero(date.getDate()) + "";
                this.hour = this.addZero(date.getHours()) + "";
                this.minute = this.addZero(date.getMinutes()) + "";
                this.second = this.addZero(date.getSeconds()) + "";
                this._getDays();
            },
            _handleBlur (e) {
                this.$emit("input",e.target.value);
                this._watchValue();
                this._createValues(this.date);
            },
            _handleClick () {
                this.isHide = !this.isHide;
            },
            _clearClick () {
                this.$emit("input","");
            },
            _handleYes () {
                this.isHide = true;
                this._getValue();
                this.$emit("input",this.currValue);
            },
            _handleCancle () {
                this.isHide = true;
            },
            _getYearList (year) {
                year = year || this.year;
                var y = ~~(year / 10) * 10;
                var arr = []
                for(var i = 0;i < 10;i++){
                    arr[i] = y + i;
                }
                this.yearList = arr;
            },
            _domClick (e) {
                if(e.target !== this.$refs.datePicker && e.target !== this.$refs.input && e.target !== this.$refs.icon){
                    this.isHide = true;
                }
            },
            _stopPropagationFun (e) {
                if(e && e.stopPropagation){
                    e.stopPropagation();
                }else{
                    window.event.cancelBubble = true;
                }
            },
            _watchValue () {
	            this.currValue = this.value;
	            if (this.currValue) {
	                this.date = new Date(this.currValue);
	            } else {
	                this.date = new Date();
	            }
	            if (this.date == "Invalid Date") {
	                this.date = new Date();
	            }
            },
            init () {
	            this._watchValue();
	            this._createValues(this.date);
	            this._getDays();
	            this._getYearList();
	            if(this.type === "month"){
	                this.isMonthHide = false;
	            }
	            if(this.type === "year"){
	                this.isYearHide = false;
	            }
	            if(this.max !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.max)){
	                this.maxDate = new Date(this.max);
	            }
	            if(this.min !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.min)){
	                this.minDate = new Date(this.min);
	            }
	            if (this.valueFormat) {
	                this.valFmt = this.valueFormat;
	            } else {
	                switch(this.type){
	                    case "date":
	                        this.valFmt = "yyyy-MM-dd";
	                        break;
	                    case "datetime":
	                        this.valFmt = "yyyy-MM-dd HH:mm:ss";
	                        break;
	                    case "year":
	                        this.valFmt = "yyyy";
	                        break;
	                    case "month":
	                        this.valFmt = "yyyy-MM";
	                        break;
	                    default:
	                        this.valFmt = "yyyy-MM-dd";
	                        break;
	                }
	            }
            }
        },
        watch: {
            value () {
            	this._watchValue();
                this._createValues(this.date);
                this.$parent && this.$parent.validate && this.$parent.validate(null,"change");
                this.$emit("change")
            },
            year () {
            	this.checkMaxDate();
            	this.checkMinDate();
                this._getYearList();
                this._getDays();
            },
            month () {
            	this.checkMaxDate();
            	this.checkMinDate();
                this._getDays();
            },
            day () {
            	this.checkMaxDate();
            	this.checkMinDate();
                this._getValue();
            },
            max () {
                if(this.max !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.max)){
                	this.maxDate = new Date(this.max);
                }else{
                	this.maxDate = null;
                }
            },
            min () {
                if(this.min !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.min)){
                	this.minDate = new Date(this.min);
                }else{
                	this.minDate = null;
                }
            }
        },
        computed: {
            dateStr () {
                return this.year + '-' + this.month + '-' + this.day;
            }
        },
        components: {
        	MjDatePanel,
        	MjDatetimePanel
        },
        mounted () {
            document.addEventListener("click",this._domClick);
            if(window.innerHeight - this.$refs.datePicker.getBoundingClientRect().bottom <= 300){
                this.isTop = true;
            }
        },
        created () {
        	this.init();
        },
        name:"mj-date-picker"
    }
</script>
<style scoped>
    .mj-date-picker{
        position: relative;
        display: inline-block;
        font-size: 12px;
        min-width: 120px;
        width: 166px;
    }
    .mj-date-picker .mj-date-input{
        position: relative;
        width: 100%;
        padding: 6px 10px;
        height: 34px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        border-radius: 1px;
        color:#26282c;
        border:1px solid #e7e9f3;
        background-color: #fff;
        outline: none;
    }
    .mj-date-picker .mj-date-icon{
        right: 5px;
        top: 10px;
        position: absolute;
        display: block;
        width: 13px;
        height: 15px;
        background-color: #bfcbd9;
    }
    .mj-date-picker .mj-date-icon:before{
        position: absolute;
        content: "";
        display: block;
        width: 5px;
        height: 2px;
        border-color:#bfcbd9;
        border-style: solid;
        border-top-width: 0px;
        border-left-width: 2px;
        border-bottom-width: 0px;
        border-right-width: 2px;
        background-color: transparent;
        top: -2px;
        left: 2px;
    }
    .mj-date-picker .mj-date-icon:after{
        position: absolute;
        content: "";
        display: block;
        width: 5px;
        height: 5px;
        border-color:#fff;
        border-style: solid;
        border-top-width: 3px;
        border-left-width: 6px;
        border-bottom-width: 1px;
        border-right-width: 0;
        background-color: #bfcbd9;
        top: 3px;
        left: 1px;
    }
    .mj-date-picker .mj-date-icon:hover{
        right: 5px;
        top: 10px;
        position: absolute;
        display: block;
        width: 14px;
        height: 14px;
        cursor: pointer;
        background-color: transparent;
    }
    .mj-date-picker .mj-date-icon:hover:before{
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        margin-left: -3px;
        width: 140%;
        height: 1px;
        background-color: #a2a8b4;
        transform: rotate(45deg);
        border:0;
    }
    .mj-date-picker .mj-date-icon:hover:after{
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        margin-left: -3px;
        width: 140%;
        height: 1px;
        background-color: #a2a8b4;
        transform: rotate(-45deg);
        border:0;
    }
    .mj-form-item.mj-form-error .mj-date-input{
        border-color: #ff4949;
    }
    .mj-date-picker .mj-date-main{
        position: absolute;
        left: 0;
        background-color: #fff;
        border:1px solid #e7e9f3;
        z-index: 999999999;
    }
    .mj-date-picker .mj-date-main-bottom{
        top: 44px;
    }
    .mj-date-picker .mj-date-main-top{
        bottom: 44px;
    }
    .mj-date-picker .mj-date-main .mj-date-years{
        position: relative;
        padding: 16px 12px;
        line-height: normal;
    }
    .mj-date-picker .mj-date-main .mj-date-years .mj-date-years-btn{
        float: left;
        display: inline-block;
        width: 12px;
        padding: 0 6px;
        cursor: pointer;
    }
    .mj-date-picker .mj-date-main .mj-date-years .mj-date-prev{
        position: relative;
        display: inline-block;
        border-width: 6px;
        border-style: solid;
        border-color:transparent;
        border-right-color: #97a8be;
        border-left-width:0; 
    }
    .mj-date-picker .mj-date-main .mj-date-years .mj-date-prev:after{
        content: "";
        position: absolute;
        top: -4px;
        left: 2px;
        display: block;
        border-width: 4px;
        border-style: solid;
        border-color:transparent;
        border-right-color: #fff;
        border-left-width:0; 
    }
    .mj-date-picker .mj-date-main .mj-date-years .mj-date-next{
        position: relative;
        display: inline-block;
        border-width: 6px;
        border-style: solid;
        border-color:transparent;
        border-left-color: #97a8be;
        border-right-width:0; 
    }
    .mj-date-picker .mj-date-main .mj-date-years .mj-date-next:after{
        content: "";
        position: absolute;
        top: -4px;
        left: -6px;
        display: block;
        border-width: 4px;
        border-style: solid;
        border-color:transparent;
        border-left-color: #fff;
        border-right-width:0; 
    }
    .mj-date-picker .mj-date-main .mj-date-years .mj-date-years-text{
        float: left;
        display: inline-block;
        width: 128px;
        text-align: center;
        line-height: 12px;
    }
    .mj-date-picker .mj-date-main .mj-date-years .mj-date-years-text span{
        margin: 0 3px;
        cursor: pointer;
    }
    .mj-date-picker .mj-date-main .mj-date-years .mj-date-years-text span:hover{
        color:#20a0ff;
    }
    .mj-date-picker .mj-date-button{
        height: 36px;
        text-align: right;
        border-top:1px solid #e7e9f3;
    }
    .mj-date-picker .mj-date-button .mj-date-button-yes{
        display: inline-block;
        line-height: 24px;
        width: 50px;
        margin: 5px 10px;
        background-color: #2283ef;
        color:#fff;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
    }
    .mj-date-picker .mj-date-button .mj-date-button-cancle{
        display: inline-block;
        line-height: 24px;
        width: 50px;
        margin: 5px 10px;
        border:1px solid #e7e9f3;
        border-radius: 1px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        background-color: #fff;
        color:#1f272e;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
    }
    .fade-enter-active, .fade-leave-active {
		-webkit-transition: all 0.3s;
		-o-transition: all 0.3s;
		transition: all 0.3s;
	}
	.fade-enter, .fade-leave-to {
		transform: translateY(-10px);
		opacity: 0;
	}
</style>