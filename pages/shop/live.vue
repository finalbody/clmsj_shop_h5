<template>
	<view>
		<block v-for="(item, index) in roomList"  :key="index">
		<view class="notice-item" @tap="navToLive(item.room_id)">
			<text class="time">{{item.time}}</text>
			<view class="content">
				<text class="title">{{item.title}}</text>
				<view class="img-wrapper">
					<image class="pic" :src="item.cover_img" mode="aspectFill"></image>
					<view class="cover" v-if="item.live_status == 102">
						直播未开始
					</view>
					<view class="cover" v-if="item.live_status == 103">
						直播结束
					</view>
				</view>
				<view class="introduce">
					<view class="sntime">开播时间：<text>{{item.start_time}}</text></view>
					<view class="sntime">结束时间：<text>{{item.end_time}}</text></view>
					<view class="player">主播：{{item.nick_name}}</view>
				</view>
				<view class="bot b-t">
					<text v-if="item.live_status == 103">查看回放</text>
					<text v-else>查看直播</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view>
		</block>		
		<!-- 底部操作菜单 -->
		<page-bottom type="tabBar" :shopId="sid"></page-bottom>
	</view>
</template>

<script>
	let livePlayer = requirePlugin('live-player-plugin');
	import pageBottom from '@/components/page-bottom';
	export default {
		data() {
			return {
				page:0,
				sid:0,
				roomList:[]			
			}
		},
		onLoad(options){
			let room_id = options.room_id;
			if(room_id > 0){
				this.navToLive(room_id);
			}else{
				this.sid = uni.getStorageSync('sid');
				this.loadData();
			}
		},
		//下拉刷新
		onPullDownRefresh() {
		    this.loadData("refresh");
		},
		//加载更多
		onReachBottom() {
		    this.loadData('more');
		},
		methods: {
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type = "add", loading) {

			    uni.request({
			        url: this.$Url + "/clmsj/live/shopliveList ",
			        header: {  auth: uni.getStorageSync("session_key")  },
			        data: {
			            page: this.page,
						shop_id: this.sid || 1
			        },
			        method: "POST",
			        success: res => {			
			            if (res.data.code == 0) {
			                let roomList = res.data.data;
			                this.page++;
			                if (type == "refresh") {
			                    this.roomList = roomList;
			                } else {
			                    this.roomList = this.roomList.concat(roomList);
			                }
			
			                this.loadingType =
			                    roomList.length < 10 ? "nomore" : "more";
			                if (type === "refresh") {
			                    if (loading == 1) {
			                        uni.hideLoading();
			                    } else {
			                        uni.stopPullDownRefresh();
			                    }
			                }
			            }
			        }
			    });
			},
			navToLive(roomId){
				console.log('live room_id==' + roomId);
				livePlayer.getOpenid({ room_id: roomId }) // 该接口传入参数为房间号
					.then(res => {
						console.log('用户进入直播间 get openid', res.openid) // 用户openid
						
						wx.navigateTo({
							url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}`
						})
						// let customParams = encodeURIComponent(JSON.stringify({ path: 'pages/product/product', pid: 1 })) // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
						// let customParams = encodeURIComponent(JSON.stringify({ path: 'pages/product/product', pid: 1 })) // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
						// wx.navigateTo({
						// 	url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
						// })
						
						
					}).catch(err => {
						console.log('get openid', err)
					})
				// path = 'pages/product/product?goods_id=18&sid=1';
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}

	.content {
		width: 710upx;
		padding: 0 24upx;
		background-color: #fff;
		border-radius: 4upx;
	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		color: #303133;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 22px;
		.sntime{
			font-size: 14px;
			text{
				margin:0px 5px;
			}
		}
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 14px;
		color: #FA436A;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
</style>
