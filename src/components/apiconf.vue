<template>
    <div class="apiconf">
        <h3>Api请求配置</h3>
        <p style="font-size: 14px">选择api请求数据的方式</p>
        <transition name="el-zoom-in-top">
        <div class="radio" v-show="show">
            <el-radio v-model="radio1" label="1" border class="r1">使用原生Fetch</el-radio><br>
            <el-radio v-model="radio1" label="2" border class="r2">使用Axios</el-radio>
        </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "apiconf",
        data(){
            return{
                radio1: '1',
                show: false
            }
        },
        watch: {
            radio1: function () {
                let that = this;
                if(that.radio1 === '1'){
                    that.$root.api_tool = 'fetch';
                }else if(that.radio1 === '2'){
                    that.$root.api_tool = 'axios';
                }
            }
        },
        created() {
            let api_tool = this.$root.api_tool;
            if (api_tool === 'axios'){
                this.radio1 = '2'
            }else if(api_tool === 'fetch'){
                this.radio1 = '1'
            }
        },
        mounted(){
            this.show = true;
        },
        updated() {
            this.show = true;
        }
    }
</script>

<style scoped>
    .apiconf{padding: 30px 0}
    .apiconf .radio{margin: 0 auto;width: 200px;text-align: center;padding-bottom: 30px;padding-top: 30px}
    .apiconf .r1,.apiconf .r2{margin-top: 20px;width: 150px}
    .apiconf /deep/ .el-radio{margin-right: 0}
</style>