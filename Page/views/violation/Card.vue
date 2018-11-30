<template>
<div>
    <div class="violation-card">
        <el-col :span="5" v-for="c in card" v-bind:key="c.id">
            <el-card shadow="hover" >
                <div class="violation-id">
                    <i class="el-icon-location" />
                    <span>Id:{{c.id}} {{c.name}}</span>
                    <span class="tag">{{c.type}}</span>
                </div>
                <div class="company">{{c.company}}</div>
                <div class="time">{{c.time}}</div>
                <div class="decribe">
                    <div class="decribe-word">违规描述:{{c.describe}}</div>
                    <div class="decribe-img">
                        <img class="picture" alt="img"/>
                        <img class="picture" alt="img"/>
                        <img class="picture" alt="img"/>
                    </div>
                </div>
                <div v-if="status == 'wait'" class="status" >
                    <button>通过</button>
                    <button>不通过</button>
                    <!-- <span>{{statusValue}}</span> -->
                </div>
                <div v-else class="status0">
                    <span>审核状态</span>
                    <button class="reback">撤回</button>
                </div>
            </el-card>
        </el-col>
        <!-- <el-col :span="5">
            <el-card shadow="hover">
                <div class="violation-id">
                    <i class="el-icon-goods" />
                    <span>Id:222 章三</span>
                    <span class="tag">人员</span>
                </div>
                <div class="company">成都航空公司</div>
                <div class="time">2018-11-22</div>
                <div class="decribe">
                    <div class="decribe-word">违规描述</div>
                    <div class="decribe-img">
                        <img class="picture" alt="img"/>
                        <img class="picture" alt="img"/>
                        <img class="picture" alt="img"/>
                    </div>
                </div>
                <div class="status">
                    <button>通过</button>
                    <button>不通过</button>
                </div>
            </el-card>
        </el-col>
        <el-col :span="5">
            <el-card shadow="hover">
                <div class="violation-id">
                    <i class="el-icon-close" />
                    <span>Id:222 章三</span>
                    <span class="tag">人员</span>
                </div>
                <div class="company">成都航空公司</div>
                <div class="time">2018-11-22</div>
                <div class="decribe">
                    <div class="decribe-word">违规描述</div>
                    <div class="decribe-img">
                        <img class="picture" alt="img"/>
                        <img class="picture" alt="img"/>
                        <img class="picture" alt="img"/>
                    </div>
                </div>
                <div class="status">
                    <button>通过</button>
                    <button>不通过</button>
                </div>
            </el-card>
        </el-col>
        <el-col :span="5">
            <el-card shadow="hover">
                <div class="violation-id">
                    <i class="el-icon-goods" />
                    <span>Id:222 章三</span>
                    <span class="tag">人员</span>
                </div>
                <div class="company">成都航空公司</div>
                <div class="time">2018-11-22</div>
                <div class="decribe">
                    <div class="decribe-word">违规描述</div>
                    <div class="decribe-img">
                        <img class="picture" alt="img"/>
                        <img class="picture" alt="img"/>
                        <img class="picture" alt="img"/>
                    </div>
                </div>
                <div class="status">
                    <button>通过</button>
                    <button>不通过</button>
                </div>
            </el-card>
        </el-col>
        <el-col :span="5">
            <el-card shadow="hover">
                <div class="violation-id">
                    <i class="el-icon-close" />
                    <span>Id:222 章三</span>
                    <span class="tag">人员</span>
                </div>
                <div class="company">成都航空公司</div>
                <div class="time">2018-11-22</div>
                <div class="decribe">
                    <div class="decribe-word">违规描述</div>
                    <div class="decribe-img">
                        <img class="picture" alt="img"/>
                        <img class="picture" alt="img"/>
                        <img class="picture" alt="img"/>
                    </div>
                </div>
                <div class="status">
                    <button>通过</button>
                    <button>不通过</button>
                </div>
            </el-card>
        </el-col> -->
    </div>
</div>
</template>

<script>
    export default{
        data(){
            return {
                props:"statusValue",
                status: '22',
                card:[
                    {id:1111,name:"章三",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                    {id:222,name:"里斯",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                    {id:333,name:"王麻子",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                    {id:444,name:"哈喽",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                    {id:555,name:"刘淇",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                    {id:666,name:"李俊",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                    {id:777,name:"陈红",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                    {id:888,name:"事实上",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                    {id:999,name:"绅士手",type:"人员",company:"成都航空公司",time:"2018-11-22",desctibe:"违规闯入禁入区域"},
                ]
            }
        },
        methods:{
            // toggleTabs(tabKey){
            //     this.status = tabKey;
            //     this.currentView = tabKey;
            // }
        }
    }
</script>
