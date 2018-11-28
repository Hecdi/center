<template>
  <div class="sheet-table">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="机型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="机类"
        width="80">
      </el-table-column>
      <el-table-column
        prop="address"
        label="航线"
        width="80">
      </el-table-column>
      <el-table-column
        prop="date"
        label="预达"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="计达"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="实达"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date"
        label="前飞"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="登机"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="协关"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="计飞"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date"
        label="实飞"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="引导车"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="引导人员"
        width="120">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016',
          name: '王虎',
          address: '上海'
        }, {
          date: '05-04',
          name: '小虎',
          address: '普陀区'
        }, {
          date: '2016',
          name: '王小',
          address: '金沙江路'
        }, {
          date: '2013',
          name: '王虎',
          address: '1516'
        }]
      }
    }
  }
</script>