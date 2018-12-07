<template>
    <el-dialog
        :visible.sync="showImgDialog"
        width="60%"
       >
    <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
      <el-button type="primary" @click="showImgDialog = false">关闭</el-button>
    </span>
</el-dialog>

</template>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>


<script>
  import { mapState } from "vuex";
    export default {
        props: {
          dialogVisible: Boolean
        },
        watch: {
          visibleSync (val) {
            this.$emit('update:dialogVisible', val)
          }
        },
        methods: {
          handleChangeVisible(){ 
          }
        },
        data () {
          return {
            visibleSync: this.dialogVisible
          }
        },
        computed:{
            // ...mapState('home', ['flights','tempGuaranteeList','tempWorkerList']),
            ...mapState('violation', ['showImgDialog']),
          showImgDialog: {
          get() {
            return this.$store.state.violation.showImgDialog;
          },
          set() {
            this.$store.dispatch(`violation/updateShowImg`, { showImgDialog: false });
          }
        },
        }
    }
</script>