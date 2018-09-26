<style></style>
<template>
    <dl @click="_handleClick" :class="{'mj-radio-checked': parent && parent.value === value}">
        <div class="mj-radio-div"></div>
        <label>{{label}}</label>
    </dl>
</template>
<script>
    export default {
        data () {
            return {
                parent: null
            }
        },
        props:{
            value:{
                type:String,
                required:true
            },
            label:{
                type:String,
                required:true
            },
            checked:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            _handleClick:function(){
                this.$emit("click", this.value);
                if (this.parent) {
                    this.parent._setValue(this.value);
                }
            }
        },
        created:function(){
            var parent = this.$parent;
            while (parent && parent.$options._componentTag !== "mj-radio") {
                parent = parent.$parent;
            }
            this.parent = parent;
        },
        name:"mj-radio-item"
    }
</script>