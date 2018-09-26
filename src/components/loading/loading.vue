<style></style>
<template>
    <div class="mj-loading" v-show="visible">
        <div>{{text}}</div>
    </div>
</template>
<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: "处理中。。。"
            }
        },
        name: "mj-loading"
    }
</script>
<style scoped>
    .mj-loading{
        position: fixed;
        left: 0;
        top: 0;
        width:100%;
        height: 100%;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.92);
        color:#1f272e;
        font-size: 16px;
        z-index: 99999999999;
    }
    .mj-loading>div{
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -8px;
    }
</style>