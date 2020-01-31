<template>
    <transition name="el-zoom-in-top">
    <div class="about" v-show="show">
        <h1>关于Your Api</h1>
        <p>这是一个集成Restful api测试和api文档编写一体的测试工具<br></br>使用Electron,Go开发</p>
        <br>
        <p class="github_doc">你可以在<a href="https://github.com/landers1037" target="_blank">这里</a>查看完整的项目文档</p>

        <div class="version">
            <ul>
                <li>Chromium {{ data["chrome-version"] }}</li>
                <li>Electron {{ data["ele-version"] }}</li>
                <li>Nodejs {{ data["node"] }}</li>
            </ul>
        </div>
    </div>
    </transition>
</template>

<script>
    export default {
        name: "about",
        data(){
            return{
                data: {
                    "chrome-version": '',
                    "ele-version": '',
                    "node": ''
                },
                show: false,
            }
        },
        mounted() {
            let _this = this;
            _this.show = true;
            this.data["chrome-version"] = process.versions.chrome;
            this.data["ele-version"] = process.versions.electron;
            this.data["node"] = process.versions.node;
        },
        updated() {
            this.show = true;
        }
    }
</script>

<style scoped>
    .about{padding: 30px}
    .about h1{font-size: 22px}
    .about p{font-size: 16px;margin-top: 30px}
    .about .doc{font-size: 14px}
    .about .github_doc a{text-decoration: none;color: #fa3b85}
    .about .version ul{text-align: left;margin: 0 auto;width: 250px;margin-top: 30px}
    .about .version li{list-style-type: none;font-size: 14px;padding: 2px 2px}

</style>