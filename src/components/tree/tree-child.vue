<style></style>
<template>
    <tbody>
        <tr>
            <template v-for="(column,i) in columnList">
                <td v-if="column.checkbox" :class="'mj-text-' + column.align" :style="'min-width:' + column.minWidth" :width="column.width">
                    <mj-checkbox style="padding:0;" v-model="allchecked"></mj-checkbox>
                </td>
                <td v-else-if="column.formatter" :class="'mj-text-' + column.align" :style="'min-width:' + column.minWidth" :width="column.width">{{column.formatter(row,row[column.prop])}}</td>
                <td v-else="column.formatter" :class="'mj-text-' + column.align" :style="'min-width:' + column.minWidth" :width="column.width">{{row[column.prop]}}</td>
            </template>
        </tr>
        <mj-tree-child v-if="row.children && row.children.length > 0" v-for="data in row.children" :row="data" :column-list="columnList" :level="level + 1"></mj-tree-child>
    </tbody>
</template>
<script>
    export default {
        props:{
            row:Object,
            columnList:Array,
            level:{
                type:Number,
                default:0
            }
        },
        created:function(){
            console.log(this.row,this.columnList)
        },
        name:"mj-tree-child"
    }
</script>