<template>
   <div class="block page-nations">
    <span class="demonstration">调整每页显示条数</span>
    <el-pagination
      background	
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>


<script>
// import { ajax } from 'ajax';

  export default {
    props: ['currentPage','pageSize','total'],
    data(){
      return{
          newPageSize:this.pageSize,
          newCurrentPage: this.currentPage,
      }
    },
    watch:{
        pageSize(val){
          this.newPageSize = val;   //监听pageSize，把pageSize赋给newPageSize;
        },
        newPageSize(val){
          this.$emit('handleSizeChange',val);
        },
        currentPage(val){
          this.newCurrentPage = val;
        },
        newCurrentPage(val){
          this.$emit('handleCurrentChange',val);
        },

      },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.newPageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.newCurrentPage = val;
      }
    },
  }
</script>