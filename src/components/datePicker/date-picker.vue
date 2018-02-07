<style></style>
<template>
    <div class="mj-data-picker" ref="datePicker">
        <input ref="input" type="text" class="mj-data-input" v-model="value" readonly @blur="_handleBlur" @click="_handleClick" />
        <i ref="icon" class="mj-data-icon" @click="_clearClick"></i>
        <div :class="{'mj-data-main':true,'mj-data-main-bottom':!isTop,'hidden':isHide,'mj-data-main-top':isTop}" @click="_stopPropagationFun">
            <div class="mj-data-times clearfix" v-if="type === 'time'">
                <input type="text" :value="year + '-' + month + '-' + day" />
                <input ref="timeIpt" type="text" :value="hour + ':' + minute + ':' + second" @click="_timeClick" @blur="_timeBlur" />
                <div :class="{'mj-data-times-main':true,'hidden':isTimeHide}">
                    <div class="mj-data-times-list clearfix">
                        <div>
                            <div ref="hourList" v-mjscrolltop="(+hour - 2) * 32">
                                <ul>
                                    <li v-for="i in 24" @click="_selectHour(i - 1)" :class="{'mj-currtime':i - 1 === +hour}">{{addZero(i - 1)}}</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div ref="minuteList" v-mjscrolltop="(+minute - 2) * 32">
                                <ul>
                                    <li v-for="i in 60" @click="_selectMinute(i - 1)" :class="{'mj-currtime':i - 1 === +minute}">{{addZero(i - 1)}}</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div ref="secondList" v-mjscrolltop="(+second - 2) * 32">
                                <ul>
                                    <li v-for="i in 60" @click="_selectSecond(i - 1)" :class="{'mj-currtime':i - 1 === +second}">{{addZero(i - 1)}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="mj-data-times-btns">
                        <div @click="_hideTimeList">确定</div>
                    </div>
                </div>
            </div>
            <div class="mj-data-years clearfix">
                <div class="mj-data-years-btn mj-data-prev-year" @click="prevYear">
                    <i class="mj-data-prev"></i><i class="mj-data-prev"></i>
                </div>
                <div class="mj-data-years-btn mj-data-prev-month" @click="prevMonth">
                    <i class="mj-data-prev"></i>
                </div>
                <div class="mj-data-years-text">
                    <span @click="_showYearList">{{year}} 年</span>
                    <span @click="_showMonthList" v-if="type !== 'year'">{{month}} 月</span>
                </div>
                <div class="mj-data-years-btn mj-data-next-month" @click="nextMonth">
                    <i class="mj-data-next"></i>
                </div>
                <div class="mj-data-years-btn mj-data-next-year" @click="nextYear">
                    <i class="mj-data-next"></i><i class="mj-data-next"></i>
                </div>
                <div :class="{'mj-data-yearList':true,'hidden':isMonthHide}">
                    <dl v-for="(m,i) in monthList" :class="{'currYear':(i + 1) === +month,'disabledYear':computedDisabledMonthFlag(i + 1)}" @click="_monthClick(i + 1)">{{m}}</dl>
                </div>
                <div :class="{'mj-data-yearList':true,'hidden':isYearHide}">
                    <dl v-for="y in yearList" :class="{'currYear':y === +year,'disabledYear':computedDisabledMonthFlag(y)}" @click="_yearClick(y)">{{y}}</dl>
                </div>
            </div>
            <div class="mj-data-list clearfix">
                <dl v-for="weekText in weekTextList">{{weekText}}</dl>
                <dl v-for="i in weekDay"></dl>
                <dl v-for="i in days" :class="{'mj-data-current':+day === i,'mj-data-day':true,'mj-data-disabled':computedDisabledDayFlag(i)}" @click="_selectDay(i)">{{addZero(i)}}</dl>
            </div>
            <div class="mj-data-button">
                <div class="mj-data-button-cancle" @click="_handleCancle">取消</div>
                <div class="mj-data-button-yes" @click="_handleYes">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
    import { addZero } from "../../util.js";
    export default {
        props:{
            value:String,
            type:{
                type:String,
                default:"date"
            },
            max:String,
            min:String
        },
        data:function(){
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
                isTimeHide:true,
                isYearHide:true,
                isMonthHide:true,
                yearList:[],
                monthList:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                weekTextList:["日","一","二","三","四","五","六"],
                isTop:false,
                maxYear:-1,
                maxMonth:-1,
                maxDay:-1,
                minYear:-1,
                minMonth:-1,
                minDay:-1
            }
        },
        methods:{
            addZero,
            computedDisabledDayFlag:function(day){
                return this.year === this.minYear && this.month === this.minMonth && day < this.minDay || (this.year === this.maxYear && this.month === this.maxMonth && this.maxDay !== -1 && day > this.maxDay);
            },
            computedDisabledMonthFlag:function(month){
                return this.maxYear === this.year && this.maxMonth < month || (this.minYear === this.year && this.minMonth > month);
            },
            computedDisabledYearFlag:function(year){
                return this.maxYear !== -1 && this.maxYear < year || year < this.minYear;
            },
            checkMaxMonth:function(){
                if(this.maxMonth !== -1 && this.maxMonth <= this.month){
                    this.month = this.maxMonth;
                    if(this.maxDay !== -1 && this.maxDay < this.day){
                        this.day = this.maxDay;
                    }
                }
            },
            checkMinMonth:function(){
                if(this.minMonth !== -1 && this.minMonth >= this.month){
                    this.month = this.minMonth;
                    if(this.minDay !== -1 && this.minDay > this.day){
                        this.day = this.minDay;
                    }
                }
            },
            checkMaxDay:function(){
                if(this.maxDay !== -1 && this.maxDay < this.day){
                    this.day = this.maxDay;
                }
            },
            checkMinDay:function(){
                if(this.minDay !== -1 && this.minDay > this.day){
                    this.day = this.minDay;
                }
            },
            prevYear:function(){
                if(!this.isYearHide){
                    if(this.yearList[0] > this.minYear){
                        this._getYearList(this.yearList[0] - 10);
                    }
                }else if(this.year > this.minYear){
                    this.year = +this.year - 1 + "";
                    this.checkMaxMonth();
                    this.checkMinMonth();
                }
            },
            prevMonth:function(){
                if(!this.isYearHide){
                    if(+this.year % 10 === 0){
                        if(this.maxYear !== -1 && +this.year + 9 > this.maxYear){
                            this.year = this.maxYear;
                        }else{
                            this.year = +this.year + 9 + "";
                        }
                    }else{
                        if(this.year > this.minYear){
                            this.year = +this.year - 1 + "";
                        }
                    }
                }else if(!this.isMonthHide){
                    if(+this.month % 12 === 1){
                        if(this.maxMonth != -1 && this.year === this.maxYear && +this.month + 11 > this.maxMonth){
                            this.month = this.maxMonth;
                        }else{
                            this.month = this.addZero(+this.month + 11) + "";
                        }
                    }else{
                        if(this.year === this.minYear && this.month > this.minMonth){
                            this.month = this.addZero(+this.month - 1) + "";
                        }
                    }
                }else if(this.minYear === -1 || this.minYear !== this.year || this.month > this.minMonth){
                    if(+this.month <= 1){
                        this.year = +this.year - 1 + "";
                        this.month = "12";
                    }else{
                        this.month = this.addZero(+this.month - 1) + "";
                    }
                }
                this.checkMaxMonth();
                this.checkMinMonth();
            },
            nextYear:function(){
                if(!this.isYearHide){
                    if(this.maxYear === -1 || this.yearList[9] < this.maxYear){
                        this._getYearList(this.yearList[0] + 10);
                    }
                }else if(this.maxYear === -1 || this.year < this.maxYear){
                    this.year = +this.year + 1 + "";
                    this.checkMaxMonth();
                    this.checkMinMonth();
                }
            },
            nextMonth:function(){
                if(!this.isYearHide){
                    if(+this.year % 10 === 9){
                        if(+this.year + 9 < this.minYear){
                            this.year = this.minYear;
                        }else{
                            this.year = +this.year - 9 + "";
                        }
                    }else if(this.maxYear === -1 || this.year < this.maxYear){
                        this.year = +this.year + 1 + "";
                    }
                }else if(!this.isMonthHide){
                    if(+this.month % 12 === 0){
                        if(this.year !== this.minYear || +this.minMonth <= 1){
                            this.month = this.addZero(+this.month - 11) + "";
                        }else{
                            this.month = this.minMonth;
                        }
                    }else{
                        if(this.year !== this.maxYear || +this.maxMonth > this.month){
                            this.month = this.addZero(+this.month + 1) + "";
                        }
                    }
                }else if(this.maxYear === -1 || this.maxYear !== this.year || this.maxMonth === -1 || this.month < this.maxMonth){
                    if(+this.month >= 12){
                        this.year = +this.year + 1 + "";
                        this.month = "01";
                    }else{
                        this.month = this.addZero(+this.month + 1) + "";
                    }
                }
                this.checkMaxMonth();
                this.checkMinMonth();
            },
            _showYearList:function(){
                if(this.type !== "year"){
                    this.isYearHide = !this.isYearHide;
                    if(this.type !== "month"){
                        this.isMonthHide = true;
                    }
                }
            },
            _showMonthList:function(){
                if(this.type !== "month" && this.type !== "year"){
                    this.isMonthHide = !this.isMonthHide;
                    this.isYearHide = true;
                }
            },
            _yearClick:function(year){
                if(!this.computedDisabledYearFlag(year)){
                    this.year = year;
                    if(this.type !== "year"){
                        this.isYearHide = true;
                    }
                    this.checkMaxMonth();
                    this.checkMinMonth();
                }
            },
            _monthClick:function(month){
                if(!this.computedDisabledMonthFlag(month)){
                    this.month = this.addZero(month);
                    if(this.type !== "month"){
                        this.isMonthHide = true;
                    }
                    this.checkMaxDay();
                    this.checkMinDay();
                }
            },
            _hideTimeList:function(){
                this.isTimeHide = true;
            },
            _timeBlur:function(){
                if(/^([0-1]\d|2[0-4])\:([0-5]\d|60)\:([0-5]\d|60)$/.test(this.$refs.timeIpt.value)){
                    var arr = this.$refs.timeIpt.value.split(":");
                    this.hour = arr[0];
                    this.minute = arr[1];
                    this.second = arr[2];
                }
            },
            _timeClick:function(){
                this.isTimeHide = false;
            },
            _selectHour:function(h){
                this.hour = this.addZero(h);
            },
            _selectMinute:function(m){
                this.minute = this.addZero(m);
            },
            _selectSecond:function(s){
                this.second = this.addZero(s);
            },
            _correctionDate:function(){
                var y = +this.year;
                var m = +this.month;
                var d = +this.day;
                if(m === 2){
                    if((y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0) && d > 29)){
                        this.day = "29";
                    }else if(d > 28){
                        this.day = "28";
                    }
                }else if(d > 30 && (m % 2 === 0 && m < 8 || (m % 2 === 1 && m > 7))){
                    this.day = "30";
                }
            },
            _getValue:function(){
                var str = "";
                switch(this.type){
                    case "date":
                        str = this.year + "-" + this.month + "-" + this.day;
                        break;
                    case "time":
                        str = this.year + "-" + this.month + "-" + this.day + " " + this.hour + ":" + this.minute + ":" + this.second;
                        break;
                    case "year":
                        str = this.year;
                        break;
                    case "month":
                        str = this.year + "-" + this.month;
                        break;
                    default:
                        str = this.year + "-" + this.month + "-" + this.day;
                        break;
                }
                this.currValue = str;
            },
            _getDays:function(){
                this.weekDay = new Date(this.year + "-" + this.month).getDay();
                if(this.month === "02"){
                    if((this.year % 100 === 0 && this.year % 400 === 0) || (this.year % 100 !== 0 && this.year % 4 === 0)){
                        this.days = 29;
                        if(+this.day > 29){
                            this.day = "29";
                        }
                    }else{
                        this.days = 28
                        if(+this.day > 28){
                            this.day = "28";
                        }
                    }
                }else{
                    if((+this.month < 8 && +this.month % 2 === 0) || (+this.month > 7 && +this.month % 2 === 1)){
                        this.days = 30;
                        if(+this.day > 30){
                            this.day = "30";
                        }
                    }else{
                        this.days = 31;
                    }
                }
            },
            _createValues:function(date){
                this.year = date.getFullYear() + "";
                this.month = this.addZero(date.getMonth() + 1) + "";
                this.day = this.addZero(date.getDate()) + "";
                this.hour = this.addZero(date.getHours()) + "";
                this.minute = this.addZero(date.getMinutes()) + "";
                this.second = this.addZero(date.getSeconds()) + "";
                this._getDays();
            },
            _handleBlur:function(e){
                this.currValue = e.target.value;
                this.$emit("input",e.target.value);
                if(this.currValue){
                    var d = new Date(this.currValue);
                }else{
                    var d = new Date();
                }
                if(d != "Invalid Date"){
                    this.date = d;
                }
                this._createValues(this.date);
            },
            _handleClick:function(){
                this.isHide = !this.isHide;
            },
            _clearClick:function(){
                this.$emit("input","");
            },
            _handleYes:function(){
                this.isHide = true;
                this._getValue();
                this.$emit("input",this.currValue);
            },
            _handleCancle:function(){
                this.isHide = true;
            },
            _selectDay:function(day){
                this.day = this.addZero(day) + "";
                this._getValue();
                if(this.type !== "time"){
                    this.isHide = true;
                    this.$emit("input",this.currValue);
                }
            },
            _getYearList:function(year){
                year = year || this.year;
                var y = ~~(year / 10) * 10;
                var arr = []
                for(var i = 0;i < 10;i++){
                    arr[i] = y + i;
                }
                this.yearList = arr;
            },
            _domClick:function(e){
                if(e.target !== this.$refs.datePicker && e.target !== this.$refs.input && e.target !== this.$refs.icon){
                    this.isHide = true;
                }
            },
            _stopPropagationFun:function(e){
                if(e && e.stopPropagation){
                    e.stopPropagation();
                }else{
                    window.event.cancelBubble = true;
                }
            }
        },
        watch:{
            value:function(){
                this.currValue = this.value;
                if(this.currValue){
                    var d = new Date(this.currValue);
                }else{
                    var d = new Date();
                }
                if(d != "Invalid Date"){
                    this.date = d;
                }
                this._createValues(this.date);
                this.$parent && this.$parent.validate && this.$parent.validate(null,"change");
                this.$emit("change")
            },
            year:function(){
                this._correctionDate();
                this._getYearList();
                this._getDays();
            },
            month:function(){
                this._correctionDate();
                this._getDays();
            },
            max:function(){
                if(this.max !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.max)){
                    this.maxYear = this.max.substr(0,4);
                    if(this.max.length >= 7){
                        this.maxMonth = this.max.substr(5,2);
                    }
                    if(this.max.length === 10){
                        this.maxDay = this.max.substr(8,2);
                    }
                }else{
                    this.maxYear = -1;
                    this.maxMonth = -1;
                    this.maxDay = -1;
                }
            },
            min:function(){
                if(this.min !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.min)){
                    this.minYear = this.min.substr(0,4);
                    if(this.min.length >= 7){
                        this.minMonth = this.min.substr(5,2);
                    }
                    if(this.min.length === 10){
                        this.minDay = this.min.substr(8,2);
                    }
                }else{
                    this.minYear = -1;
                    this.minMonth = -1;
                    this.minDay = -1;
                }
            },
            isTimeHide:function(){
                if(/^([0-1]\d|2[0-4])\:([0-5]\d|60)\:([0-5]\d|60)$/.test(this.$refs.timeIpt.value)){
                    var arr = this.$refs.timeIpt.value.split(":");
                    this.hour = arr[0];
                    this.minute = arr[1];
                    this.second = arr[2];
                }
            }
        },
        created:function(){
            this.currValue = this.value;
            if(this.value){
                this.date = new Date(this.value);
            }else{
                this.date = new Date();
            }
            if(this.date == "Invalid Date"){
                this.date = new Date();
            }
            this.year = this.date.getFullYear() + "";
            this.month = this.addZero(this.date.getMonth() + 1) + "";
            this.day = this.addZero(this.date.getDate()) + "";
            this.hour = this.addZero(this.date.getHours()) + "";
            this.minute = this.addZero(this.date.getMinutes()) + "";
            this.second = this.addZero(this.date.getSeconds()) + "";
            this.weekDay = new Date(this.year + "-" + this.month).getDay();
            this._getDays();
            this._getYearList();
            if(this.type === "month"){
                this.isMonthHide = false;
            }
            if(this.type === "year"){
                this.isYearHide = false;
            }
            if(this.max !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.max)){
                this.maxYear = this.max.substr(0,4);
                if(this.max.length >= 7){
                    this.maxMonth = this.max.substr(5,2);
                }
                if(this.max.length === 10){
                    this.maxDay = this.max.substr(8,2);
                }
            }
            if(this.min !== "" && /^\d{4}(\-(0\d|1[0|1|2])(\-([0|1|2]\d|(30|31)))?)?$/.test(this.min)){
                this.minYear = this.min.substr(0,4);
                if(this.min.length >= 7){
                    this.minMonth = this.min.substr(5,2);
                }
                if(this.min.length === 10){
                    this.minDay = this.min.substr(8,2);
                }
            }
        },
        mounted:function(){
            document.addEventListener("click",this._domClick);
            if(window.innerHeight - this.$refs.datePicker.getBoundingClientRect().bottom <= 300){
                this.isTop = true;
            }
        },
        name:"mj-date-picker"
    }
</script>