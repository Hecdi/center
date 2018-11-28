<template>
    <div class="sheet-container">
        <ToolBar/>
        <Table/>
    </div>
</template>


<script>
    import ToolBar from "./ToolBar.vue";
    import Table from "./Table.vue";

    export default {
        name:'Sheet',
        components: {
            ToolBar,
            Table,
        },
    }
</script>
