<style></style>
<template>
    <div :class="{'mj-dialog':true,'mj-dialog-hide':!value}">
        <div class="mj-dialog-mask"></div>
        <div :class="'mj-dialog-default' + ' mj-dialog-' + size + (src && src.length > 0 ? ' mj-dialog-iframe' : '')" :style="mainStyle">
            <div class="mj-dialog-header">
                <span>{{title}}</span>
                <div class="mj-dialog-close" @click="_handleClose"></div>
            </div>
            <div class="mj-dialog-body">
                    <iframe :src="currSrc" frameborder="0" v-if="src && src.length > 0"></iframe>
                    <slot v-else></slot>
            </div>
            <slot class="mj-dialog-footer" name="footer"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            value:{
                type:Boolean,
                default:false
            },
            size:{
                type:String,
                default:"middle"
            },
            src:{
                type:String,
                default:""
            },
            title:{
                type:String,
                default:"标题"
            },
            width:String,
            height:String
        },
        data:function(){
            return {
                overflow:""
            }
        },
        methods:{
            _handleClose:function(){
                this.$emit("input",false);
            }
        },
        computed:{
            currSrc:function(){
                return this.src.indexOf("?") > 0 ? (this.src + "&mjrandomtime=" + new Date().getTime()) : (this.src + "?mjrandomtime=" + new Date().getTime());
            },
            mainStyle:function(){
                var mainStyle = {paddingBottom:this.$slots.footer && this.$slots.footer.length > 0 ? "50px" : "0px"};
                if(this.width){
                    mainStyle.width = this.width;
                }
                if(this.height){
                    mainStyle.height = this.height;
                }
                return mainStyle;
            }
        },
        watch:{
            value:function(){
                if(this.size === "full" && this.value){
                    document.body.style.overflow = "hidden";
                }else{
                    document.body.style.overflow = this.overflow;
                }
                if(this.value === false){
                    this.$emit("close")
                }
            }
        },
        created:function(){
            this.overflow = document.body.style.overflow || "auto";
        },
        name:"mj-dialog"
    }
</script>