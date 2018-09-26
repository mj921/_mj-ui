<template>
    <dl v-show="this.showFlag"
        class="mj-option"
        :class="{'mj-option-disabled': disabledFlag}" 
        @click="_handleClick">
        <slot v-if="$slots.default"></slot>
        <span v-else>{{label || value}}</span>
    </dl>
</template>
<script>
    export default {
        data: function () {
            return {
                showFlag: true
            }
        },
        props:{
            label: String,
            value: {
                required: true
            },
            disabled: {
                validator: function (val) {
                    return true;
                }
            }
        },
        inject: ["_selectValue"],
        methods:{
            _handleClick:function(e){
                e.stopPropagation();
                if (!this.disabledFlag) {
                    this._selectValue(this.value, this.label || this.value);
                }
            },
            _setShowFlag:function(showFlag){
                this.showFlag = showFlag;
            }
        },
        computed: {
            disabledFlag: function () {
                return this.disabled === '' || this.disabled === 'true' || this.disabled === true || this.disabled === 'disabled';
            }
        },
        name:"mj-option"
    }
</script>
<style scoped>
    .mj-option{
        padding:0 20px 0 10px;
        line-height: 30px;
        height: 30px;
        font-size: 12px;
        color: #26282c;
        white-space: nowrap;
        cursor: pointer;
    }
    .mj-option:hover{
        background-color: #f5f7fa
    }
    .mj-option-disabled{
        color: #c0c4cc;
        cursor: not-allowed;
    }
</style>