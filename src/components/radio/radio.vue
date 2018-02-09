<style></style>
<template>
    <div class="mj-radio">
        <mj-radio-item v-for="radio in radioItemList" :label="radio.label" :value="radio.value" :checked="radio.value === value" @click="_checkeValue" :key="radio.value" :created="false"></mj-radio-item>
        <div class="hidden"><slot></slot></div>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                radioItemList:[]
            }
        },
        props:{
            value:String
        },
        methods:{
            _checkeValue:function(value){
                this.$emit("input",value);
                this.$emit("change");
            },
            resetDate:function(data){
                this.$emit("input",data);
            }
        },
        name:"mj-radio"
    }
</script>
