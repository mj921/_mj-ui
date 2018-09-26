<style></style>
<template>
    <div class="mj-radio">
        <slot></slot>
    </div>
    </div>
</template>
<script>
    export default {
        data: function(){
            return {
                radioItemList: []
            }
        },
        props:{
            value: String
        },
        methods:{
            _setValue:function(value){
                if (this.value !== value) {
                    this.$emit("input", value);
                    this.$emit("change");
                }
            },
            resetDate: function(data){
                this.$emit("input",data);
            }
        },
        name:"mj-radio"
    }
</script>
