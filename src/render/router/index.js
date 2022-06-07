import {createRouter, createWebHashHistory} from "vue-router";

// 引入modules
import home from "./modules/home";

let modules = [
  ...home,
];

const routes = modules;


const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 登录后更新路由目录
let asyncRoutes = [];

// 登录后添加路由
export function addRoutes() {
  asyncRoutes.forEach(item => {
    modules.push(item);
    router.addRoute(item);
  });
}


export function removeAccount() {
  modules.forEach(item => {
    if (item.name === "account") {
      let index = modules.indexOf(item);
      modules.splice(index, 1);
    }
  });
}


// 路由跳转前
router.beforeEach((to, _from, next) => {
  next();
});
// 路由跳转完成
router.afterEach((to, _from) => {

});

export {
  modules
};


export default router;
