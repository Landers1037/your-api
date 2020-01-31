<template>
    <div class="demo">
        <div class="content">
        <h3>这是一个demo示例</h3>
        <el-form class="form">
            <el-input placeholder="测试后台api地址" v-model="api">
                <template slot="prepend">Http://</template>
            </el-input>
            <span class="res-span">请求数据🚀</span>
                <codemirror
                        ref="mycode1"
                        :value="req"
                        :options="cmOptions"
                        class="code1">
                </codemirror>
            <span class="req-span">响应数据🛸</span>
                <codemirror
                        ref="mycode2"
                        :value="res"
                        :options="cmOptions"
                        class="code2">
                </codemirror>

        </el-form>
        </div>
    </div>
</template>

<script>
    import { codemirror } from 'vue-codemirror';
    import "codemirror/theme/ayu-dark.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
    require("codemirror/mode/javascript/javascript.js"); // 这里引入的模式的js
    export default {
        name: "demo",
        data() {
            return {
                api: '',
                req: undefined,
                res: undefined,
                cmOptions: {
                    value: '',
                    mode: {name: "javascript", json: true},
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
        created() {
            window.addEventListener('keydown', event => {
                if (event.keyCode === 9) {
                    event.preventDefault();
                }
            });
        },
        methods: {

        }
    }
</script>

<style scoped>
    .demo{padding-bottom: 30px;overflow-y: scroll;height: calc(100% - 41px)}
    .content{padding: 20px;overflow-y: scroll}
    .form{max-width: 520px;padding: 10px;margin: 0 auto}
    .form /deep/ .el-form-item__label{color: white;}
    .form /deep/ .el-input__inner{padding: 0 15px;height: 35px;line-height: 35px}
    .form /deep/ .el-input-group__append, .form /deep/ .el-input-group__prepend{padding: 0 12px}
    .form .res-span,.form .req-span{display: block;text-align: left;padding: 6px;font-size: 14px;margin-top: 20px}
    .form .code1{text-align: left}
    .form .code2{text-align: left}
    .form /deep/ .CodeMirror{height: 180px;border-radius: 7px;font-family: Monaco,monospace;font-size: 14px}
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