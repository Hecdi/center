<template>
    <div class="violation">
        <Card/>
    </div>
</template>

<script>
    import Card from "./Card.vue";
    // import Table from "./Table.vue";

    export default {
        name:'ViolationRecord',
        components: {
            Card,
        },
    }
</script>