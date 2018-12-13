<template>
  <div class="violation">
		<div>
        <el-row class="tooltip">
            <el-col :span="5">
                <button class="tab-btn wait font-One" v-bind:class="{ 'active-tab': tabActive == 'wait'}" @click="toggleTabs('wait')">待审核{{this.waitItems.length}}</button>
                <button class="tab-btn all font-Orb"  v-bind:class="{ 'active-tab':tabActive == 'all'}" @click="toggleTabs('all')">全部</button>
            </el-col>
            <el-col :span="19" class="topbar">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="inputSearch"
                    class="seach-input"
                    v-on:click="searchAll(e)"
                ></el-input>
                <span class="demonstration">时间段</span>
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    @change="handleSearch"
                    value-format="timestamp">
                </el-date-picker>
                <el-button @click="openShowImg" size="mini" class="font-YaheiBold">单位管理</el-button>
                <el-button @click="handleSearch" size="mini" type="primary">查询</el-button>
                <el-button size="mini" >
                    <a  @click = "exportExcel">导出</a>
                </el-button>
            </el-col>
        </el-row>
        <div class="dialog">
            <ShowImg/>
        </div>
        <div v-if="tabs!=='all'">
            <div>
                <div class="violation-card">
                    <el-col :span="5" v-for="c in waitItems" v-bind:key="c.id">
                        <el-card shadow="hover" >
                            <div class="violation-id">
                                <i  :class="iconType(c.violationCodeName)" />
                                <span>Id:{{c.violationId}} {{c.violationName}}</span>
                                <span class="tag" :class="tagColor(c.violationCodeName)">{{c.violationCodeName}}</span>
                            </div>
                            <div class="company">{{c.airLineName}}所属公司哈哈哈</div>
                            <div class="time">{{c.reportTime|currency}}</div>
                            <div class="decribe">
                                <div class="decribe-word">违规描述:{{c.violationDescription}}</div>
                                <div class="decribe-img" @click="openShowImg" >
                                    <img class="picture" alt="img" :src="img"/>
                                    <img class="picture" alt="img" :src="img"/>
                                    <img class="picture" alt="img" :src="img"/>
                                </div>
                                <ShowImg :picture="c.picture"/>
                            </div>
                            <div class="status" >
                                <el-button type="success" size="small" @click="submitStatus(c,1)">通过</el-button>
                                <el-button type="danger" size="small" @click="submitStatus(c,2)" plain>不通过</el-button>
                            </div>
                        </el-card>

                    </el-col>
                </div>
	        </div>
        </div>
        <div v-else>
            <div class="all-table">
            <el-table :data="cards" stripe style="width: 100%" :cell-class-name="violationTypeBg">
              <el-table-column label="序号" width="80" type="index" :index="indexMethod"/>
              <!-- <el-table-column prop="violationCodeName" label="违规类型" width="80" 	/> -->
              <el-table-column
                prop="violationCodeName"
                label="违规类型"
                width="80"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <el-tag
                    :type="violationTypeBg1(scope.row.violationCodeName)"
                    disable-transitions
                  >{{scope.row.violationCodeName}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="violationCode" label="人员编号" width="80"/>
              <el-table-column prop="violationName" label="违规人员" width="130"/>
              <el-table-column prop="violationName1" label="车辆编号" min-width="80"/>
              <el-table-column prop="violationName2" label="设备编号" min-width="80"/>
              <el-table-column prop="airLineName" label="所属单位" width="180"/>
              <el-table-column
                prop="violationDescription"
                label="违规描述"
                min-width="180"
                :show-overflow-tooltip="true"
              />
              <el-table-column label="图像记录" min-width="80">
                <template slot-scope="scope">
                  <el-button

                    size="mini"
                    type="primary"
                    @click="openShowImg(scope.row.picture)"
                  >查看</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="reportTime" :formatter="dateFormat" label="上报时间" width="180"/>
              <el-table-column prop="status" label="状态" :formatter="statusFormat" width="80"/>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="submitStatus(scope.row,3)">撤回</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="dialog">
              <ShowImg :picture ="getPic"/>
            </div>
        </div>
        <div class="block page-nations">
            <span class="demonstration">调整每页显示条数</span>
            <el-pagination
              background	
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
        </div>
        </div>
    </div>
  </div>
</template>