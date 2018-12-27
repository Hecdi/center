<template>
<div>
    <!-- <el-button type="text" @click="dialogCheckEdit = true">点击打开 Dialog</el-button> -->

    <el-dialog
      title="违规记录"
      :visible.sync="dialogCheckEdit"
      width="70%"
      :before-close="handleClose">
        <!-- <el-form :model="checkEdit" status-icon :rules="checkPending" ref="checkPendingForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="违规主体">
                <el-select v-model="form.violationCodeName" placeholder="请选择活动区域">
                  <el-option label="人员" value="shanghai"></el-option>
                  <el-option label="车辆" value="beijing"></el-option>
                  <el-option label="设备" value="device"></el-option>
                  <el-option label="其他" value="other"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="责任人/责任单位">
                <el-select v-model="form.duty" placeholder="">
                  <el-option label="责任人" value="dutyPeople"></el-option>
                  <el-option label="责任单位" value="dutyUnit"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="责任单位描述">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="工作单位">
                <el-select v-model="form.belongCompanyName" placeholder="请选择活动区域">
                  <el-option label="机场股份公司" value="shanghai"></el-option>
                  <el-option label="机场地服" value="beijing"></el-option>
                  <el-option label="国航西南分公司" value="device"></el-option>
                  <el-option label="国航货站" value="other"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="隔离区通行证号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="内场驾驶证号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="情况说明">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="机场股份公司" value="shanghai"></el-option>
                  <el-option label="机场地服" value="beijing"></el-option>
                  <el-option label="国航西南分公司" value="device"></el-option>
                  <el-option label="国航货站" value="other"></el-option>
                </el-select>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
            </el-form-item>
            <el-form-item label="扣分分值">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
        </el-form>   -->
        <h1>方便展示</h1>
        <el-button>提交</el-button>
        <el-button>取消</el-button>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
</div>

</template>


<script>
  export default {
    name: "dialogCheckEdit",
    props:["dialogVisible","unfinishData"],
    data() {
      return {
        dialogCheckEdit: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    computed: {
    dialogUnFinish: {
      get() {
        return this.$store.state.violation.dialogCheckEdit;
      },
      set() {
        this.$store.dispatch(`violation/updateDialogCheckEdit`, {
        dialogCheckEdit: false
      });
      }
    }
  },
  };
</script>
