(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"0b38":function(e,t,n){"use strict";var a={"uni-load-more":function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"e573"))}},o=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}))},"0d5b":function(e,t,n){"use strict";n.r(t);var a=n("7ade"),o=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=o.a},"1fb1":function(e,t,n){"use strict";n.r(t);var a=n("0b38"),o=n("0d5b");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("6410");var i,s=n("f0c5"),c=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);t["default"]=c.exports},6410:function(e,t,n){"use strict";var a=n("c71e"),o=n.n(a);o.a},"7ade":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;a(n("0295"));function a(e){return e&&e.__esModule?e:{default:e}}var o=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("e573"))}.bind(null,n)).catch(n.oe)},r=function(){n.e("components/empty").then(function(){return resolve(n("5a78"))}.bind(null,n)).catch(n.oe)},i={components:{uniLoadMore:o,empty:r},data:function(){return{tabCurrentIndex:0,loadingType:"more",orderList:{},page:0,navList:[{state:0,text:"全部"},{state:1,text:"待付款"},{state:3,text:"待收货"},{state:5,text:"已完成"}]}},onShow:function(){},onLoad:function(e){void 0==e.state&&(e.state=0),this.loadData()},onPullDownRefresh:function(){this.loadData("refresh")},onReachBottom:function(){this.loadData("more")},methods:{loadData:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"init",a=(arguments.length>1&&arguments[1],this.tabCurrentIndex),o=this.navList[a],r=o.state;if("refresh"===n||"init"==n){if("nomore"===this.loadingType)return;this.loadingType="loading"}else this.loadingType="more";"refresh"!==n&&"init"!=n&&"tabChange"!=n||(this.orderList=[],this.page=0),o.loadingType="loading",setTimeout((function(){t.page=t.page+1,e.request({url:t.$Url+"/clmsj/order/userOrderList",data:{page:t.page,state:r},header:{auth:e.getStorageSync("session_key")},method:"POST",success:function(n){if(e.hideLoading(),0==n.data.code){var a=n.data.data;a.forEach((function(e){e=Object.assign(e,t.orderStateExp(e.state))})),t.orderList=t.orderList.concat(a),console.log(t.orderList)}}}),t.$set(o,"loaded",!0),o.loadingType="more"}),600)},changeTab:function(e){this.tabCurrentIndex=e.target.current,this.loadData("refresh")},tabClick:function(e){this.tabCurrentIndex=e},viewExpress:function(t){console.log("viewExpress"),e.navigateToMiniProgram({appId:"wx6885acbedba59c14",path:"pages/result/result?nu="+t.express_number+"&com=&querysource=third_xcx",success:function(e){}})},orderDetail:function(t){console.log("order detail"),e.navigateTo({url:"/pages/order/detail?id="+t.id})},deleteOrder:function(e){var t=this;setTimeout((function(){t.orderList.splice(e,1)}),600)},payment:function(t){var n=this;e.request({url:this.$Url+"/clmsj/order/getPayParam",data:{order_sn:t},header:{auth:e.getStorageSync("session_key")},success:function(t){var a=t.data.data;e.requestPayment({provider:"wxpay",timeStamp:a.timeStamp,nonceStr:a.nonceStr,package:a.package,signType:"MD5",paySign:a.paySign,success:function(t){e.showToast({title:"支付成功"}),e.redirectTo({url:"/pages/money/paySuccess?order_sn="+n.order_sn})},fail:function(t){console.log("fail:"+JSON.stringify(t)),e.showToast({icon:"none",title:"支付失败"})}})}})},handleOrder:function(t,n,a){var o=this,r="您确认要进行该操作吗？";9==a?r="您确认要取消订单吗？":4==a&&(r="请确认您已收到货"),e.showModal({title:"提示",content:r,success:function(r){if(r.confirm){e.showLoading({title:"请稍后"});var i=o.orderStateExp(a),s=i.stateTip,c=i.stateTipColor;t=Object.assign(t,{state:a,stateTip:s,stateTipColor:c}),e.request({url:o.$Url+"/clmsj/order/userUpdateOrderStatus",data:{id:t.id,state:a},header:{auth:e.getStorageSync("session_key")},method:"POST",success:function(t){e.hideLoading(),0==t.data.code&&(o.orderList[n].state=a,o.$api.msg("操作成功"))}}),e.hideLoading()}}})},orderStateExp:function(e){var t="",n="#fa436a";switch(+e){case 1:t="待付款";break;case 2:t="待发货";break;case 3:t="已发货，待收货";break;case 4:t="已收货";break;case 9:t="订单已关闭",n="#909399";break}return{stateTip:t,stateTipColor:n}}}};t.default=i}).call(this,n("543d")["default"])},a2ea:function(e,t,n){"use strict";(function(e){n("36ef");a(n("66fd"));var t=a(n("1fb1"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},c71e:function(e,t,n){}},[["a2ea","common/runtime","common/vendor"]]]);