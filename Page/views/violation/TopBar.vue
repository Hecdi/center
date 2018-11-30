<template>
    <div>
        <el-row>
            <el-col :span="5">
                <!-- <el-radio-group v-model="labelPosition" size="small">
                    <el-radio-button label="left">左对齐</el-radio-button>
                    <el-radio-button label="right">右对齐</el-radio-button>
                    <el-radio-button label="top">顶部对齐</el-radio-button>
                </el-radio-group>
                <div style="margin: 20px;"></div>
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="名称">
                      <el-input v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                      <el-input v-model="formLabelAlign.region"></el-input>
                    </el-form-item>
                    <el-form-item label="活动形式">
                      <el-input v-model="formLabelAlign.type"></el-input>
                    </el-form-item>
                </el-form> -->
            </el-col>
            <el-col :span="16" class="topbar">
                <el-form ref="form" label-width="80px">
                    <el-form-item :model="formInline" >
                        <el-select v-model="formInline.region" placeholder="活动区域">
                          <el-option label="全部" value="all"></el-option>
                          <el-option label="人员" value="people"></el-option>
                          <el-option label="车辆" value="car"></el-option>
                          <el-option label="设备" value="equipment"></el-option>
                          <el-option label="公司" value="company"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="inputSearch"
                    class="seach-input"
                ></el-input>
                <!-- <div class="block"> -->
                    <span class="demonstration">默认</span>
                    <!-- {{time}} -->
                    <el-date-picker
                      v-model="time"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                <!-- </div> -->
            </el-col>
            <el-col :span="3">
                <el-button @click="dialogVisible = true">单位管理</el-button>
                <el-button>导出</el-button>
            </el-col>
            <div class="dialog">
            <el-dialog
                title="单位管理"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <span>这是一段信息</span>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="单位编号">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="单位编号">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="单位编号">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            </div>
        </el-row>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        
      };
    },
    methods: {
      
    }
  };
</script>
<script>
      export default {
        data() {
          return {
            labelPosition: 'right',
            formLabelAlign: {
              name: '',
              region: '',
              type: ''
            },
            formInline: {
              user: '',
              region: ''
            },
            inputSearch:'',
            time: '',
            dialogVisible: false,
            form: {
                name: 'placeholder',
            },
          }
        },
        methods: {
            onSubmit() {
              console.log('submit!');
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                      done();
                    })
                    .catch(_ => {});
                }
            }
        } 
</script>
