<template>
    <el-dialog
        :visible.sync="showImgDialog"
        width="60%"
       >
    <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in img" :key="item">
      <!-- <h3>{{ item }}</h3> -->
      <img src = "key"/>
    </el-carousel-item>
  </el-carousel>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
      <el-button type="primary" @click="showImgDialog = false">关闭</el-button>
    </span>
</el-dialog>

</template>

<script>
  import { mapState } from "vuex";
    export default {
        props:["dialogVisible","picture"],
        watch: {
          visibleSync (val) {
            this.$emit('update:dialogVisible', val)
          }
        },
        methods: {
          handleChangeVisible(){ 
          },
          stringToArrary(value){
            return value.join(',');
          }
        },
        data () {
          // console.log(this.picture);
          return {
            visibleSync: this.dialogVisible,
            //  img:[],
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
        img:function(){
          console.log(this.picture);
          return this.picture ? this.picture.split(',') :[];
          },
        },
    }
</script>