<style></style>
<template>
    <div class="mj-data-picker" ref="datePicker">
        <input 
            ref="input" 
            type="text" 
            class="mj-data-input" 
            v-model="value" 
            readonly 
            @blur="_handleBlur" 
            @click="_handleClick" />
        <i 
            ref="icon" 
            class="mj-data-icon" 
            @click="_clearClick"></i>
        <div 
            :class="[
                'mj-data-main',
                {
                    'mj-data-main-bottom': !isTop,
                    'hidden': isHide,
                    'mj-data-main-top': isTop
                }
            ]" 
            @click="_stopPropagationFun">
            <div 
                class="mj-data-times clearfix" 
                v-if="type === 'datetime'">
                <input 
                    type="text" 
                    :value="dateStr" />
                <input 
                    ref="timeIpt" type="text" 
                    :value="timeStr" 
                    @click="_timeClick" 
                    @blur="_timeBlur" />
                <div :class="['mj-data-times-main', {'hidden':isTimeHide}]">
                    <div class="mj-data-times-list clearfix">
                        <div>
                            <div ref="hourList" v-mjscrolltop="(+hour - 2) * 32">
                                <ul>
                                    <li 
                                        v-for="i in 24" 
                                        @click="_selectHour(i - 1)" 
                                        :class="{'mj-currtime':i - 1 === +hour}">
                                        {{addZero(i - 1)}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div ref="minuteList" v-mjscrolltop="(+minute - 2) * 32">
                                <ul>
                                    <li 
                                        v-for="i in 60" 
                                        @click="_selectMinute(i - 1)" 
                                        :class="{'mj-currtime':i - 1 === +minute}">
                                        {{addZero(i - 1)}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div ref="secondList" v-mjscrolltop="(+second - 2) * 32">
                                <ul>
                                    <li 
                                        v-for="i in 60" 
                                        @click="_selectSecond(i - 1)" 
                                        :class="{'mj-currtime':i - 1 === +second}">
                                        {{addZero(i - 1)}}
                                    </li>
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
            </div>
            <div class="mj-data-yearList" v-show="type === 'month' || isMonthHide === false">
                <dl 
                    v-for="(m,i) in monthList" 
                    :class="{'currYear':(i + 1) === +month,'disabledYear':computedDisabledMonthFlag(i + 1)}" 
                    @click="_monthClick(i + 1)">
                    {{m}}
                </dl>
            </div>
            <div class="mj-data-yearList" v-show="type === 'year' || isYearHide === false">
                <dl 
                    v-for="y in yearList" 
                    :class="{'currYear':y === +year,'disabledYear':computedDisabledMonthFlag(y)}" 
                    @click="_yearClick(y)">
                    {{y}}
                </dl>
            </div>
            <div class="mj-data-list clearfix" v-show="(type === 'date' || type === 'datetime') && isMonthHide && isYearHide">
                <dl v-for="weekText in weekTextList">{{weekText}}</dl>
                <dl v-for="i in weekDay"></dl>
                <dl 
                    v-for="i in days" 
                    :class="[
                        'mj-data-day',
                        {
                            'mj-data-current':+day === i,
                            'mj-data-disabled':computedDisabledDayFlag(i)
                        }
                    ]" 
                    @click="_selectDay(i)">
                    {{addZero(i)}}
                </dl>
            </div>
            <div class="mj-data-button">
                <div class="mj-data-button-cancle" @click="_handleCancle">取消</div>
                <div class="mj-data-button-yes" @click="_handleYes">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
    import { addZero, dateFmt } from "../../util.js";
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
                minDay:-1,
                valFmt: "yyyy-MM-dd"
            }
        },
        methods:{
            addZero,
            computedDisabledDayFlag (day) {
                return this.year === this.minYear && this.month === this.minMonth && day < this.minDay || (this.year === this.maxYear && this.month === this.maxMonth && this.maxDay !== -1 && day > this.maxDay);
            },
            computedDisabledMonthFlag (month) {
                return this.maxYear === this.year && this.maxMonth < month || (this.minYear === this.year && this.minMonth > month);
            },
            computedDisabledYearFlag (year) {
                return this.maxYear !== -1 && this.maxYear < year || year < this.minYear;
            },
            checkMaxMonth () {
                if(this.maxMonth !== -1 && this.maxMonth <= this.month){
                    this.month = this.maxMonth;
                    if(this.maxDay !== -1 && this.maxDay < this.day){
                        this.day = this.maxDay;
                    }
                }
            },
            checkMinMonth () {
                if(this.minMonth !== -1 && this.minMonth >= this.month){
                    this.month = this.minMonth;
                    if(this.minDay !== -1 && this.minDay > this.day){
                        this.day = this.minDay;
                    }
                }
            },
            checkMaxDay () {
                if(this.maxDay !== -1 && this.maxDay < this.day){
                    this.day = this.maxDay;
                }
            },
            checkMinDay () {
                if(this.minDay !== -1 && this.minDay > this.day){
                    this.day = this.minDay;
                }
            },
            prevYear () {
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
            prevMonth () {
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
            nextYear () {
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
            nextMonth () {
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
            _showYearList () {
                if(this.type !== "year"){
                    this.isYearHide = !this.isYearHide;
                    if(this.type !== "month"){
                        this.isMonthHide = true;
                    }
                }
            },
            _showMonthList () {
                if(this.type !== "month" && this.type !== "year"){
                    this.isMonthHide = !this.isMonthHide;
                    this.isYearHide = true;
                }
            },
            _yearClick (year) {
                if(!this.computedDisabledYearFlag(year)){
                    this.year = year;
                    if(this.type !== "year"){
                        this.isYearHide = true;
                    }
                    this.checkMaxMonth();
                    this.checkMinMonth();
                }
            },
            _monthClick (month) {
                if(!this.computedDisabledMonthFlag(month)){
                    this.month = this.addZero(month);
                    if(this.type !== "month"){
                        this.isMonthHide = true;
                    }
                    this.checkMaxDay();
                    this.checkMinDay();
                }
            },
            _hideTimeList () {
                this.isTimeHide = true;
            },
            _timeBlur () {
                if(/^([0-1]\d|2[0-4])\:([0-5]\d|60)\:([0-5]\d|60)$/.test(this.$refs.timeIpt.value)){
                    var arr = this.$refs.timeIpt.value.split(":");
                    this.hour = arr[0];
                    this.minute = arr[1];
                    this.second = arr[2];
                }
            },
            _timeClick () {
                this.isTimeHide = false;
            },
            _selectHour (h) {
                this.hour = this.addZero(h);
            },
            _selectMinute (m) {
                this.minute = this.addZero(m);
            },
            _selectSecond (s) {
                this.second = this.addZero(s);
            },
            _correctionDate () {
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
            _getValue () {
                var str = "";
                switch(this.type){
                    case "date":
                        str = this.year + "-" + this.month + "-" + this.day;
                        break;
                    case "datetime":
                        str = this.year + "-" + this.month + "-" + this.day + " " + this.hour + ":" + this.minute + ":" + this.second;
                        break;
                    case "year":
                        str = this.year + "";
                        break;
                    case "month":
                        str = this.year + "-" + this.month;
                        break;
                    default:
                        str = this.year + "-" + this.month + "-" + this.day;
                        break;
                }
                this.currValue = dateFmt(new Date(this.year, this.month, this.day, this.hour, this.minute, this.second), this.valFmt);;
            },
            _getDays () {
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
            _selectDay (day) {
                this.day = this.addZero(day) + "";
                this._getValue();
                if(this.type !== "datetime"){
                    this.isHide = true;
                    this.$emit("input",this.currValue);
                }
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
            }
        },
        watch: {
            value () {
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
            year () {
                this._correctionDate();
                this._getYearList();
                this._getDays();
            },
            month () {
                this._correctionDate();
                this._getDays();
            },
            max () {
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
            min () {
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
            isTimeHide () {
                if(/^([0-1]\d|2[0-4])\:([0-5]\d|60)\:([0-5]\d|60)$/.test(this.$refs.timeIpt.value)){
                    var arr = this.$refs.timeIpt.value.split(":");
                    this.hour = arr[0];
                    this.minute = arr[1];
                    this.second = arr[2];
                }
            }
        },
        computed: {
            dateStr () {
                return this.year + '-' + this.month + '-' + this.day;
            },
            timeStr () {
                return this.hour + ':' + this.minute + ':' + this.second;
            }
        },
        mounted () {
            document.addEventListener("click",this._domClick);
            if(window.innerHeight - this.$refs.datePicker.getBoundingClientRect().bottom <= 300){
                this.isTop = true;
            }
        },
        created () {
            this.currValue = this.value;
            if (this.value) {
                this.date = new Date(this.value);
            } else {
                this.date = new Date();
            }
            if (this.date == "Invalid Date") {
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
        },
        name:"mj-date-picker"
    }
</script>
<style scoped>
    .mj-data-picker{
        position: relative;
        display: inline-block;
        font-size: 12px;
        min-width: 120px;
        width: 166px;
    }
    .mj-data-picker .mj-data-input{
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
    .mj-data-picker .mj-data-icon{
        right: 5px;
        top: 10px;
        position: absolute;
        display: block;
        width: 13px;
        height: 15px;
        background-color: #bfcbd9;
    }
    .mj-data-picker .mj-data-icon:before{
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
    .mj-data-picker .mj-data-icon:after{
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
    .mj-data-picker .mj-data-icon:hover{
        right: 5px;
        top: 10px;
        position: absolute;
        display: block;
        width: 14px;
        height: 14px;
        cursor: pointer;
        background-color: transparent;
    }
    .mj-data-picker .mj-data-icon:hover:before{
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
    .mj-data-picker .mj-data-icon:hover:after{
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
    .mj-form-item.mj-form-error .mj-data-input{
        border-color: #ff4949;
    }
    .mj-data-picker .mj-data-times{
        padding: 8px 12px 5px;
        border-bottom:1px solid #e7e9f3;
    }
    .mj-data-picker .mj-data-times>input{
        float: left;
        display: inline-block;
        padding: 6px 10px;
        width: 106px;
        height: 32px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        border-radius: 1px;
        color:#26282c;
        border:1px solid #e7e9f3;
        background-color: #fff;
        outline: none;
    }
    .mj-data-picker .mj-data-times>input:first-child{
        margin-right: 12px;
    }
    .mj-data-picker .mj-data-times .mj-data-times-main{
        position: absolute;
        left: 124px;
        width: 122px;
        top: 45px;
        background-color: #fff;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        border:1px solid #e7e9f3;
        z-index: 999999;
    }
    .mj-data-picker .mj-data-times .mj-data-times-main .mj-data-times-list{
        width: 100%;
        height: 160px;
        border-bottom: 1px solid #e7e9f3;
    }
    .mj-data-picker .mj-data-times .mj-data-times-main .mj-data-times-list>div{
        float: left;
        width: 40px;
        height: 100%;
        display: inline-block;
        overflow: hidden;
    }
    .mj-data-picker .mj-data-times .mj-data-times-main .mj-data-times-list>div>div{
        width: 60px;
        height: 100%;
        display: inline-block;
        overflow: auto;
    }
    .mj-data-picker .mj-data-times .mj-data-times-main .mj-data-times-list ul{
        width: 40px;
    }
    .mj-data-picker .mj-data-times .mj-data-times-main .mj-data-times-list ul li{
        width: 40px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
    }
    .mj-data-picker .mj-data-times .mj-data-times-main .mj-data-times-list ul li.mj-currtime{
        background-color: #2283ef;
        color: #fff;
    }
    .mj-data-picker .mj-data-times .mj-data-times-btns{
        height: 36px;
        text-align: right;
    }
    .mj-data-picker .mj-data-times .mj-data-times-btns>div{
        display: inline-block;
        line-height: 36px;
        margin: 0 10px;
        color: #2283ef;
        font-size: 12px;
        cursor: pointer;
    }
    .mj-data-picker .mj-data-main{
        position: absolute;
        left: 0;
        background-color: #fff;
        border:1px solid #e7e9f3;
        z-index: 999999999;
    }
    .mj-data-picker .mj-data-main-bottom{
        top: 44px;
    }
    .mj-data-picker .mj-data-main-top{
        bottom: 44px;
    }
    .mj-data-picker .mj-data-main .mj-data-years{
        position: relative;
        padding: 16px 12px;
        line-height: normal;
    }
    .mj-data-picker .mj-data-main .mj-data-years .mj-data-years-btn{
        float: left;
        display: inline-block;
        width: 12px;
        padding: 0 6px;
        cursor: pointer;
    }
    .mj-data-picker .mj-data-main .mj-data-years .mj-data-prev{
        position: relative;
        display: inline-block;
        border-width: 6px;
        border-style: solid;
        border-color:transparent;
        border-right-color: #97a8be;
        border-left-width:0; 
    }
    .mj-data-picker .mj-data-main .mj-data-years .mj-data-prev:after{
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
    .mj-data-picker .mj-data-main .mj-data-years .mj-data-next{
        position: relative;
        display: inline-block;
        border-width: 6px;
        border-style: solid;
        border-color:transparent;
        border-left-color: #97a8be;
        border-right-width:0; 
    }
    .mj-data-picker .mj-data-main .mj-data-years .mj-data-next:after{
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
    .mj-data-picker .mj-data-main .mj-data-years .mj-data-years-text{
        float: left;
        display: inline-block;
        width: 128px;
        text-align: center;
        line-height: 12px;
    }
    .mj-data-picker .mj-data-main .mj-data-years .mj-data-years-text span{
        margin: 0 3px;
        cursor: pointer;
    }
    .mj-data-picker .mj-data-main .mj-data-years .mj-data-years-text span:hover{
        color:#20a0ff;
    }
    .mj-data-picker .mj-data-main .mj-data-yearList{
        padding: 0 12px 12px;
        width: 224px;
        height: 224px;
        background-color: #fff;
    }
    .mj-data-picker .mj-data-main .mj-data-yearList dl{
        display: inline-block;
        margin: 32px 3px 0;
        width: 48px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
    }
    .mj-data-picker .mj-data-main .mj-data-yearList dl.currYear{
        background-color: #2283ef;
        color: #fff;
    }
    .mj-data-picker .mj-data-main .mj-data-yearList dl.disabledYear{
        background-color: #efefef;
        color: #ddd;
        cursor: default;
    }
    .mj-data-picker .mj-data-main .mj-data-list{
        padding: 0 12px 12px;
        width: 224px;
        height: 224px;
    }
    .mj-data-picker .mj-data-main .mj-data-list dl{
        float: left;
        padding: 8px;
        width: 16px;
        display: inline-block;
        height: 16px;
        line-height: 16px;
        text-align: center;
        background-color: #fff;
        color: #48576a;
    }
    .mj-data-picker .mj-data-main .mj-data-list dl.mj-data-day{
        cursor: pointer;
    }
    .mj-data-picker .mj-data-main .mj-data-list dl.mj-data-disabled{
        cursor: default;
        background-color: #efefef;
        color:#ddd;
    }
    .mj-data-picker .mj-data-main .mj-data-list dl.mj-data-current{
        background-color: #2283ef;
        color: #fff;
    }
    .mj-data-picker .mj-data-button{
        height: 36px;
        text-align: right;
        border-top:1px solid #e7e9f3;
    }
    .mj-data-picker .mj-data-button .mj-data-button-yes{
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
    .mj-data-picker .mj-data-button .mj-data-button-cancle{
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
</style>