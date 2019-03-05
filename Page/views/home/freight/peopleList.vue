<template>
	<el-aside :style="{ width: asideWith }">
		<el-row v-if="!isHidden">
			<el-col :span="24">
				<el-input v-model="searchPerson" placeholder> <i slot="suffix" class="el-input__icon el-icon-search" /> </el-input>
			</el-col>
		</el-row>
		<div class="panel" v-if="!isHidden">
			<el-row :gutter="20" v-for="(person, index) in persons" :key="person.areaId + index" class="persons-panel" style="margin:0;">
				<el-col :span="24" v-if="person.workerList && person.workerList.length" class="area-panel">{{ person.areaName }} </el-col>
				<el-row :gutter="20" style="margin:0;" class="personList">
					<el-col v-for="worker in person.workerList" :key="worker.staffId" style="width:auto;" class="person-panel" :class="{ online: worker.memberState == 1 }" >
						<el-tooltip effect="light" :disabled="!worker.phone" :content="worker.phone" placement="right">
							<div class="grid-content bg-person person" :class="{ active: currentPerson && currentPerson.staffId == worker.staffId }" @dblclick="showSetting(worker, person.areaName);" @click="setPersonSearch(worker);" :data-id="worker.staffId">
								{{ formatPerson(worker) }}
								<!-- {{ worker.staffName + (worker.workerName ? '(' + worker.workerName + ')' : '') }} -->
								<!-- {{worker.staffName + `${worker.nonArrivalReason?}` }} -->
								<div class="taskNum">{{ worker.taskNumber }}</div>
							</div>
						</el-tooltip>
						<div style="font-size:12px;line-height:30px;" v-if="person.areaId == 'jpyxzh_O'">{{ worker.workContent }}</div>
					</el-col>
				</el-row>
			</el-row>
			<div class="placeHolder" />
		</div>
		<div @click="handleToggle" class="toggleBtn"><i :class="isHidden ? 'icon-zhankai' : 'icon-shouqi'" class="iconfont" /></div>
		<DialogPersonSetting :currentAreaName="currentAreaName" :currentPerson="currentPerson" />
	</el-aside>
</template>

<script>
import { mapState } from 'vuex';
import ajaxx from 'ajax';
import { sub, removeSub, pub } from 'postalControl';
import DialogPersonSetting from '../DialogPersonSetting.vue';
export default {
	name: 'peopleList',
	data() {
		return {
			isHidden: false,
			isDoubleClick: false,
			currentPerson: null,
			currentAreaName: '',
		};
	},
	computed: {
		searchPerson: {
			get() {
				return this.$store.state.home.personSearchKey;
			},
			set(personSearchKey) {
				pub('Worker', 'Home.Area.SetPersonSearchKey', personSearchKey);
			},
		},
		asideWith() {
			return this.isHidden ? '0' : '300px';
		},
		...mapState('home', ['persons']),
	},
	methods: {
		reset() {
			this.currentPerson = null;
		},
		formatPerson(worker) {
			let workerName = worker.staffName;
			let reason = worker.nonArrivalReason;
			let tmp = '';
			if (reason) {
				tmp = `(${reason == 5 ? worker.workerName : this.getReason(reason)})`;
			}
			return workerName + tmp;
		},
		showSetting(worker, areaName) {
			this.isDoubleClick = true;
			this.currentPerson = worker;
			this.currentAreaName = areaName;
			this.$store.dispatch(`home/update`, { dialogPersonSettingVisible: true });
		},
		setPersonSearch(worker) {
			let _this = this;
			console.log(worker);
			_this.isDoubleClick = false;
			window.setTimeout(function() {
				if (!_this.isDoubleClick) {
					if (_this.currentPerson && _this.currentPerson.staffId == worker.staffId) {
						_this.currentPerson = null;
						_this.$store.dispatch('home/updateFilter', {
							name: 'searchPersonKey',
							filterOption: '',
						});
					} else {
						_this.currentPerson = worker;
						_this.$store.dispatch('home/updateFilter', {
							name: 'searchPersonKey',
							filterOption: worker.workerName ? worker.workerName : worker.staffName,
						});
					}
				}
			}, 300);
		},
		showDeatil(task) {
			this.$store.commit('home/setCurrentTask', task);
			/* ajax.post('home.taskDetail', { flightTaskId: e.taskId }).then((data) => {
                          console.log(data);
                      }); */
		},
		handleToggle() {
			this.isHidden = !this.isHidden;
		},
	},
	mounted() {},
	components: {
		DialogPersonSetting,
		// DialogTaskDetail,
		// Legend
	},
};
</script>
