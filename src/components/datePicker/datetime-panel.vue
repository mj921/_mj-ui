<template>
    <div class="mj-date-times clearfix">
        <input 
            type="text" 
            :value="dateStr" />
        <input 
            ref="timeIpt"
            type="text" 
            :value="timeStr" 
            @click="_timeClick" 
            @blur="_timeBlur" />
        <div v-show="!isTimeHide" class="mj-date-times-main">
            <div class="mj-date-times-list clearfix">
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
            <div class="mj-date-times-btns">
                <div @click="_hideTimeList">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
    import { addZero } from "../../util.js";
    export default {
        data () {
            return {
                isTimeHide: true
            }
        },
        props: {
            hour: String,
            minute: String,
            second: String,
            dateStr: String
        },
        methods: {
            addZero,
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
                this.$emit("update:hour", this.addZero(h));
            },
            _selectMinute (m) {
                this.$emit("update:minute", this.addZero(m));
            },
            _selectSecond (s) {
                this.$emit("update:second", this.addZero(s));
            }
        },
        watch: {
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
            timeStr () {
                return this.hour + ':' + this.minute + ':' + this.second;
            }
        },
        name: "mj-datetime-panel"
    }
</script>
<style scoped>
    .mj-date-picker .mj-date-times{
        padding: 8px 12px 5px;
        border-bottom:1px solid #e7e9f3;
    }
    .mj-date-picker .mj-date-times>input{
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
    .mj-date-picker .mj-date-times>input:first-child{
        margin-right: 12px;
    }
    .mj-date-picker .mj-date-times .mj-date-times-main{
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
    .mj-date-picker .mj-date-times .mj-date-times-main .mj-date-times-list{
        width: 100%;
        height: 160px;
        border-bottom: 1px solid #e7e9f3;
    }
    .mj-date-picker .mj-date-times .mj-date-times-main .mj-date-times-list>div{
        float: left;
        width: 40px;
        height: 100%;
        display: inline-block;
        overflow: hidden;
    }
    .mj-date-picker .mj-date-times .mj-date-times-main .mj-date-times-list>div>div{
        width: 60px;
        height: 100%;
        display: inline-block;
        overflow: auto;
    }
    .mj-date-picker .mj-date-times .mj-date-times-main .mj-date-times-list ul{
        width: 40px;
    }
    .mj-date-picker .mj-date-times .mj-date-times-main .mj-date-times-list ul li{
        width: 40px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
    }
    .mj-date-picker .mj-date-times .mj-date-times-main .mj-date-times-list ul li.mj-currtime{
        background-color: #2283ef;
        color: #fff;
    }
    .mj-date-picker .mj-date-times .mj-date-times-btns{
        height: 36px;
        text-align: right;
    }
    .mj-date-picker .mj-date-times .mj-date-times-btns>div{
        display: inline-block;
        line-height: 36px;
        margin: 0 10px;
        color: #2283ef;
        font-size: 12px;
        cursor: pointer;
    }
</style>