<template>
    <el-container class="contact-container">
        <el-row>
            <el-col :span="6">
                <h1>test</h1>
                <CompanyTree/>
            </el-col>
            <el-col :span="18">
                <ContactTable/>
            </el-col>
        </el-row>
    </el-container>
</template>


<script>
import CompanyTree from "./CompanyTree.vue";
import ContactTable from "./ContactTable.vue";

export default {
    name:"contact",
    components: {
        CompanyTree,
        ContactTable
    }
}
</script>