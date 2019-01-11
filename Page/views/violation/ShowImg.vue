<template>
    <el-dialog
        :visible.sync="showImgDialog"
        width="550px"
       >
    <el-carousel indicator-position="outside" :height="height" :interval=3000 @change="changeItem">
      <el-carousel-item v-for="(item, index) in img" :key="item+index">
        <img  ref="item" :src ="item" style="width:100%;height:`${height}`;"/>
      </el-carousel-item>
    </el-carousel>
    <span slot="footer" class="dialog-footer" style="display:none;">
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
          },
          // showImgDialog(now,old){
          //   let that = this;
          //   that.imgHeight = '620px'
          //   window.onresize = function temp() {
          //       // 通过点语法获取img的height属性值
          //       console.log(that.$refs.imgHeight['0']);
          //       that.$nextTick(() => {
          //         that.imgHeight = `${that.$refs.imgHeight['0'].height}px`;
          //       })
             
          //    console.log(that.imgHeight);
          //   }
          // },
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
            // this.$nextTick(() => {
            //   this.height = this.$refs.item[this.active].clientHeight + 'px'
            // })
            let img = new Image();
            let that = this;
            img.onload = function(){
              console.log(this);
              let ration = 550/this.width;
              that.height = this.height>300?this.height*ration+'px':'300px';
            }
            console.log(that.height);
            img.src = this.img[active];
          },
          changeItem(active, pre) {
            this.active = active
            this.getHeight(active);
          }
  
          
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
        mounted() {
          this.getHeight()
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