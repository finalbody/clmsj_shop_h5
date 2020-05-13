<template>  
    <view class="container">  
		
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box">
				<block v-if="userInfo.id">
					<view class="portrait-box">
						<image class="portrait" :src="userInfo.avatarUrl || '/static/missing-face.png'"></image>
					</view>
					<view class="info-box">
						<view class="username">{{userInfo.nickName || userInfo.mobile}}</view>
						<view v-if="userInfo.role == 1">
							<view class="invite_code" @tap="copy(storeInfo.invite_code)">
								邀请码：{{storeInfo.invite_code}} <text class="btn-copy">复制</text>
							</view>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="portrait-box" @tap="navTo('/pages/public/login')">
						<image class="portrait" :src="userInfo.avatarUrl || '/static/missing-face.png'"></image>
					</view>
					<view class="info-box" @tap="navTo('/pages/public/login')">
						<text class="username">未登录</text>
					</view>
				</block>
				
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
				<!-- <view v-if="userInfo.role == 0" @tap="navTo('/pages/shop/init')" class="b-btn">申请开店</view> -->
				<!-- <view v-if="userInfo.role == 1" @tap="navTo('/pages/index/index')" class="b-btn">查看商城</view> -->
				<view @tap="navTo('/pages/index/index')" class="b-btn">查看商城</view>
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					<text v-if="userInfo.role == 0">普通会员</text>
					<text v-else-if="userInfo.role == 1">
						高级店长
					</text>
					<text v-else>游客</text>
				</view>
				<text class="e-m">潮流买手街</text>
				<text class="e-b">开通会员，让您生意无忧</text>
			</view>
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/arc.png"></image>
			
			<view class="tj-sction" v-if="1==2">
				<view class="tj-item">
					<text class="num">128.8</text>
					<text>余额</text>
				</view>
				<view class="tj-item">
					<text class="num">0</text>
					<text>优惠券</text>
				</view>
				<view class="tj-item">
					<text class="num">20</text>
					<text>积分</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-quanbudingdan"></text>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-daifukuan"></text>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-yishouhuo"></text>
					<text>待收货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=5')" hover-class="common-hover"  :hover-stay-time="50">
					<text class="yticon icon-shouhoutuikuan"></text>
					<text>已完成</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<!-- <view class="sec-header">
					<text class="yticon icon-lishijilu"></text>
					<text>浏览历史</text>
				</view>
				<scroll-view scroll-x class="h-list">
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105231218&di=09534b9833b5243296630e6d5b728eff&imgtype=0&src=http%3A%2F%2Fimg002.hc360.cn%2Fm1%2FM05%2FD1%2FAC%2FwKhQcFQ3iN2EQTo8AAAAAHQU6_8355.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105320890&di=c743386be51f2c4c0fd4b75754d14f3c&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fhb%2FMTQ1OTg4ODY0MDA3Ny05OTQ4ODY1NDQ%3D.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2691146630,2165926318&fm=26&gp=0.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105443324&di=8141bf13f3f208c61524d67f9bb83942&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ac9a5548d29b0000019ae98e6d98.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191678693,2701202375&fm=26&gp=0.jpg" mode="aspectFill"></image>
				</scroll-view> -->
				
				<list-cell v-if="userInfo.role != 1 &&  1==2" icon="icon-kaidian" iconColor="#e07472" title="申请开店" @tap="navTo('/pages/shop/init')"></list-cell>

				<list-cell icon="icon-qianbao" iconColor="#e07472" title="我的钱包" @eventClick="navTo('/pages/user/center')"></list-cell>
				<list-cell icon="icon-dizhi2" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
				<!-- <list-cell icon="icon-share" iconColor="#9789f7" title="分享" tips="邀请好友赢10万大礼"></list-cell>
				<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="晒单" tips="晒单抢红包"></list-cell> -->
				<list-cell v-if="1==2" icon="icon-shoucang2" iconColor="#54b4ef" @tap="navTo('/pages/index/index')" title="浏览过的店铺"></list-cell>
			</view>
			
			<view v-if="userInfo.role == 1 && 1==2" class="shop-section icon">
				<view class="tit-name">店长专区</view>
				<view class="tj-sction" style="border-bottom: 1px solid #EEEEEE; margin: 0px 10px;">
					<view class="tj-item">
						<text class="num">{{storeReport.goodsNum || 0}}</text>
						<text>店铺商品数</text>
					</view>
					<view class="tj-item">
						<text class="num">{{storeReport.sellNum || 0}}</text>
						<text>销量(件)</text>
					</view>
					<!-- <view class="tj-item">
						<text class="num"><text class="qfh">￥</text>{{storeReport.orderSellMoney || 0}}</text>
						<text>销售额</text>
					</view> -->
					<view class="tj-item">
						<text class="num"><text class="qfh">￥</text>{{storeReport.orderSellProfit || 0}}</text>
						<text>销售利润</text>
					</view>
				</view>
				<view class="store-cell">
					<view class="item" @tap="navTo('/pages/shop/index?sid='+ storeInfo.id)">
						<text class="yticon icon-dianpu1"></text>
						<text>我的店铺</text>
					</view>
					<view class="item" @tap="navTo('/pages/shop/team')">
						<text class="yticon icon-jiarugonghuoshang"></text>
						<text>加入供货商团队</text>
					</view>
					<view class="item" @tap="navTo('/pages/product/list')">
						<text class="yticon icon-xinshangpin"></text>
						<text>挑选商品</text>
					</view>
					<view class="item" @tap="navTo('/pages/shop/init')">
						<text class="yticon icon-shezhi"></text>
						<text>完善店铺资料</text>
					</view>
					<view class="item" @tap="navTo('/pages/shop/order')">
						<text class="yticon icon-dianpudingdan"></text>
						<text>店铺销售订单</text>
					</view>
				<!-- 	<view class="item" @tap="navTo('/pages/shop/order')">
						<text class="yticon icon-dianpudingdan"></text>
						<text>营业统计</text>
					</view> -->
					<!-- <list-cell icon="icon-dianpu" iconColor="#54b4ef" @tap="navTo('/pages/shop/index')" title="我的店铺"></list-cell>
					<list-cell icon="icon-xinshangpin" iconColor="#54b4ef" @tap="navTo('/pages/product/list')" title="挑选商品"></list-cell>
					
					<list-cell icon="icon-shezhi1" iconColor="#e07472" title="完善店铺资料" border="" @tap="navTo('/pages/shop/init')"></list-cell> -->
				</view>
			</view>
			
		</view>
		<view class="tips" v-if="1==2">
			<view class="mask-bg"></view>	
			<view class="mask-box">
				<view style="text-align: center;line-height: 40px;margin-bottom: 15px;">请完善您的身份信息</view>
				<view class="login-btn">
					<button class="dlbutton" @tap="navTo('/pages/user/user')"><text>立即完善</text></button>
				</view>
			</view>
		</view>
		
		<view class="tips" v-if="userInfo.id && userInfo.mobile=='' && 1==2">
			<view class="mask-bg"></view>	
			<view class="mask-box">
				<view style="text-align: left;line-height: 30px;">需要获取您的手机号才能正常预约使用</view>
				<view class="login-btn">
					<button class="dlbutton" type="warn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"><text>授权使用</text></button>
				</view>
			</view>
		</view>
		<uni-login ref="uniLogin"  type="login" v-on:pLoadData="loadData" :showLogin="showLogin" :onlyLogin="0"></uni-login>
		<page-bottom type="tabBar" :shopId="storeInfo.id"></page-bottom>
    </view>  
