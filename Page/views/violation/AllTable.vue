<template>
  <div class="all-table">
    <el-table :data="cards" stripe style="width: 100%">
      <el-table-column prop="violationId" label="序号" width="80" />
      <el-table-column prop="violationCodeName" label="违规类型" width="80" />
      <el-table-column prop="violationCode" label="人员编号" width="80" />
      <el-table-column prop="violationName" label="违规人员" width="130" />
      <el-table-column prop="violationName1" label="车辆编号" width="80" />
      <el-table-column prop="violationName2" label="设备编号" width="80" />
      <el-table-column prop="airLineName" label="所属单位" width="180" />
      <el-table-column prop="violationDescription" label="违规描述" width="180" />
      <el-table-column prop="date" label="图像记录" width="180" />
      <el-table-column prop="reportTime" label="上报时间" width="180" />
      <el-table-column prop="status" label="状态" width="80" />
      <el-table-column prop="date1" label="操作" width="80" />
    </el-table>
  </div>
</template>

<script>
// export default {
// 	data() {
// 		return {
// 			tableData: [
// 				{
// 					date: '2016',
// 					name: '王虎',
// 					address: '上海',
// 				},
// 				{
// 					date: '05-04',
// 					name: '小虎',
// 					address: '普陀区',
// 				},
// 				{
// 					date: '2016',
// 					name: '王小',
// 					address: '金沙江路',
// 				},
// 				{
// 					date: '2013',
// 					name: '王虎',
// 					address: '1516',
// 				},
// 			],
// 		};
// 	},
// };
import { mapState } from 'vuex';

 export default{
        data(){
            return {
                props:"statusValue",
                status: '22',
                // card:[
                //     {id:1111,name:"章三",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:222,name:"里斯",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:333,name:"王麻子",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:444,name:"哈喽",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:555,name:"刘淇",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:666,name:"李俊",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:777,name:"陈红",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:888,name:"事实上",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                //     {id:999,name:"绅士手",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                // ]
            }
        },
        computed: {
            ...mapState('violation', ['cards']),
        },
        // filters:{
        //     currency(value){
        //         return getNaturalDate(value);
        //     }
        // },
        methods:{
            // toggleTabs(tabKey){
            //     this.status = tabKey;
            //     this.currentView = tabKey;
            // }
        }
    }
</script>
