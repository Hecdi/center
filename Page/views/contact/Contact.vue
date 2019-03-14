<template>
    <el-container class="contact-container">
        <el-row>
            <el-col :span="6">
                <h1 @click="openDialogAddCompany" >新增树节点</h1>
                <CompanyTree/>
            </el-col>
            <el-col :span="18">
                <ContactTable/>
            </el-col>
        </el-row>
        <add-company :editHangerData="getCheckEditData"/>
    </el-container>
</template>


<script>
import CompanyTree from "./CompanyTree.vue";
import ContactTable from "./ContactTable.vue";
import AddCompany from "./AddCompany.vue";

export default {
    name:"contact",
    components: {
        CompanyTree,
        ContactTable,
        AddCompany
    },
    data(){

    },
    methods: {
        openDialogAddCompany(value){
        this.getCheckEditData = value;
        this.$store.dispatch(`contact/updateDialogAddCompany`, { dialogAddCompany: true });
      }
    }

}
</script>