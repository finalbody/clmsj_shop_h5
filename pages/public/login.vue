<template>
	<view class="container">
		<!-- <view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view> -->
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="wechatapp">
			    <view class="header">
			      <open-data class="" type="userAvatarUrl"></open-data>
			    </view>
			</view>
			<view class="auth-title">申请获取以下权限</view>
			<view class="auth-subtitle">获得你的公开信息（昵称、头像等）</view>
			<view class="login-btn">
				<button class="btn-normal" openType="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo" withCredentials="true">授权登录</button>
			</view>
			<view class="no-login-btn">
				<button class="btn-normal" @tap="onNavigateBack(2)">暂不登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				mobile: '',
				password: '',
				logining: false,
			}
		},
		onLoad(){
			
		},
		methods: {
			getUserInfo(res) {
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}
			    let _this = this;
				
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						uni.getUserInfo({
							provider: 'weixin',  
							withCredentials:true,  
							success: function (infoRes) {  
								uni.request({
									url: _this.$Url + '/clmsj/login/index', // http://bull.hnw.net/index/bull/client_wash_info
									data: {
										encrypt_data:encodeURIComponent(infoRes.encryptedData),
										iv:encodeURIComponent(infoRes.iv),
										code:loginRes.code,
										type:2,  //type   1专业版  2零售版
									},
									method:'POST',
									success: (res) => {
										if (res.data.code == 0) {
											uni.setStorageSync("session_key",res.data.auth);
											uni.setStorageSync("userInfo",res.data.data.user);
											uni.navigateBack();  
										}else{
											uni.showToast({
												icon:'none',
												title:'请重新获取信息...'
											});
										}
									},
								})
							},  
							fail:function(infoRes){  
								console.log('infoRes='+JSON.stringify(infoRes))  
							}  
						});
					}
				});
				  
				
				
				
				
				
			    // App.getUserInfo(e, () => {
			    //   // 跳转回原页面
			    //   _this.onNavigateBack(1);
			    // });
			},
			onNavigateBack(delta) {
			    uni.navigateBack({
			      delta: Number(delta || 1)
			    });
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack({
					delta: Number(2)
				});
			},
			toRegist(){
				this.$api.msg('去注册');
			},
			async toLogin(){
				this.logining = true;
				const {mobile, password} = this;
				/* 数据验证模块
				if(!this.$api.match({
					mobile,
					password
				})){
					this.logining = false;
					return;
				}
				*/
				const sendData = {
					mobile,
					password
				};
				const result = await this.$api.json('userInfo');
				if(result.status === 1){
					this.login(result.data);
                    uni.navigateBack();  
				}else{
					this.$api.msg(result.msg);
					this.logining = false;
				}
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
		margin: 0px 20px;
	}
	.wechatapp {
	  padding: 80upx 0 48upx;
	  border-bottom: 1upx solid #e3e3e3;
	  margin-bottom: 72upx;
	  text-align: center;
	}
	
	.wechatapp .header {
	  width: 190upx;
	  height: 190upx;
	  border: 2px solid #fff;
	  margin: 0upx auto 0;
	  border-radius: 50%;
	  overflow: hidden;
	  box-shadow: 1px 0px 5px rgba(50, 50, 50, 0.3);
	}
	
	.auth-title {
	  color: #585858;
	  font-size: 34upx;
	  margin-bottom: 40upx;
	}
	
	.auth-subtitle {
	  color: #888;
	  margin-bottom: 88upx;
	  font-size: 28upx;
	}
	
	.login-btn {
	  padding: 0 20upx;
	}
	
	.login-btn button {
	  height: 88upx;
	  line-height: 88upx;
	  background: #04be01;
	  color: #fff;
	  font-size: 30upx;
	  border-radius: 999upx;
	  text-align: center;
	}
	
	.no-login-btn {
	  margin-top: 20upx;
	  padding: 0 20upx;
	}
	
	.no-login-btn button {
	  height: 88upx;
	  line-height: 88upx;
	  background: #dfdfdf;
	  color: #fff;
	  font-size: 30upx;
	  border-radius: 999upx;
	  text-align: center;
	}

</style>
