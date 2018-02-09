<template>
    <div :class="'mj-message mj-message-' + type"><p>{{message}}</p></div>
</template>
<script>
    export default {
        props:{
            type:{
                type:String,
                default:"info"
            },
            message:String,
        },
        name:"mj-message"
    }
</script>