</template>  
<script>
	import uniLogin from '@/components/uni-login';
	import pageBottom from '@/components/page-bottom';
	import listCell from '@/components/mix-list-cell';
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			uniLogin,pageBottom,listCell,
		},
		data(){
			return {
				roomId:0,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userInfo:{},
				subscribe: "plugin-private://wx2b03c6e691cd7370/components/subscribe/subscribe",
				storeReport:{},
				storeInfo:{
					id:0
				},
				showLogin:0,
			}
		},
		onShow(){
			const session_key = uni.getStorageSync('session_key')
			if(!session_key){
				this.showLogin = 1
			}else{
				this.showLogin = 0
			}

			// this.livePlayer();
			this.loadData();
        	console.log(session_key)
		},
		onLoad(){
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/user/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
        methods: {
			loadData:function(){
				let _this = this;
				setTimeout(()=>{
					uni.request({
						url: _this.$Url + '/clmsj/user/getUser', 
						header:{
							'auth' : uni.getStorageSync('session_key')
						},
						method:'POST',
						success: (res) => {
							if(res.data.code == 2){
								uni.setStorageSync('session_key', null)
								uni.$emit('login_show')
								return
							}

							if (res.data.code == 0) {
								_this.userInfo = res.data.data.user;
								_this.storeInfo = res.data.data.shop;
								uni.setStorageSync("userInfo",_this.userInfo);
								
								if(_this.userInfo.role == 1){
									uni.request({
										url: _this.$Url + '/clmsj/user/shopSellStatistics', 
										header:{ 'auth' : uni.getStorageSync('session_key') },
										method:'POST',
										success: (res) => {
											if (res.data.code == 0) {
												_this.storeReport = res.data.data;
											}
										},
									})
								}
							}else{
								// uni.navigateTo({
								// 	url : '/pages/public/login'
								// })  
								// return;
							}
						},
					})

				},500);
			},
			getPhoneNumber: function(e) {
				console.log("getPhoneNumber")
				console.log(e)
				let _this = this;
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					
				} else {
					// that.miniRegisterOrLogin(e.detail.encryptedData,e.detail.iv);
					uni.request({
						url: _this.$Url + '/clmsj/home/getPhoneNumber',
						data: {
							encrypt_data:encodeURIComponent(e.detail.encryptedData),
							iv:e.detail.iv
						},
						header:{
							'auth' : uni.getStorageSync('session_key')
						},
						method:'POST',
						success: (res) => {
							console.log(res)
							if (res.data.code == 0) {
								_this.userInfo.mobile = res.data.mobile;
								_this.$store.commit('login', _this.userInfo);
							}else{
								uni.showToast({
									icon:'none',
									title:'手机号获取失败'
								});
							}
						},
					})
				}
			},
			copy(content){
				uni.setClipboardData({
					data:content,
					success() {
						uni.showToast({
							icon:'none',
							title:'邀请码复制成功'
						});
					}
				})
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url,type){
				console.log(url)
				if(!uni.getStorageSync('session_key') || !this.userInfo.id){
					// uni.navigateTo({
					// 	url : '/pages/public/login'
					// })  
					this.showLogin = 1;
					this.$refs.uniLogin.toggleMask('loadData');
					return;
				}
				if(type == 'switchTab'){
					uni.switchTab({
						url
					})
				}else{
					uni.navigateTo({  
						url
					})  
				}
			}, 
	
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
        }  
    }  
