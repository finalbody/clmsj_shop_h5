(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-public-login"],{"0ef9":function(t,n,e){"use strict";var a=e("ee27");e("a9e3"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("96cf");var i=a(e("c964")),o={data:function(){return{mobile:"",password:"",logining:!1}},onLoad:function(){},methods:{getUserInfo:function(t){if(!t.detail.iv)return uni.showToast({title:"您取消了授权,登录失败",icon:"none"}),!1;var n=this;uni.login({provider:"weixin",success:function(t){uni.getUserInfo({provider:"weixin",withCredentials:!0,success:function(e){uni.request({url:n.$Url+"/clmsj/login/index",data:{encrypt_data:encodeURIComponent(e.encryptedData),iv:encodeURIComponent(e.iv),code:t.code,type:2},method:"POST",success:function(t){0==t.data.code?(uni.setStorageSync("session_key",t.data.auth),uni.setStorageSync("userInfo",t.data.data.user),uni.navigateBack()):uni.showToast({icon:"none",title:"请重新获取信息..."})}})},fail:function(t){console.log("infoRes="+JSON.stringify(t))}})}})},onNavigateBack:function(t){uni.navigateBack({delta:Number(t||1)})},inputChange:function(t){var n=t.currentTarget.dataset.key;this[n]=t.detail.value},navBack:function(){uni.navigateBack({delta:Number(2)})},toRegist:function(){this.$api.msg("去注册")},toLogin:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function n(){var e,a,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.logining=!0,e=t.mobile,a=t.password,{mobile:e,password:a},n.next=5,t.$api.json("userInfo");case 5:i=n.sent,1===i.status?(t.login(i.data),uni.navigateBack()):(t.$api.msg(i.msg),t.logining=!1);case 7:case"end":return n.stop()}}),n)})))()}}};n.default=o},"10e1":function(t,n,e){"use strict";var a=e("3f08"),i=e.n(a);i.a},"1b8d":function(t,n,e){"use strict";e.r(n);var a=e("3cf6"),i=e("8c83");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("10e1");var r,s=e("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"50429004",null,!1,a["a"],r);n["default"]=u.exports},"3cf6":function(t,n,e){"use strict";var a,i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"wrapper"},[e("v-uni-view",{staticClass:"wechatapp"},[e("v-uni-view",{staticClass:"header"},[e("v-uni-open-data",{attrs:{type:"userAvatarUrl"}})],1)],1),e("v-uni-view",{staticClass:"auth-title"},[t._v("申请获取以下权限")]),e("v-uni-view",{staticClass:"auth-subtitle"},[t._v("获得你的公开信息（昵称、头像等）")]),e("v-uni-view",{staticClass:"login-btn"},[e("v-uni-button",{staticClass:"btn-normal",attrs:{openType:"getUserInfo",lang:"zh_CN",withCredentials:"true"},on:{getuserinfo:function(n){arguments[0]=n=t.$handleEvent(n),t.getUserInfo.apply(void 0,arguments)}}},[t._v("授权登录")])],1),e("v-uni-view",{staticClass:"no-login-btn"},[e("v-uni-button",{staticClass:"btn-normal",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onNavigateBack(2)}}},[t._v("暂不登录")])],1)],1)],1)},o=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}))},"3f08":function(t,n,e){var a=e("b42b");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=e("4f06").default;i("3e46b494",a,!0,{sourceMap:!1,shadowMode:!1})},"8c83":function(t,n,e){"use strict";e.r(n);var a=e("0ef9"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a},b42b:function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-50429004]{background:#fff}.container[data-v-50429004]{padding-top:115px;position:relative;width:100vw;height:100vh;overflow:hidden;background:#fff}.wrapper[data-v-50429004]{position:relative;z-index:90;background:#fff;padding-bottom:%?40?%;margin:0 20px}.wechatapp[data-v-50429004]{padding:%?80?% 0 %?48?%;border-bottom:%?1?% solid #e3e3e3;margin-bottom:%?72?%;text-align:center}.wechatapp .header[data-v-50429004]{width:%?190?%;height:%?190?%;border:2px solid #fff;margin:%?0?% auto 0;border-radius:50%;overflow:hidden;-webkit-box-shadow:1px 0 5px rgba(50,50,50,.3);box-shadow:1px 0 5px rgba(50,50,50,.3)}.auth-title[data-v-50429004]{color:#585858;font-size:%?34?%;margin-bottom:%?40?%}.auth-subtitle[data-v-50429004]{color:#888;margin-bottom:%?88?%;font-size:%?28?%}.login-btn[data-v-50429004]{padding:0 %?20?%}.login-btn uni-button[data-v-50429004]{height:%?88?%;line-height:%?88?%;background:#04be01;color:#fff;font-size:%?30?%;border-radius:%?999?%;text-align:center}.no-login-btn[data-v-50429004]{margin-top:%?20?%;padding:0 %?20?%}.no-login-btn uni-button[data-v-50429004]{height:%?88?%;line-height:%?88?%;background:#dfdfdf;color:#fff;font-size:%?30?%;border-radius:%?999?%;text-align:center}body.?%PAGE?%[data-v-50429004]{background:#fff}',""]),t.exports=n}}]);