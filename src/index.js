import Vue from "vue";
import Button from "./components/button/button.vue";
import Checkbox from "./components/checkbox/checkbox.vue";
import CheckboxGroup from "./components/checkbox/checkbox-group.vue";
import Col from "./components/col/col.vue";
import Dialog from "./components/dialog/dialog.vue";
import Form from "./components/form/form.vue";
import FormItem from "./components/form/form-item.vue";
import Input from "./components/input/input.vue";
import Loading from "./components/loading/loading.vue";
import Page from "./components/page/page.vue";
import Radio from "./components/radio/radio.vue";
import RadioItem from "./components/radio/radio-item.vue";
import Row from "./components/row/row.vue";
import Select from "./components/select/select.vue";
import SelectItem from "./components/select/select-item.vue";
import Table from "./components/table/table.vue";
import TableColumn from "./components/table/table-column.vue";
import Textarea from "./components/textarea/textarea.vue";

const components = [
    Button,
    Checkbox,
    CheckboxGroup,
    Col,
    Dialog,
    Form,
    FormItem,
    Input,
    Loading,
    Page,
    Radio,
    RadioItem,
    Row,
    Select,
    SelectItem,
    Table,
    TableColumn,
    Textarea
]

const install = function(Vue,options){
    components.map(component => Vue.component(component.name,component))
}
if (typeof window !== 'undefined' && window.Vue) { 
    for(var i = 0,len = components.length;i < len;i++){
        install(window.Vue);
    } 
}

module.exports = {
    Button,
    Checkbox,
    CheckboxGroup,
    Col,
    Dialog,
    Form,
    FormItem,
    Input,
    Loading,
    Page,
    Radio,
    RadioItem,
    Row,
    Select,
    SelectItem,
    Table,
    TableColumn,
    Textarea
}