<template>
    <div class="mj-date-panel">
        <div class="mj-date-yearList" v-show="isMonthHide === false || (type === 'month' && isYearHide === true)">
            <template v-for="(m, i) in monthList">
                <dl
                    v-if="computedDisabledMonthFlag(i + 1)"
                    class="disabledYear"
                    :class="{'currYear':(i + 1) === +month}">
                    {{m}}
                </dl>
                <dl
                    v-else
                    :class="{'currYear':(i + 1) === +month}"
                    @click="_monthClick(i + 1)">
                    {{m}}
                </dl>
            </template>
        </div>
        <div class="mj-date-yearList" v-show="type === 'year' || isYearHide === false">
            <template v-for="y in yearList">
                <dl
                    v-if="computedDisabledYearFlag(y)"
                    class="disabledYear"
                    :key="y"
                    :class="{'currYear':y === +year}">
                    {{y}}
                </dl>
                <dl
                    v-else
                    :key="y"
                    :class="{'currYear':y === +year}"
                    @click="_yearClick(y)">
                    {{y}}
                </dl>
            </template>
        </div>
        <div class="mj-date-list clearfix" v-show="(type === 'date' || type === 'datetime') && isMonthHide && isYearHide">
            <dl v-for="weekText in weekTextList">{{weekText}}</dl>
            <dl v-for="i in weekDay"></dl>
            <template v-for="i in days">
                <dl
                    v-if="computedDisabledDayFlag(i)"
                    class="mj-date-day mj-date-disabled"
                    :key="i"
                    :class="{'mj-date-current':+day === i}">
                    {{addZero(i)}}
                </dl>
                <dl
                    v-else
                    class="mj-date-day"
                    :key="i"
                    :class="{'mj-date-current':+day === i}" 
                    @click="_selectDay(i)">
                    {{addZero(i)}}
                </dl>
            </template>
        </div>
    </div>
</template>
<script>
    import { addZero, dateFmt } from "../../util.js";
    export default {
        data () {
            return {
                monthList: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                weekTextList:["日","一","二","三","四","五","六"]
            }
        },
        props: {
            type:{
                type:String,
                default:"date"
            },
            minDate: {
                validator (val) {
                    return val === null || val instanceof Date;
                }
            },
            maxDate: {
                validator (val) {
                    return val === null || val instanceof Date;
                }
            },
            day: String,
            month: String,
            year: String,
            isMonthHide: {
                type: Boolean,
                default: true
            },
            isYearHide: {
                type: Boolean,
                default: true
            },
            yearList: Array,
            days: {
                type: Number,
                default: 30
            },
            weekDay: {
                type: Number,
                default: 0
            }
        },
        methods: {
            addZero,
            computedDisabledDayFlag (day) {
                let time = new Date(dateFmt(new Date(this.year, this.month - 1, day), "yyyy-MM-dd")).getTime();
                return (this.maxDate && this.maxDate.getTime() < time) || (this.minDate && this.minDate.getTime() > time);
            },
            computedDisabledMonthFlag (month) {
                let time = new Date(dateFmt(new Date(this.year, month - 1, this.day), "yyyy-MM-dd")).getTime();
                return (this.maxDate && this.maxDate.getTime() < time) || (this.minDate && this.minDate.getTime() > time);
            },
            computedDisabledYearFlag (year) {
                let time = new Date(dateFmt(new Date(year, this.month - 1, this.day), "yyyy-MM-dd")).getTime();
                return (this.maxDate && this.maxDate.getTime() < time) || (this.minDate && this.minDate.getTime() > time);
            },
            _yearClick (year) {
                this.$emit("update:year", year + "");
                if(this.type !== "year"){
                    this.$emit("update:isYearHide", true);
                }
            },
            _monthClick (month) {
                this.$emit("update:month", addZero(month));
                if(this.type !== "month"){
                    this.$emit("update:isMonthHide", true);
                }
            },
            _selectDay (day) {
                this.$emit("update:day", addZero(day));
            }
        },
        name: "mj-date-panel"
    }
</script>
<style scoped>
    .mj-date-panel .mj-date-yearList{
        padding: 0 12px 12px;
        width: 224px;
        height: 224px;
        background-color: #fff;
    }
    .mj-date-panel .mj-date-yearList dl{
        display: inline-block;
        margin: 32px 3px 0;
        width: 48px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
    }
    .mj-date-panel .mj-date-yearList dl.currYear{
        background-color: #2283ef;
        color: #fff;
    }
    .mj-date-panel .mj-date-yearList dl.disabledYear{
        background-color: #efefef;
        color: #ddd;
        cursor: default;
    }
    .mj-date-panel .mj-date-list{
        padding: 0 12px 12px;
        width: 224px;
        height: 224px;
    }
    .mj-date-panel .mj-date-list dl{
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
    .mj-date-panel .mj-date-list dl.mj-date-day{
        cursor: pointer;
    }
    .mj-date-panel .mj-date-list dl.mj-date-disabled{
        cursor: default;
        background-color: #efefef;
        color:#ddd;
    }
    .mj-date-panel .mj-date-list dl.mj-date-current{
        background-color: #2283ef;
        color: #fff;
    }
</style>