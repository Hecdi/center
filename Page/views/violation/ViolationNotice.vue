<template>
	<!--startprint-->
	<section class="violationNotice">
		<section class="leftPart">
			<div class="title">
				成都双流国际机场机坪违规通知书
			</div>
			<div class="num">
				编号<span>{{this.$route.query.violationNoticeNum}}</span>
			</div>
			<div class="tab">
				<table >
					<tbody>
						<tr>
							<td class="col1">当事人/责任单位</td>
							<td class="col2">{{this.$route.query.violationName}}</td>
							<td class="col3">工作单位</td>
							<td>{{this.$route.query.workOrgName}}</td>
						</tr>
						<tr>
							<td class="col1">隔离区通行证号</td>
							<td class="col2">{{this.$route.query.passNumber}}</td>
							<td class="col3">内场驾驶证证号</td>
							<td>{{this.$route.query.driverLicenseNumber}}</td>
						</tr>
						<tr class="tr3">
							<td class="col1">联系电话</td>
							<td colspan="3">{{this.$route.query.phone}}</td>
						</tr>
						<tr class="tr4">
							<td class="col1">违规主体</td>
							<td class="col2">{{this.$route.query.violationCodeName}}</td>
							<td class="col3">车牌号码</td>
							<td>{{this.$route.query.carNo}}</td>
						</tr>
						<tr class="tr5">
							<td colspan="4" class="mainDescription">
								<div class="description">
									当事人/你单位人员于<span>（{{vioYear}}）</span>年<span>（{{vioMonth}}）</span>月<span>（{{vioDay}}）</span>日<span v-show="vioHours">({{vioHours}})时</span>在机坪工作时，<span>（{{this.$route.query.violationDescription}}）</span>违反《成都双流国际机场机坪运行管理规则》<span>（{{this.$route.query.violationRulesText}}）</span>规定，机坪运行管理机构将根据相关处罚规定对当事人记扣<span>（{{this.$route.query.deductionScore}}）</span>分，同时，请你单位按照
									相关管理规定进行处理，并于一周内将处理情况反馈机坪管委会办公室。（电话/传真：85206362）
								</div>
								<div class="date">
									<span>{{year}}</span>
									年
									<span>{{month}}</span>
									月
									<span>{{day}}</span>
									日
								</div>
							</td>
						</tr>
						<tr class="tr6">
							<td class="col1">检查人</td>
							<td class="col2">{{this.$route.query.createByName}}</td>
							<td class="col3">当事人签名</td>
							<td></td>
						</tr>
						<tr class="tr7">
							<td class="col1">复核人</td>
							<td colspan="3">{{this.$route.query.auditorName}}</td>
						</tr>
						<tr class="tr8">
							<td class="col1">备注</td>
							<td colspan="3"></td>
						</tr>
						<tr class="tr9">
							<td colspan="4" class="footer">
								<div>成都双流国际机场机坪管委会制</div>
							</td>
						</tr>
					</tbody>
				</table>
				<p>
					第一联

					填发单位联
				</p>
			</div>
		</section>
		<section class="rightPart">
			<div class="title">
				成都双流国际机场机坪违规通知书
			</div>
			<div class="num">
				编号<span>{{this.$route.query.violationNoticeNum}}</span>
			</div>
			<div class="tab">
				<table >
					<tbody>
						<tr>
							<td class="col1">当事人/责任单位</td>
							<td class="col2">{{this.$route.query.violationName}}</td>
							<td class="col3">工作单位</td>
							<td>{{this.$route.query.workOrgName}}</td>
						</tr>
						<tr>
							<td class="col1">隔离区通行证号</td>
							<td class="col2">{{this.$route.query.passNumber}}</td>
							<td class="col3">内场驾驶证证号</td>
							<td>{{this.$route.query.driverLicenseNumber}}</td>
						</tr>
						<tr class="tr3">
							<td class="col1">联系电话</td>
							<td colspan="3">{{this.$route.query.phone}}</td>
						</tr>
						<tr class="tr4">
							<td class="col1">违规主体</td>
							<td class="col2">{{this.$route.query.violationCodeName}}</td>
							<td class="col3">车牌号码</td>
							<td>{{this.$route.query.carNo}}</td>
						</tr>
						<tr class="tr5">
							<td colspan="4" class="mainDescription">
								<div class="description">
									当事人/你单位人员于<span>（{{vioYear}}）</span>年<span>（{{vioMonth}}）</span>月<span>（{{vioDay}}）</span>日<span v-show="vioHours">({{vioHours}})时</span>在机坪工作时，<span>（{{this.$route.query.violationDescription}}）</span>违反《成都双流国际机场机坪运行管理规则》<span>（{{this.$route.query.violationRulesText}}）</span>规定，机坪运行管理机构将根据相关处罚规定对当事人记扣<span>（{{this.$route.query.deductionScore}}）</span>分，同时，请你单位按照
									相关管理规定进行处理，并于一周内将处理情况反馈机坪管委会办公室。（电话/传真：85206362）
								</div>
								<div class="date">
									<span>{{year}}</span>
									年
									<span>{{month}}</span>
									月
									<span>{{day}}</span>
									日
								</div>
							</td>
						</tr>
						<tr class="tr6">
							<td class="col1">检查人</td>
							<td class="col2">{{this.$route.query.createByName}}</td>
							<td class="col3">当事人签名</td>
							<td></td>
						</tr>
						<tr class="tr8-2">
							<td class="col1">备注</td>
							<td colspan="3"></td>
						</tr>
						<tr class="tr9">
							<td colspan="4" class="footer">
								<div>成都双流国际机场机坪管委会制</div>
							</td>
						</tr>
					</tbody>
				</table>
				<p>
					第二联

					责任单位联
				</p>
			</div>
		</section>
		<button class="noprint" @click="doPrint">打印</button>
	</section>
	<!--endprint-->
</template>

<style>
.el-header{
	display:none !important;
}
</style>

<script>
	export default {
		name:"violationNotice",
		data(){
			return{
				year:'',
				month:'',
				day:'',
				vioYear:'',
				vioMonth:'',
				vioDay:'',
				vioHours:'',
			}
		},
		methods:{
			getDate(){
				let D = new Date();
				this.year = D.getFullYear();
				this.month = D.getMonth()+1;
				this.day = D.getDate();
			},
			getVioTime(){
				let vTime = this.$route.query.violationTime;
				let arrTime = vTime.split('-');
				let arrTime2 = arrTime[2].split(' ');
				this.vioYear = arrTime[0];
				this.vioMonth = arrTime[1];
				this.vioDay = arrTime2[0];
				this.vioHours = arrTime2[1];
			},
			doPrint(){
				let bdhtml,sprnstr,eprnstr,prnhtml;
				bdhtml = window.document.body.innerHTML;
				sprnstr = '<section class="violationNotice">';
				eprnstr = "</section>";
				prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr));
				prnhtml = prnhtml.substring(0,prnhtml.lastIndexOf(eprnstr)+10);
				window.document.body.innerHTML = prnhtml;
				window.print();
				window.location.reload();
			},
		},
		beforeMount(){
			this.getDate();
			this.getVioTime();
		}
	}
</script>
