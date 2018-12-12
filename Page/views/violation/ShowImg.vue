<template>
    <el-dialog
        :visible.sync="showImgDialog"
        width="60%"
       >
    <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in modelImg" :key="item+$index">
      <!-- <h3>{{ item }}</h3> -->
      <img :src ="item"/>
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
  import img from "../../assets/logo.png";

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
          },
          getEveryImg(value){
            this.everyImg = this.value;
          }
        },
        data () {
          return {
            visibleSync: this.dialogVisible,
            modelImg: [img,img,img],
          }
        },
        computed:{
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
          console.log( this.picture ? this.picture.split(',') :[]);
          return this.picture ? this.picture.split(',') :[];
          },
        },
    }
</script>