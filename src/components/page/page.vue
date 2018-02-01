<style></style>
<template>
    <div :class="'mj-page mj-text-' + align">
        <div class="mj-page-main">
            <div class="mj-page-total" v-if="total > 0">共{{total}}条</div>
            <div class="mj-page-btn mj-page-prev" @click="prevFun">&lt;&lt;</div>
            <div v-for="btn in btns"  :class="'mj-page-btn ' + (btn.isOmitted ? 'mj-page-omitted' : (currPage === btn.i ? 'mj-page-current' : ''))" @click="btn.isOmitted ? null : pageNumClick(btn.i)">{{btn.isOmitted ? "..." : btn.i}}</div>
            <div class="mj-page-btn mj-page-prev" @click="nextFun">&gt;&gt;</div>
            <div class="mj-page-ipt">
                <div>到第</div>
                <input type="text" @input="inputFun" @keydown="keyDownFun" v-model="iptNum" />
                <div>页</div>
            </div>
            <div class="mj-page-yes" @click="iptBtnFun">确定</div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                currPage:0,
                iptNum:"",
                btns:[]
            }
        },
        props:{
            pages:{
                type:Number,
                default:0
            },
            "page-curr":{
                type:Number,
                default:0
            },
            "page-change":Function,
            total:{
                type:Number,
                default:0
            },
            align:{
                type:String,
                default:"center"
            }
        },
        methods:{
            //页面数字按钮点击事件
            pageNumClick:function(num){
                this.currPage = num;
                this.pageChange && this.pageChange(this.currPage);
            },
            //翻页确定按钮方法
            iptBtnFun:function(){
                if(this.iptNum){
                    this.iptNum = +this.iptNum
                }else{
                    return;
                }
                if(this.iptNum > this.pages){
                    this.iptNum = this.pages;
                }
                if(this.iptNum < 1){
                    this.iptNum = 1;
                }
                this.currPage = this.iptNum;
                this.pageChange && this.pageChange(this.currPage);
            },
            //翻页输入框输入事件
            inputFun:function(event){
                if(!/^\d+$/.test(event.target.value)){
                    event.target.value = event.target.value.replace(/[^\d]/g,"");
                }
                this.iptNum = event.target.value;
            },
            keyDownFun:function(event){
                if(event.keyCode === 13){
                    this.iptBtnFun();
                }
            },
            //上一页
            prevFun:function(){
                if(this.currPage > 1){
                    this.currPage--;
                    this.pageChange && this.pageChange(this.currPage);
                }
            },
            //下一页
            nextFun:function(){
                if(this.currPage < this.pages){
                    this.currPage++;
                    this.pageChange && this.pageChange(this.currPage);
                }
            },
        },
        watch:{
            currPage:function(newP,oldP){
                // oldP !== 0 && this.pageChange && this.pageChange(this.currPage);
            },
            pageCurr:function(){
                    this.currPage = this.pageCurr;
            },
            pages:function(){
                if(this.pageCurr < 0 || this.pages <= 0){
                    this.currPage = 0;
                }else if(this.pageCurr > this.pages){
                    this.currPage = this.pages;
                }else{
                    this.currPage = this.pageCurr;
                }
            }
        },
        created:function(){
            if(this.pageCurr < 0 || this.pages <= 0){
                this.currPage = 0;
            }else if(this.pageCurr > this.pages){
                this.currPage = this.pages;
            }else{
                this.currPage = this.pageCurr;
            }
            if(this.pages > 0){
                var btns = [];
                if(this.pages <= 7){
                    for(var i = 1;i <= this.pages;i++){
                        btns[btns.length] = {i:i,isOmitted:false}
                    }
                }else{
                    if(this.currPage <= 4){
                        for(var i = 1;i <= 6;i++){
                            btns[btns.length] = {i:i,isOmitted:false};
                        }
                        btns[btns.length] = {isOmitted:true};
                        btns[btns.length] = {i:this.pages,isOmitted:false};
                    }else if(this.currPage >= this.pages - 3){
                        btns[btns.length] = {i:1,isOmitted:false};
                        btns[btns.length] = {isOmitted:true};
                        for(var i = this.pages - 5;i <= this.pages;i++){
                            btns[btns.length] = {i:i,isOmitted:false};
                        }
                    }else{
                        btns[btns.length] = {i:1,isOmitted:false};
                        btns[btns.length] = {isOmitted:true};
                        for(var i = this.currPage - 2;i <= this.currPage + 2;i++){
                            btns[btns.length] = {i:i,isOmitted:false};
                        }
                        btns[btns.length] = {isOmitted:true};
                        btns[btns.length] = {i:this.pages,isOmitted:false};

                    }
                }
                this.btns = btns;
            }
        },
        name:"mj-page"
    }
</script>