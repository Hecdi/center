<template>

    <el-container>
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="index"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="hangarCode"
        label="机库编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="displayDepartment"
        label="所属单位">
      </el-table-column>
      <el-table-column
        prop="capacity"
        label="容量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="displayType"
        label="性质">
      </el-table-column>
      <el-table-column
        prop="displayUseState"
        label="状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="编辑">
        <template slot-scope="scope">
        <el-button @click="openDialogHanger(scope.row)" type="text" size="small">编辑</el-button>
      </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="删除">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div>
        <dialogHanger :editHangerData="getCheckEditData"/>
    </div> -->
    </el-container>
</template>


<script>
// import dialogHanger from "./dialogHanger.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";


export default {
    name: 'hanger',
    components: {
        // dialogHanger
    },
    data(){
        return {
            list: [
                {capacity: 66,department: 0,displayDepartment: "国航",displayType: "国际",displayUseState: "禁用",hangarCode: "001",id: "e6a11298a16f4994806c3396a6d7f519",no: 1,type: 1,useState: 1},
                {capacity: 66,department: 0,displayDepartment: "国航",displayType: "国际",displayUseState: "禁用",hangarCode: "001",id: "e6a11298a16f4994806c3396a6d7f519",no: 1,type: 1,useState: 1},
                {capacity: 66,department: 0,displayDepartment: "国航",displayType: "国际",displayUseState: "禁用",hangarCode: "001",id: "e6a11298a16f4994806c3396a6d7f519",no: 1,type: 1,useState: 1},
                {capacity: 66,department: 0,displayDepartment: "国航",displayType: "国际",displayUseState: "禁用",hangarCode: "001",id: "e6a11298a16f4994806c3396a6d7f519",no: 1,type: 1,useState: 1},
                {capacity: 66,department: 0,displayDepartment: "国航",displayType: "国际",displayUseState: "禁用",hangarCode: "001",id: "e6a11298a16f4994806c3396a6d7f519",no: 1,type: 1,useState: 1},
            ],
            getCheckEditData: '',

        }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      openDialogHanger(value){
        this.getCheckEditData = value;
        this.$store.dispatch(`hanger/updateDialogHangerVisible`, { dialogHangerVisible: true });
      }
    },

}
</script>
