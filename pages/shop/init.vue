<template>
	<view class="container">
		<view v-if="!shopInfo.id" class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit"><text class="red">*</text>开店邀请码</text>
			<view class="cell-more">
				<input class="input" type="text" v-model="shopInfo.leader_code" placeholder="开店邀请码,请联系上级获取" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit"><text class="red">*</text>店铺名称</text>
			<view class="cell-more">
				<input class="input" type="text" v-model="shopInfo.name" placeholder="设置后可修改" placeholder-class="placeholder" />
			</view>
		</view>
		
		<view class="list-cell-row b-b" hover-class="cell-hover" :hover-stay-time="50">
			<view class="cell-tit"><text class="red"></text>店铺简述</view>
			<view class="cell-more">
				<textarea class="textarea" placeholder="简要介绍一下您的店铺及特色" v-model="shopInfo.intro" placeholder-class="placeholder"></textarea>
			</view>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<view class="cell-tit">
				<view><text class="red"></text>店铺头像</view>
				<view class="tit-desc"></view>
			</view>
			<view class="cell-more" style="padding-top: 0px;">
				<view class="uni-uploader">
					<view class="uni-uploader-body" style="display: flex;justify-content: flex-end;">
						<view class="uni-uploader__files">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="shopInfo.logo" :data-src="shopInfo.logo" @tap="previewImage"></image>
							</view>
						</view>
						<view class="uni-uploader__input-box">
							<view class="uni-uploader__input" @tap="clchooseImage({key:'logo',count:1})"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<view class="cell-tit">
				<view><text class="red"></text>店铺封面</view>
				<view class="tit-desc"></view>
			</view>
			<view class="cell-more" style="padding-top: 0px;">
				<view class="uni-uploader">
					<view class="uni-uploader-body" style="display: flex;justify-content: flex-end;">
						<view class="uni-uploader__files">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="shopInfo.cover" :data-src="shopInfo.cover" @tap="previewImage"></image>
							</view>
						</view>
						<view class="uni-uploader__input-box">
							<view class="uni-uploader__input" @tap="clchooseImage({key:'cover',count:1})"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<view class="cell-tit">
				<view><text class="red"></text>个人二维码</view>
				<view class="tit-desc">便于顾客联系您</view>
			</view>
			<view class="cell-more" style="padding-top: 0px;">
				<view class="uni-uploader">
					<view class="uni-uploader-body" style="display: flex;justify-content: flex-end;">
						<view class="uni-uploader__files">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="shopInfo.qrcode" :data-src="shopInfo.qrcode" @tap="previewImage"></image>
							</view>
						</view>
						<view class="uni-uploader__input-box">
							<view class="uni-uploader__input" @tap="clchooseImage({key:'qrcode',count:1})"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="list-cell log-out-btn" @click="submit">
			<button type="warn" class="btn-block">保存修改</button>
		</view>
	</view>
</template>

