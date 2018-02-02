<style></style>
<template>
    <div class="mj-checkbox-group"><slot></slot></div>
</template>
<script>
    export default {
       data:function(){
            return {
                valueLength:0,
                values:{},
                checkedIdList:[]
            }
        },
        methods:{
            _addValue:function(id){
                var flag = true;
                for(var i = 0,len = this.checkedIdList.length;i < len;i++){
                    if(this.checkedIdList[i] === id){
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    this.checkedIdList.push(id);
                }
            },
            _delValue:function(id){
                for(var i = 0,len = this.checkedIdList.length;i < len;i++){
                    if(this.checkedIdList[i] === id){
                        this.checkedIdList.splice(i,1);
                        break;
                    }
                }
            }
        },
        computed:{
            checkedList:function(){
                var arr = [];
                for(var i = 0,len = this.checkedIdList.length;i < len;i++){
                    arr.push(this.values[this.checkedIdList[i]]);
                }
                return arr;
            }
        }, 
        name:"mj-checkbox-group"
    }
</script>