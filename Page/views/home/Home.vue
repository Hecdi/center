<template>
	<el-container class="home">
		<el-aside :style="{ width: asideWith }">
      <el-row v-if="!isHidden">
				<el-col :span="24"> <SearchInput :data="persons" /> </el-col>
      </el-row>
			<el-row v-if="!isHidden" :gutter="20"
class="person-panel"
>
				<el-col v-for="person in persons" :span="6"
>
					<div class="grid-content bg-person person" @click="show" :data-id="person.address">{{ person.value }}</div>
				</el-col>
			</el-row>
			<div class="toggleBtn" @click="handleToggle"><i class="el-icon-d-arrow-left" /></div>
		</el-aside>
    <el-container>
			<el-header class="home-mian-header" height="auto"
>
				<el-row>
          <el-radio-group v-model="taskStatus">
            <el-radio-button label="0"> 未完成 </el-radio-button>
            <el-radio-button label="1"> 已完成 </el-radio-button>
						<el-radio-button label="2"> 全部 </el-radio-button>
          </el-radio-group>
          <el-radio-group v-model="type">
            <el-radio-button label="0"> 区域 </el-radio-button>
            <el-radio-button label="1"> 时间 </el-radio-button>
					</el-radio-group>
          <el-radio-group v-model="ad">
						<el-radio-button label="0"> 所有 </el-radio-button>
            <el-radio-button label="1"> 进 </el-radio-button>
            <el-radio-button label="2"> 离 </el-radio-button>
					</el-radio-group>
					<el-radio-group v-model="flightStatus">
						<el-radio-button label="0"> 前站起飞 </el-radio-button>
						<el-radio-button label="1"> 已登机 </el-radio-button>
					</el-radio-group>
          <el-radio-group v-model="region">
            <el-radio-button label="0"> 国内 </el-radio-button>
						<el-radio-button label="1"> 国际 </el-radio-button>
					</el-radio-group>
					<el-input v-model="search" placeholder=""> <i slot="suffix" class="el-input__icon el-icon-search" /> </el-input>
					<el-button type="primary" @click="reset" size="medium" icon="el-icon-search"> 重置 </el-button>
					<el-button type="primary" size="medium" icon="el-icon-search"> 临时任务 </el-button>
					<el-button type="primary" size="medium" icon="el-icon-search"> 任务交接 </el-button>
          <el-button
type="primary" size="medium" icon="el-icon-search"> 冲突检测 </el-button>
        </el-row>
				<el-row class="legend-panel">
					<legend data="未发布" iconColor="grey"
icon-size="16px" font-size="16px" icon="el-icon-share" color="red"
/>
					<legend data="已发布" iconColor="#2a2b2c"
icon-size="16px" font-size="16px" icon="el-icon-share" color="red"
/>
					<legend data="已受领" iconColor="pink"
icon-size="16px" font-size="16px" icon="el-icon-share" color="red"
/>
					<legend data="已到位" iconColor="green"
icon-size="16px" font-size="16px" icon="el-icon-share" color="red"
/>
					<legend data="进行中" iconColor="yellow"
icon-size="16px" font-size="16px" icon="el-icon-share" color="red"
/>
					<legend data="已完成" iconColor="#7f4832"
icon-size="16px" font-size="16px" icon="el-icon-share" color="red"
/>
					<legend data="取消" iconColor="blue"
icon-size="16px" font-size="16px" icon="el-icon-share" color="red"
/>
					<legend data="警告" iconColor="black"
icon-size="16px" font-size="16px" icon="el-icon-share" color="red"
/>
				</el-row>
			</el-header>
			<el-main> <MainList /> </el-main>
    </el-container>
		<MessageBtn :message-num="getTotal()" />
		<UrgentReportBtn :message-num="getTotal()" />
  </el-container>
</template>

<script>
// @ is an alias to /src
import SearchInput from '../../components/SearchInput.vue';
import Legend from '../../components/Legend.vue';
import MainList from './MainList.vue';
import MessageBtn from 'MessageBtn.vue';
import UrgentReportBtn from 'UrgentReportBtn.vue';
import { sub, removeSub } from 'postalControl';

import { mapState } from 'vuex';

export default {
	name: 'Home',
	data() {
		return {
			isHidden: false,
		};
	},
	methods: {
		getTotal() {
			return 100;
		},
		handleClick(tab, event) {
			console.log(tab, event);
		},
		handleToggle() {
			this.isHidden = !this.isHidden;
		},
		getPersons(data) {
			this.$store.dispatch('home/getPersons', data);
		},
		getMainListData() {
			this.$store.dispatch('home/getMainListData', null);
		},
		show(evt) {
			console.log(evt.currentTarget.dataset.id);
		},
		reset() {
			this.$store.dispatch(`home/resetFilter`, null);
		},
	},
	computed: {
		asideWith() {
			return this.isHidden ? '0' : '390px';
		},
		search: {
			get() {
				return this.$store.state.home.filterOption.searchKey;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'searchKey', filterOption: filterOption });
			},
		},
		taskStatus: {
			get() {
				return this.$store.state.home.filterOption.taskStatus;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'taskStatus', filterOption: filterOption });
			},
		},
		type: {
			get() {
				return this.$store.state.home.filterOption.type;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'type', filterOption: filterOption });
			},
		},
		ad: {
			get() {
				return this.$store.state.home.filterOption.ad;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'ad', filterOption: filterOption });
			},
		},
		flightStatus: {
			get() {
				return this.$store.state.home.filterOption.flightStatus;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'flightStatus', filterOption: filterOption });
			},
		},
		region: {
			get() {
				return this.$store.state.home.filterOption.region;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'region', filterOption: filterOption });
			},
		},
		...mapState('home', ['filterPersons', 'persons']),
	},
	components: {
		SearchInput,
		Legend,
		MainList,
		MessageBtn,
		UrgentReportBtn,
	},
	mounted() {
		/*this.getPersons('aaaa');*/
		this.getMainListData();
		sub('UI', 'Home.Sync', (data) => {
			console.log(data);
			this.getPersons(data);
		});
	},
	beforeDestroy() {
		removeSub('Home');
	},
};
</script>
