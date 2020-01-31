<template>
    <div class="apiabout">
        <h1>关于Api Test</h1>
        <transition name="el-zoom-in-top">
        <div style="text-align: left;max-width: 600px;margin: 0 auto;padding: 10px" v-show="show">
            <p><span>如何运作</span><br>Api的请求使用Restful规范的json数据类型进行数据传输，使用原生的Fetch或者使用Axios请求库发送json数据.</p>
            <p><span>格式要求</span><br>基于Restful api的实现，要求请求的数据是规范的JSON字符串</p>
            <p><span>请求方式</span><br>请求的发送支持<span style="color: aqua">GET</span>和<span style="color: aqua">POST</span>请求格式，暂时未实现其他的http请求方式</p>
            <p><span>使用的库</span><br>支持使用原生<span style="color: #e9f01d">Fetch API</span>和<span style="color: forestgreen">Axios</span>异步请求库两种解决方案</p>
        </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "apiabout",
        data(){
            return{
                show: false
            }
        },
        mounted() {
            this.show = true
        },
        updated() {
            this.show = true
        }
    }
</script>

<style scoped>
    .apiabout{padding: 30px}
    .apiabout h1{font-size: 22px;padding-bottom: 30px}
    .apiabout p{font-size: 16px;margin-bottom: 20px}
    .apiabout p>span:first-child{font-size: 18px;font-weight: bold}

</style>