<script>
	const qiniuUploader = require("../../common/qiniuUploader");
	var _this;
	export default {
		data() {
			return {
				shopApi:'/clmsj/Shop/addShop',
				shopInfo:{
					logo:'',
					cover:''
				},
			};
		},
		onShow() {
			
		},
		onLoad(){
			this.loadData();
		},
		methods:{
			loadData(){
				if(!uni.getStorageSync('session_key')){
					uni.navigateTo({
						url : '/pages/public/login'
					})  
					return;
				}
				let userInfo = uni.getStorageSync('userInfo');
				_this = this;
				uni.request({
					url: _this.$Url + '/clmsj/Shop/getShop',
					header:{
						'auth' : uni.getStorageSync('session_key')
					},
					method:'POST',
					success: (res) => {
						if (res.data.code == 0) {
							// res.data.data.shop = [];
							console.log('res.data.data.shop.length==' + !res.data.data.shop)
							if(res.data.data.shop.id){
								_this.shopInfo = res.data.data.shop;
								console.log('shop 有数据')
							}
						}
					},
				})
			},
			submit(){
				if(!_this.shopInfo.name){
					_this.$api.msg('请填写您的店铺名');
					return;
				}
				if(Number(_this.shopInfo.id) > 0){
					this.shopApi = '/clmsj/Shop/editShop';
				}else{
					if(!_this.shopInfo.leader_code){
						_this.$api.msg('请填写上级的开店邀请码');
						return;
					}
				}
				uni.showLoading({
				    title: '提交中...'
				});
				uni.request({
					url: _this.$Url + this.shopApi,
					data: _this.shopInfo,
					header:{
						'auth' : uni.getStorageSync('session_key')
					},
					method:'POST',
					success: (res) => {
						uni.hideLoading();
						if (res.data.code == 0) {
							if(Number(_this.shopInfo.id) > 0){
								_this.$api.msg('信息更新成功');
							}else{
								_this.$api.msg('店铺申请成功，您可以去选择商品进行铺货了');
							}
							setTimeout(()=>{
								uni.navigateTo({
									url: '/pages/user/user'
								})
							},1500)
							
						}else{
							_this.$api.msg(`更新失败! ` + res.data.msg);
							if (res.data.code == 1) {
								uni.navigateTo({
									url: '/pages/user/user'
								})
							}
						}
					},
				})
			},
			
			uploadImage: function(upQiniu,obj) {
				if(upQiniu.filePath == undefined){
					uni.showToast({
						icon: 'none',
						title: '请选择需要更新的图片'
					});
					return;
				}
				var myDate = new Date();
				let file_folder = "clmsj/" + myDate.getFullYear() + "/" + myDate.getMonth() + "-" + myDate.getDate() + "/";
				console.log(_this.shopInfo)
				console.log(_this.shopInfo)
				function queueUp(num){
					let tmp_ext_arr = upQiniu.filePath[num].split('.');
					let file_ext ="." + tmp_ext_arr[tmp_ext_arr.length - 1];
					
					let tmp_key = Math.random().toString(36).substr(3,8) + Date.now().toString(36);
					let file_key = file_folder + tmp_key + file_ext;
					qiniuUploader.upload(upQiniu.filePath[num], (res) => {
						_this.shopInfo[obj.key] = 'http://'+res.imageURL;	
						console.log("成功===" + _this.shopInfo[obj.key])
						console.log(_this.shopInfo)
						if(num < upQiniu.filePath.length-1){
							num++;
							queueUp(num);
						}
						_this.$forceUpdate();
					}, (error) => {
						console.log('error: ');
						console.log(error);
					}, {
						region: 'SCN', // ECN, SCN, NCN, NA, ASG，分别对应七牛的：华东，华南，华北，北美，新加坡 5 个区域
						domain: 'pic.clmsj.com', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
						key: file_key, // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
						// 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
						uptoken: upQiniu.token,
						shouldUseQiniuFileName: false
					});
				}
				queueUp(0);
				return false;
			},
			clchooseImage: function (obj) {
				console.log("clchooseImage");
				let upQiniu = {
					token: [],
					key: [],
					filePath: []
				};
				// 选择图片
				uni.chooseImage({
				    sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
				    sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
					count: obj.count,
					success: (res) => {
						upQiniu.filePath = upQiniu.filePath.concat(res.tempFilePaths);
						
						uni.request({
							url: _this.$Url + '/clmsj/goods/qiniu_token',//后端生成key和token的接口
							header:{
								'auth' : uni.getStorageSync('session_key')
							},
							success: (re) => {
								upQiniu.token = re.data.data;
								this.uploadImage(upQiniu,obj); 
							}
						});
					},
					fail: function(err) {
						console.log(err);
					}
				});
			},
			previewImage: function (e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: [current]
				})
			},
		}
	}
</script>

<style lang='scss'>
	@import "../../static/css/skin.css";
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 0upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			width: calc(70% - 10px);
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			vertical-align: top;
			width: calc(30% - 10upx);
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
			.tit-desc{
				font-size: 14px;color: #555555;line-height: 25px;
			}
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		.btn-block{
			width: 100%;
		}
		.input {
			width: 100%;
			height: 35px;
			line-height: 35px;
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			border: 0px solid #EEEEEE;
			padding: 2px 5px;
			border-radius: 5px;
			text-align: right;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
	
	.list-cell-row{
		/* display:flex; */
		/* align-items:baseline; */
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		/* justify-content: space-between; */
		flex-wrap: wrap;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 0upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			width: calc(100% - 10upx);
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			vertical-align: top;
			width: calc(100% - 10upx);
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
			.tit-desc{
				font-size: 14px;color: #555555;line-height: 25px;
			}
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		.btn-block{
			width: 100%;
		}
		.textarea {
			width: 100%;
			min-height: 135px;
			line-height: 25px;
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			border: 1px solid #EEEEEE;
			padding: 5px 5px;
			border-radius: 5px;
			text-align: left;
			margin-top: 10px;
		}
		.input {
			width: 100%;
			height: 35px;
			line-height: 35px;
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			border: 0px solid #EEEEEE;
			padding: 2px 5px;
			border-radius: 5px;
			text-align: right;
		}
	}
</style>
