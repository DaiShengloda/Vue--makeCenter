<template>
    <widget :module="module" :widget-index="widgetIndex" action="add">
        <data-table :module="module"></data-table>
    </widget>
</template>
<script>
import Widget from '../Widget';
import BasicForm from '../BasicForm';
export default {
    name:'BasicFormWidget',
    props: {
        module: {
            type: String,
            required: true
        },
        widgetIndex:{
            type: Number,
            required: true
        }
    },
    methods: {
        submit: function(){
            
        }
    },
    components: {
        Widget,
        BasicForm,
    },
}
</script>