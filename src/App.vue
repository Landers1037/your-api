<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="top-menu" mode="horizontal">
      <el-submenu index="1">
        <template slot="title">开始</template>
        <el-menu-item index="1-1" @click="demo">查看demo</el-menu-item>
        <el-menu-item index="1-2" @click="home">第一份文档</el-menu-item>
        <el-menu-item index="1-3" @click="about">关于本软件</el-menu-item>
        <el-menu-item index="1-4" @click="quit">退出</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">编辑</template>
        <el-menu-item index="2-1" @click="readdoc">导入文档</el-menu-item>
        <el-menu-item index="2-2">新建分支</el-menu-item>
        <el-menu-item index="2-3">导出文档</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">请求测试</template>
        <el-menu-item index="3-1" @click="apitest">API测试</el-menu-item>
        <el-menu-item index="3-2" @click="apiconf">请求配置</el-menu-item>
        <el-menu-item index="3-3" @click="apiabout">关于请求</el-menu-item>
      </el-submenu>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Github源码</a></el-menu-item>
    </el-menu>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
</template>
<script>
  const ele = require('electron');
  const app = ele.remote.app;
  const dialog = ele.remote.dialog;
  const remote = ele.remote;
export default {
  name: 'app',
  data(){
    return{
      activeIndex: '1',
      dialogVisible: false,
      file: ''
    }
  },
  watch: {
    file: function () {
      
    }
  },
  methods: {
    // 开始菜单
    home(){
        this.$router.push('/middle');
        setTimeout(300);
      this.$router.push('/');
    },
    about(){
        this.$router.push('/middle');
        setTimeout(300);
      this.$router.push('/about');
    },
    demo(){
        this.$router.push('/middle');
        setTimeout(300);
      this.$router.push('/demo');
    },
    quit(){
      app.quit();
    },
    readdoc(){
      let tofile = 'filepath';
      let that = this;
      dialog.showOpenDialog(
              {
                title: "选择本地文档",
                properties: ['openFile']
              },
              function (file) {
                tofile = file[0];
                console.log(tofile);
                that.$router.push('/middle');
                setTimeout(300);
                that.$router.push({name:"readdoc",params: {file:tofile}});
              }).catch(err=>{
        console.log(err);
      });

    },

    //api测试
    apitest(){
      this.$router.push('/apitest');
    },
    apiconf(){
      this.$router.push('/apiconf')
    },
    apiabout(){
      this.$router.push('/apiabout')
    },
  }
}
</script>

<style lang="less">
  @bgcolor: #2f343f;
  @bgfocus: #2f344f;
  @font_family: "Helvetica Neue", Helvetica, "PingFang SC",'Monaco', "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  *{margin: 0;padding: 0}
  html{height: 100%}
body{
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
  background-color: @bgcolor!important;
  margin: 0;
  color: #fff;
  overflow-y: hidden;
}
::-webkit-scrollbar{
  width: 12px;
  height: 10px;
}
::-webkit-scrollbar-track-piece{
  border-radius: 0;
}
::-webkit-scrollbar-track{
  border-radius: 0;
  background-color: @bgcolor;
}
::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #404f65;
}
#app {
  font-family: @font_family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: inherit;
}
.top-menu.el-menu{background-color: @bgcolor;color: white;z-index: 999}
.top-menu .el-menu-item,.top-menu .el-submenu__title{font-size: 12px;padding: 0 12px}
.top-menu.el-menu.el-menu--horizontal{border-bottom: 1px solid #404040}
.top-menu.el-menu--horizontal>.el-menu-item.is-active{border-bottom: none;color: #f0f0f0}
.top-menu.el-menu--horizontal>.el-submenu .el-submenu__title{color: #fff}
.top-menu.el-menu--horizontal>.el-submenu:focus .el-submenu__title, .top-menu.el-menu--horizontal>.el-submenu:hover .el-submenu__title{color: white}
.top-menu.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .top-menu.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .top-menu.el-menu--horizontal>.el-submenu .el-submenu__title:hover{background-color: #2f343f}
.top-menu.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .top-menu.el-menu--horizontal .el-menu-item:not(.is-disabled):hover{color: #fff}
.top-menu .el-submenu__title:focus, .top-menu .el-submenu__title:hover{background-color: @bgfocus}

.top-menu.el-menu--horizontal>.el-submenu .el-submenu__title{height: 40px;line-height: 40px}
.top-menu.el-menu--horizontal>.el-menu-item{height: 40px;line-height: 40px;color: #afafaf}
.el-menu-item{font-size: 12px}
/*激活*/
.top-menu.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{color: #fff;border-bottom: none}
/*二级菜单*/
.el-menu--horizontal .el-menu.el-menu--popup.el-menu--popup-bottom-start{background-color: @bgfocus}
.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title{background-color: @bgfocus!important;color: white!important;font-size: 12px}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{color: #f0f0f0}
</style>
