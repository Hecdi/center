<template>
    <el-dialog
        :visible.sync="showImgDialog"
        width="400px"
       >
    <el-carousel indicator-position="outside" height="600px">
    <el-carousel-item v-for="(item, index) in img" :key="item+index">
      <img :src ="item" style="width:100%;height:auto;"/>
    </el-carousel-item>
  </el-carousel>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="showImgDialog = false">关闭</el-button>
    </span>
</el-dialog>

</template>

<script>
  import { mapState } from "vuex";
  import img from "../../assets/logo.png";
  import { each } from "lodash";
  import { remote } from 'electron';

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
            picUrl: [],
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
          let _this = this;
          const ajaxAPI = remote.getGlobal('ajaxAPI');
          let path = `${ajaxAPI.path}`;
          path = path.replace('/dispatchforpc/','/');
          let arr=[];
          each(this.picture,(item) => {
            // item = `http://173.101.1.30:6072/${item}`
            item = `${path}${item}`
            console.log(item)
            arr.push(item);
          });
          console.log(arr);
          return arr;
          },
        },
    }
</script>