<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-box">
					<text v-if="item.state" class="tag">默认</text>
					<text class="address"><!-- {{item.province}}{{item.city}} --> {{item.address}}{{item.home_number}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.name}}</text>
					<text class="mobile">{{item.phone}}</text>
				</view>
			</view>
			<text class="yticon icon-bianji2" @click.stop="addAddress('edit', item)"></text>
			<text class="yticon icon-shanchu" @click.stop="delAddress(item)"></text>
		</view>
		<view class="handle">
			<!-- <button type="warn" @tap="chooseAddress">获取微信地址</button> -->
			<button class="add-btn" @click="addAddress('add')">新增地址</button>
		</view>
		
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				source: 0,
				addressList: []
			}
		},
		onLoad(option){
			console.log(option.source);
			this.source = option.source;
			this.loadData();
		},
		methods: {
			async loadData(){
				let resList = await app.request(this.$Url + "/clmsj/Address/find_address_list", {});
				if (resList.data.code == 0) {
					this.addressList = resList.data.data.address_list;
				}
				if (resList.data.code == 2) {
					uni.showToast({
						icon:'none',
						title:'请完善您的收货信息'
					})
				}
			},
			chooseAddress(){
				let _this = this;
				uni.chooseAddress({
					success(res) {
						console.log(res.userName)
						console.log(res.postalCode)
						console.log(res.provinceName)
						console.log(res.cityName)
						console.log(res.countyName)
						console.log(res.detailInfo)
						console.log(res.nationalCode)
						console.log(res.telNumber)
						
						app.request(_this.$Url + "/clmsj/Address/add_address", {
							name : res.userName,
							phone : res.telNumber,
							province : res.provinceName,
							city : res.cityName,
							area : res.countyName,
							address : res.provinceName + res.cityName + res.countyName + res.detailInfo
						}).then(resAdd=>{
							if (resAdd.data.code == 0) {
								uni.showToast({
									title:'获取成功'
								})
								_this.loadData();
							}
						});
						
						
					}
				})
			},
			delAddress(item){
				let _this = this;
				uni.showModal({
				    title: '提示',
				    content: '您确认要删除吗？',
				    success: function (res) {
						console.log(res)
						if(res.confirm){
							app.request(_this.$Url + "/clmsj/Address/del_address", {
								id : item.id
							}).then(resAdd=>{
								if (resAdd.data.code == 0) {
									uni.showToast({
										title:'删除成功'
									})
									_this.loadData();
								}
							});
						}
					}
				})
				
			},
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);
				
				console.log(data, type);
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
		.yticon{
			font-size: 32px;
			color: #606266;
			margin: 0px 5px;
		}
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: #333333;
		padding-left: 30upx;
	}
	.handle{
		padding: 20px 10px;
		
		.add-btn{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 10px;
			color: #fff;
			background-color: $base-color;
			border-radius: 10upx;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
		}
	}
	
</style>
