<template>
    <div class="violation">
        <top-bar/>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待审核" name="first">
                <Card/>
            </el-tab-pane>
            <el-tab-pane label="全部记录" name="second">
                <Card/>
            </el-tab-pane> 
        </el-tabs>
        <!-- <Card/> -->
    </div>
</template>

<script>
    import Card from "./Card.vue";
    import TopBar from "./TopBar.vue";

    export default {
        name:'ViolationRecord',
        components: {
            Card,
            TopBar,
        },
        data() {
            return {
              activeName: 'second'
            };
        },
        methods: {
          handleClick(tab, event) {
            console.log(tab, event);
          }
        }
    }
</script>