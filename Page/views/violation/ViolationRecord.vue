<template>
    <div class="violation">
        <top-bar/>
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待审核" name="first">
                <Card/>
            </el-tab-pane>
            <el-tab-pane label="全部记录" name="second">
                <Card/>
            </el-tab-pane> 
        </el-tabs> -->
        <!-- <Card/> -->
         <!-- <el-radio-group class="tab-button"> -->
           <!-- <el-radio-button label="待审核" v-on:click="displayWait"></el-radio-button>
            <el-radio-button label="全部" v-on:click="displayAll"></el-radio-button> ->
            <el-radio-button label="待审核" v-model="status"></el-radio-button>
            <el-radio-button label="全部" v-model="status"></el-radio-button>
        </el-radio-group>
        <!-
        <button v-on:click="displayWait">待审核</button>
        <button v-on:click="displayWait">全部</button>
        -->
            <el-button @click="toggleTabs('wait')">待审核</el-button>
            <el-button @click="toggleTabs('all')">全部</el-button>
                 <!-- <Card :statusValue="status"/> -->
            <wait :is="currentView" keep-alive :statusValue="status"/>
            <!-- <all/> -->
    </div>
</template>

<script>
    import wait from "./Card.vue";
    import all from "./Card.vue";
    import TopBar from "./TopBar.vue";

    export default {
        name:'ViolationRecord',
        components: {
            wait,
            all,
            TopBar,
        },
        data() {
            // debugger;
            return {
                activeName: 'second',
                status: "全部",
                currentView: 'all',
            };
        },
        methods: {
          handleClick(tab, event) {
            console.log(tab, event);
          },
          displayWait() {
              this.status=="待审核"?"全部":"11全部";
              console.log(this.status);
          },
           toggleTabs(tabKey){
                this.status = tabKey;
                this.currentView = tabKey;
            }
        //   displayAll(){
        //       this.status="全部";
        //   }

        }
    }
</script>