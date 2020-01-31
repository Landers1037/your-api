<template>
    <div class="readdoc">
        <el-row class="row">
            <el-col :span="6">
                <div class="grid-content doc-tree" ref="treescroll">
                    <el-tree
                            :data="data"
                            ref="tree"
                            check-on-click-node
                            @node-click="show"
                            default-expand-all>
                    </el-tree>
                </div></el-col>
            <el-col :span="18">
                <transition name="el-fade-in">
                <div class="grid-content doc-panel" ref="docscroll">
                    <div class="doc">
                        <div style="padding: 10px 0"></div>
                        <h3>你的文档</h3>
                        <div id="api_name_div">
                            <span style="font-size: 14px">接口名称：</span>
                            <el-input
                                    v-model="api_name"
                                    id="api_name"
                                    clearable>
                            </el-input>

                            <span style="font-size: 14px;margin-left: 20px">分组：</span>
                            <el-input
                                    v-model="api_parent"
                                    id="api_parent"
                                    clearable>
                            </el-input>
                        </div>

                        <div id="api_detail_div">
                            <span style="font-size: 14px">接口说明：</span>
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 8}"
                                    placeholder="请输入内容"
                                    v-model="api_detail"
                                    id="api_detail"
                            >
                            </el-input>
                        </div>

                        <span class="res-span">请求数据🚀</span>
                        <codemirror
                                ref="mycode1"
                                v-model="req"
                                :options="cmOptions"
                                class="code1">
                        </codemirror>
                        <span class="req-span">响应数据🛸</span>
                        <codemirror
                                ref="mycode2"
                                v-model="res"
                                :options="cmOptions"
                                class="code2">
                        </codemirror>

                        <el-button  type="primary" @click="save" id="save">保存</el-button>
                        <el-button type="warning" @click="clean" id="clean">清空</el-button>
                        <div style="padding: 10px 0"></div>
                    </div>
                </div>
                </transition>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {app,remote} from 'electron';
    import {MessageBox} from 'element-ui';
    import BScroll from 'better-scroll';
    import { codemirror } from 'vue-codemirror';
    import "codemirror/theme/ayu-dark.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
    require("codemirror/mode/javascript/javascript.js"); // 这里引入的模式的js
    export default {
        name: 'readdoc',
        data(){
            return{
                path: '',
                data: [],
                api_name: '',
                api_detail: '',
                api_parent: '',
                req: '',
                res: '',
                cmOptions: {
                    value: '',
                    mode: {name: "javascript"},
                    theme: "ayu-dark",
                    tableSize: 2,
                    lineNumbers: true,
                    lineWrapping: true,
                    line: true,
                    cursorHeight: 1
                }
            }
        },
        components: {
            codemirror
        },
        watch: {
            data: function () {

            },
            req: function () {

            },
            res: function () {

            },
            api_detail: function () {

            },
            api_name: function () {

            },
            api_parent: function () {

            },
            path: function () {

            },
        },
        created(){
            let path = this.path;
            this.path = path = this.$route.params.file;
            let that = this;
            const fs = require('fs');
            fs.readFile(path,function (err,data) {
                if(err){
                    console.log(err);
                }else {
                    let filestream = JSON.parse(data.toString());
                    that.data = filestream;
                    that.api_parent = filestream[0].label;
                    that.api_name = filestream[0].children[0].label;
                    that.api_detail = filestream[0].api_detail;
                    that.req = filestream[0].children[0].req;
                    that.res = filestream[0].children[0].res;
                }
            });
        },
        mounted(){
            this.$nextTick(()=>{
                this.initscroll();
            });
        },
        updated: function () {
            let path = this.path;
            this.path = path = this.$route.params.file;
            let that = this;
            const fs = require('fs');
            fs.readFile(path,function (err,data) {
                if(err){
                    console.log(err);
                }else {
                    let filestream = JSON.parse(data.toString());
                    that.data = filestream;
                    that.api_parent = filestream[0].label;
                    that.api_name = filestream[0].children[0].label;
                    that.api_detail = filestream[0].api_detail;
                    that.req = filestream[0].children[0].req;
                    that.res = filestream[0].children[0].res;
                }
            });
        },
        methods: {
            save(){
                let that = this;
                let data = that.data;
                length = data.length;

                if(length>0){
                    for(var i=0;i<length;i++){
                        if(that.data[i].label===that.api_parent){
                            //api父级的查重
                            let new_dict_chi = {};
                            new_dict_chi = {}; // clean for child
                            new_dict_chi.label = that.api_name;
                            new_dict_chi.detail = that.api_detail;
                            new_dict_chi.req = that.req;
                            new_dict_chi.res = that.res;
                            that.data[i].children.push(new_dict_chi);

                        }else{
                            let new_dict = {};
                            let new_dict_chi = {};
                            new_dict.label = that.api_parent;
                            new_dict.children = [];

                            new_dict_chi = {}; // clean for child
                            new_dict_chi.label = that.api_name;
                            new_dict_chi.detail = that.api_detail;
                            new_dict_chi.req = that.req;
                            new_dict_chi.res = that.res;
                            new_dict.children.push(new_dict_chi);
                            data.push(new_dict);
                            // console.log(data);
                        }
                    }
                }else{
                    let new_dict = {};
                    let new_dict_chi = {};
                    new_dict.label = that.api_parent;
                    new_dict.children = [];

                    new_dict_chi = {}; // clean for child
                    new_dict_chi.label = that.api_name;
                    new_dict_chi.detail = that.api_detail;
                    new_dict_chi.req = that.req;
                    new_dict_chi.res = that.res;
                    new_dict.children.push(new_dict_chi);
                    data.push(new_dict);
                }


                const fs = require('fs');
                let file = JSON.stringify(that.data,undefined,2);
                fs.writeFile('./1.json',file,function (err) {
                    if(err){
                        console.log(err);
                    }
                    MessageBox.alert("保存接口至本地文件");
                });

            },
            clean(){
                let that = this;
                that.api_name = '';
                that.api_detail = '';
                that.api_parent = '';
                that.req = '';
                that.res = '';
            },
            show(){
                let data = this.$refs.tree.getCurrentNode();
                this.req = data.req;
                this.res = data.res;
                this.api_name = data.label;
                this.api_detail = data.api_detail;
            },
            initscroll(){
                this.docscroll = new BScroll(this.$refs.docscroll,{
                    click: true,
                    scrollY: true,
                    scrollX: false,
                    probeType: 2, //这个属性设置之后可以监听得到了
                    mouseWheel: true,
                    bounce: false
                });
                this.treescroll = new BScroll(this.$refs.treescroll,{
                    click: true,
                    scrollY: true,
                    scrollX: false,
                    probeType: 2, //这个属性设置之后可以监听得到了
                    mouseWheel: true,
                    bounce: false
                });
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<style>
    .readdoc,.row{height: inherit}
    .el-col-6{height: calc(100% - 41px)}
    .el-col-18{height: calc(100% - 41px)}
    .doc-tree{height: 100%}
    .doc-tree .el-tree{background: #2f343f;color: #f5f5f5;border-right: 1px solid #4f4f4f}
    .doc-tree .el-tree-node__content:hover,.doc-tree .el-tree-node__content:focus{background: #2f344f}
    .doc-tree .el-tree-node:focus>.el-tree-node__content{background: #2f344f}

    .readdoc .doc-panel{height: 100%;}
    .readdoc .doc{text-align: left;padding: 0 30px;height: fit-content;}
    .doc /deep/ #api_name{width: 200px;display: inline-block}
    .doc /deep/ .el-input--suffix{width: 200px}
    .doc /deep/ .el-input--suffix .el-input__inner{height: 32px;line-height: 32px}
    .doc #api_name_div{padding: 10px 0}
    .doc #api_detail_div{padding: 10px 0}

    .doc /deep/ .el-textarea__inner{margin-top: 10px;font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif}
    .doc /deep/ .el-textarea__inner:focus{border-color: transparent}
    @media (max-width: 960px) and (min-width: 720px) {
        .doc /deep/ .el-textarea__inner{max-width: 640px}
    }
    @media (max-width: 1600px) and (min-width: 1000px) {
        .doc /deep/ .el-textarea__inner{max-width: 1200px}
    }
    .doc .res-span,.doc .req-span{display: block;text-align: left;padding: 8px;font-size: 14px;margin-top: 10px}
    .doc .code1{text-align: left}
    .doc .code2{text-align: left}
    .doc /deep/ .CodeMirror{height: 180px;border-radius: 7px;font-family: Monaco,monospace;font-size: 14px}
    .doc #save{margin-top: 20px}
    .doc #clean{margin-top: 20px;margin-left: 15px}
</style>