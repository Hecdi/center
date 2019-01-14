<template>
    <el-dialog
        :visible.sync="showImgDialog"
        width="550px"
        :height="height"
       >
    <el-carousel :height="height" :interval=2000 @change="changeItem">
      <el-carousel-item v-for="(item, index) in img" :key="item+index">
        <img  :src ="item" style="width:100%;height:`${height}`;" />
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
          showImgDialog(n,o){
            this.getHeight(0);
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
          },
          getHeight(active) {
            let img = new Image();
            let that = this;
            img.src = this.img[active];
            img.onload = function(){
              let ration = 520/this.width;
              // that.height = this.height>300?this.height*ration+'px':'300px';
              let getHeight = this.height*ration>300?this.height*ration+'px':'300px';
              getHeight = parseInt(getHeight);
              // getHeight = getHeight>750?750+'px':getHeight+'px';
              that.height = getHeight>600?600+'px':getHeight+'px';
            }
          },
          changeItem(active, pre) {
            this.active = active;
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