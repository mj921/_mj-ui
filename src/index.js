import Vue from "vue";
import Button from "./components/button/button.vue";
import Checkbox from "./components/checkbox/checkbox.vue";
import CheckboxGroup from "./components/checkbox/checkbox-group.vue";
import Col from "./components/col/col.vue";
import DatePicker from "./components/datePicker/date-picker.vue";
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
import Tab from "./components/tab/tab.vue";
import Table from "./components/table/table.vue";
import TableColumn from "./components/table/table-column.vue";
import TabPanel from "./components/tab/tab-panel.vue";
import Textarea from "./components/textarea/textarea.vue";

import $Message from "./components/message/message.js";
import $Confirm from "./components/confirm/confirm.js";

import Util from "./util.js";

const components = [
    Button,
    Checkbox,
    CheckboxGroup,
    Col,
    DatePicker,
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
    Tab,
    Table,
    TableColumn,
    TabPanel,
    Textarea
]
const install = function(Vue,options){
    components.map(component => Vue.component(component.name,component))
}
if (typeof window !== 'undefined' && window.Vue) { 
    install(window.Vue);
    window.Vue.directive("mjscrolltop",function(el,binding){
        el.scrollTop = binding.value;
    })
    $Message(window.Vue);
    $Confirm(window.Vue);
}
if(window){
    window.MjUtil = Util;
}
module.exports = {
    Button,
    Checkbox,
    CheckboxGroup,
    Col,
    DatePicker,
    Dialog,
    Form,
    FormItem,
    Input,
    Loading,
    MjUtil,
    Page,
    Radio,
    RadioItem,
    Row,
    Select,
    SelectItem,
    Tab,
    Table,
    TableColumn,
    TabPanel,
    Textarea
}