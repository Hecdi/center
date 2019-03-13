<template>
    <el-row style="width:100%">
        <el-col :span="6">
            <el-tree :data="data" :props="defaultProps" 
                highlight-current
                node-key="id"
                @node-click="handleNodeClick">
            </el-tree>
        </el-col>
        <el-col :span="18">
            <router-view>
                <h1>表格全部在这里展示</h1>
            </router-view>
        </el-col>
    </el-row>
    
</template>

<script>
  export default {
    data() {
      return {
        data:
         [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1',
              path:'home'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1',
              path:'rollCall'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1',
              path:'violations'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
        if(data.children == undefined){
            this.$router.push({path:'/'+data.path})
        } else {
            return;
        }
        // this.$router.push({path:'/report'})
      }
    }
  };
</script>