<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址选择</text>
			<view @tap="chooseLocation" class="input">
				<text style="background: #FA436A;color: #FFFFFF;padding: 2px 4px;border-radius: 5px;">
					<text class="yticon icon-dizhi"></text>
					{{addressName}}
				</text>
			</view>
			<!-- <text class="yticon icon-shouhuodizhi"></text> -->
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<input class="input" type="text" v-model="addressData.address" placeholder="可编辑" placeholder-class="placeholder" />
		</view>
		<view class="row b-b"> 
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.home_number" placeholder="小区名、楼层号、门牌" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.state" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				addressName: '在地图选择',
				addressData: {}
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.state = e.detail.value;
			},
			
			//地图选择地址
			chooseLocation(){
				console.log('chooseLocation')
				let _this = this;
				uni.chooseLocation({
					success: (data)=> {
						console.log(data);
						// this.addressData.addressName = data.name;
						_this.addressData.address = data.address;
						
						console.log("_this.addressData");
						console.log(_this.addressData);
						_this.$forceUpdate();
					}
				})
				
				
			},
			
			//提交
			confirm(){
				let _this = this;
				let data = _this.addressData;
				if(!data.name){
					_this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phone)){
					_this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.address){
					_this.$api.msg('请在地图选择所在位置');
					return;
				}
				if(!data.home_number){
					_this.$api.msg('请填写门牌号信息');
					return;
				}
				console.log(data);
				if(_this.manageType=='edit'){
					app.request(_this.$Url + "/clmsj/Address/edit_address", data).then(res=>{
						if (res.data.code == 0) {
							uni.showToast({
								title:'修改成功'
							})
							//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
							this.$api.prePage().refreshList(data, this.manageType);
							setTimeout(()=>{
								uni.navigateBack()
							}, 800)
						}else{
							uni.showToast({
								title:'修改失败'
							})
						}
					});
				}else{
					app.request(_this.$Url + "/clmsj/Address/add_address", data).then(res=>{
						if (res.data.code == 0) {
							uni.showToast({
								title:'添加成功'
							})
							//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
							this.$api.prePage().refreshList(data, this.manageType);
							setTimeout(()=>{
								uni.navigateBack()
							}, 800)
						}else{
							uni.showToast({
								title:'添加失败'
							})
						}
					});
				}
				
				
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		.icon-dizhi{
			margin-right: 4px;
		}
		.tit{
			flex-shrink: 0;
			width: 160upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
