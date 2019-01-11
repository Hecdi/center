<template>
    <el-dialog
        :visible.sync="showImgDialog"
        width="550px"
       >
    <el-carousel indicator-position="outside" :height="height" :interval=2000 @change="changeItem">
      <el-carousel-item v-for="(item, index) in img" :key="item+index">
        <img  :src ="item" style="width:100%;height:`${height}`;"/>
      </el-carousel-item>
    </el-carousel>
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
          },
        },
        methods: {
          handleChangeVisible(){ 
          },
          stringToArrary(value){
            return value.join(',');
          },
          getEveryImg(value){
            this.everyImg = this.value;
          },
          getHeight(active) {
            let img = new Image();
            let that = this;
            img.src = this.img[active];
            img.onload = function(){
              let ration = 550/this.width;
              that.height = this.height>300?this.height*ration+'px':'300px';
            }
          },
          changeItem(active, pre) {
            this.active = active
            this.getHeight(active);
          }
        },
         mounted() {
          this.getHeight()
        },
        data () {
          return {
            visibleSync: this.dialogVisible,
            modelImg: [img,img,img],
            picUrl: [],
            imgHeight: '500',
            height: '',
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
          },
        },
        
        img:function(){
          let arr=[];
          each(this.picture,(item) => {
            item = `http://${location.hostname}:6072/${item}`
            arr.push(item);
          });
          return arr;
          },
        },
    }
</script>