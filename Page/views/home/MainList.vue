<template>
  <div class="mainList">
    <el-row :gutter="20" v-for="item in mainList" v-bind:key="item.region">
        <el-col :span="4" class='region'>
            <el-card shadow="always" >
                {{item.region}}
            </el-card>
        </el-col>

        <el-col :span="20" class="task">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].aaa}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].bb}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].aaa}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].bb}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].aaa}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].bb}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].aaa}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].bb}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].aaa}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].bb}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].aaa}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].bb}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].aaa}}
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        {{item.tasks[0].bb}}
                    </el-card>
                </el-col>
            </el-row>

        </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name:'mainList',
    computed:mapState('home',['mainList']),
}
</script>
