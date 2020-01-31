<template>
    <div class="apitest">
        <div class="content">
            <h3>API Test</h3>
            <el-form class="form">
                <el-input  v-model="testapi" class="api-test">
                    <template slot="prepend">{{method}}</template>
                </el-input>
                <el-switch
                        v-model="choose_method"
                        active-color="#00ff80"
                        inactive-color="#7bbefa"
                        class="switch"
                >
                </el-switch>
                <el-button type="primary" class="but" @click="send">发送</el-button>
                <span class="res-span">请求数据🚀</span>
                <codemirror
                        ref="mycode1"
                        v-model="req"
                        :options="cmOptions1"
                        class="code1">
                </codemirror>
                <span class="req-span">响应数据🛸</span>
                <codemirror
                        ref="mycode2"
                        v-model="res"
                        :options="cmOptions2"
                        class="code2">
                </codemirror>

            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { codemirror } from 'vue-codemirror';
    import "codemirror/theme/ayu-dark.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
    require("codemirror/mode/javascript/javascript.js"); // 这里引入的模式的js
    import { MessageBox } from 'element-ui';
    export default {
        name: "apitest",
        data() {
            return {
                testapi: '',
                req: undefined,
                res: undefined,
                open: true,
                method: 'GET',
                choose_method: true,
                cmOptions1: {
                    value: '',
                    mode: {name: "javascript", json: true},
                    theme: "ayu-dark",
                    tableSize: 2,
                    lineNumbers: true,
                    lineWrapping: true,
                    line: true,
                    cursorHeight: 1
                },
                cmOptions2: {
                    value: '',
                    mode: {name: "javascript", json: true},
                    theme: "ayu-dark",
                    tableSize: 2,
                    lineNumbers: true,
                    lineWrapping: true,
                    line: true,
                    // readOnly: true,
                    cursorBlinkRate: -1
                }
            }
        },
        watch: {
          res: function () {

          },
          req: function () {

          },
          testapi: function () {

          },
          choose_method: function () {
              let that = this;
              if(that.choose_method){
                  that.method = 'GET'
              }else {
                  that.method = 'POST'
              }
          }
        },
        components: {
            codemirror
        },
        created() {
            window.addEventListener('keydown', event => {
                if (event.keyCode === 9) {
                    event.preventDefault();
                }
            });
        },
        methods: {
            send(){
                let that = this;
                let api = that.testapi;
                let api_tool = that.$root.api_tool;
                if (that.choose_method){
                    //get
                    //fetch
                    // console.log(that.$root.api_tool);
                    if(api_tool === 'fetch' && api.length>0) {
                        fetch(api).then((response) => response.json())
                            .then(data => {
                                let data_string = JSON.stringify(data, undefined, 2);
                                that.res = data_string;
                            }).catch(err => {
                            MessageBox.alert('get请求失败，请检查接口');
                        });
                    }else if(api_tool === 'axios' && api.length>0){
                        axios.get(api).then(res=>{
                            let data_string = JSON.stringify(res.data, undefined, 2);
                            console.log(data_string);
                            that.res = data_string;
                        }).catch(err=>{
                            MessageBox.alert('get请求失败，请检查接口');
                        });
                    }
                }else {
                    //post
                    //fetch
                    if (api_tool === 'fetch' && api.length>0) {
                        fetch(api, {
                            method: 'post',
                            body: that.res
                        })
                            .then((response) => response.json())
                            .then(data => {
                                let data_string = JSON.stringify(data, undefined, 2);
                                that.res = data_string;
                            }).catch(err => {
                            MessageBox.alert('post请求失败，请检查接口');
                        })
                    }else if(api_tool === 'axios' && api.length>0){
                        axios.post(api,that.res).then(res=>{
                            let data_string = JSON.stringify(res.data, undefined, 2);
                            that.res = data_string;
                        }).catch(err=>{
                            MessageBox.alert('post请求失败，请检查接口');
                        });
                    }
                }


            }
        }
    }
</script>

<style scoped>
    .apitest{padding-bottom: 30px;overflow-y: scroll;height: calc(100% - 41px)}
    .apitest .content{padding: 20px 0}
    .form{max-width: 520px;padding: 10px;margin: 0 auto}
    .form /deep/ .el-form-item__label{color: white;}
    .form /deep/ .el-input__inner{padding: 0 15px;height: 35px;line-height: 35px}
    .form /deep/ .el-input-group__append, .form /deep/ .el-input-group__prepend{padding: 0 12px}
    .form .res-span,.form .req-span{display: block;text-align: left;padding: 6px;font-size: 14px;margin-top: 20px}
    .form .code1{text-align: left}
    .form .code2{text-align: left}
    .form /deep/ .CodeMirror{height: 180px;border-radius: 7px;font-family: Monaco,monospace;font-size: 14px}
    .form /deep/ .api-test{max-width: 360px}
    .form /deep/ .but{margin: 0 10px;padding: 10px 15px}
    .form /deep/ .switch{margin: 0 6px}
    .form /deep/ .el-switch__core:after{left: 0;top:0;height: 35px;width: 20px;border-radius: 4px}
    .form /deep/ .el-switch__core{border-radius: 4px;border: none;height: 35px}
    .form /deep/ .el-switch.is-checked .el-switch__core::after{margin-left: -20px}
    @media (max-width: 960px) {
        .form{max-width: 520px;padding: 10px;margin: 0 auto}
        .form /deep/ .api-test{max-width: 360px}
    }
    @media (max-width: 1600px) and (min-width: 1000px) {
        .form{max-width: 840px;padding: 10px;margin: 0 auto}
        .form /deep/ .api-test{max-width: 500px}
    }
</style>

<style>
    .form textarea{font-family: Monaco,monospace!important;}
</style>