</script>  
<style lang='scss'>
	@import "../../static/css/skin.css";
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 520upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
		.invite_code{
			font-size: $font-lg + 0upx;
			color: $font-color-dark;
			margin-left: 20upx;
			.btn-copy{
				background: #F76260;
				/* line-height: 22px; */
				padding: 2px 8px;
				margin-left: 3px;
				border-radius: 5px;
				color: #FFFFFF;
				font-size: 12px;
			}
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 24upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				fonts-size:22px;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: 18px;
			color: $font-color-dark;
			margin-bottom: 8upx;
			.qfh{
				font-size: 12px;
			}
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 32px;
			margin-bottom: 18upx;
			color: #fa436a;
		}
	}
	
	.shop-section{
		padding: 20upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.tit-name{
			padding-left: 15px; font-weight: bold;font-size: 15px;
		}
		.store-cell{
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			padding: 8px 0;
			margin-top: 0upx;
			border-top: 0px solid #EEEEEE;
			.item{
				@extend %flex-center;
				width: 33.3%;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: $font-color-dark;
				margin-bottom: 8px;
			}
			.yticon{
				font-size: 24px;
				margin-bottom: 8upx;
				color: #fa436a;
			}
			.icon-dianpudingdan{
				font-size: 24px;
			}
			.icon-jiarugonghuoshang{
				font-size: 24px;
			}
		}
	}
	
	.history-section{
		padding: 10upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	
</style>