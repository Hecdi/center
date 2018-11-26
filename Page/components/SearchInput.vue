<template>
    <div class='searchInput'>
        <el-autocomplete
            class="inline-input"
            v-model="key"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
        >
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-autocomplete>
    </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from "";

import {mapState} from 'vuex';

export default {
    name: "SearchInput",
    props:['data'],
    data() {
      return {
        key:'',
      };
    },
    methods: {
        querySearch(queryString, cb) {
            let restaurants = this.data;
            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            this.$store.dispatch('home/onClickSearchPerson', item);
        },
    },
};
</script>
