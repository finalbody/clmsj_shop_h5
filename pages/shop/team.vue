<template>
	<view class="container">
		<view class="mp-search-box">
			<input class="ser-input" type="text" placeholder="请输入供货商团队ID搜索" v-model="searchVal" placeholder-class="placeholder" @blur="searchTeam" />
		</view>
		
		<view class="list" v-if="searchTeamList">
			<block v-for="(item, index) in searchTeamList" :key="index">
				<view class="item">
					<view class="logo">
						<image :src="item.logo || '/static/missing-face.png'" mode="aspectFill"></image>
					</view>
					<view class="detail">
						<view class="title">{{item.name}}</view>
						<view class="id">ID:{{item.id}}</view>
						<!-- <view class="creator">创建人:{{item.name}}</view> -->
					</view>
					<view class="handle">
						<button type="warn" class="btn-join" @click="joinTeam(item)">申请加入</button>
					</view>
				</view>
			</block>
			 
		</view>
		
		<view class="list">
			<view class="tit-name">已经加入的供货商团队</view>
			<view v-if="joinTeamList.length == 0" class="not-data">暂未加入任何供货商，赶紧申请加入吧</view>
			<block v-for="(item, index) in joinTeamList" :key="index">
				<view class="item">
					<view class="logo">
						<image :src="item.logo || '/static/missing-face.png'" mode="widthFix"></image>
					</view>
					<view class="detail">
						<view class="title">{{item.name}}</view>
						<view class="id">ID:{{item.id}}</view>
						<!-- <view class="creator">创建人:{{item.name}}</view> -->
						<view v-if="item.state == 1" style="font-size: 12px; color: #606266;">
							{{item.time}}加入
						</view>
					</view>
					<view class="handle">
						<button v-if="item.state == 0" type="default" class="btn-join">认证中</button>
						<button v-if="item.state==1" class="btn-join" @click="quitTeam(item,index)">退出</button>
					</view>
				</view>
			</block>
			 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVal: '',
				searchTeamList:[],
				joinTeamList:[],
				page:0
			};
		},
		onLoad(){
			this.userInfo = uni.getStorageSync('userInfo');
			this.loadData();
		},
		//下拉刷新
		onPullDownRefresh() {
		    this.loadData("refresh");
		},
		//加载更多
		onReachBottom() {
		    this.loadData('more');
		},
		methods:{
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type = "add", loading) {
				//没有更多直接返回
				if (type === "add") {
				    if (this.loadingType === "nomore") {
				        return;
				    }
				    this.loadingType = "loading";
				} else {
				    this.loadingType = "more";
				}
				if (type === "refresh") {
					this.joinTeamList=[];
				    this.page = 1;
				}
			    uni.request({
			        url: this.$Url + "/clmsj/Team/supplierList ",
			        header: {  auth: uni.getStorageSync("session_key")  },
			        data: {
			            page: this.page
			        },
			        method: "POST",
			        success: res => {			
			            if (res.data.code == 0) {
			                let teamList = res.data.data;
			                this.page++;
			                if (type == "refresh") {
			                    this.joinTeamList = teamList;
			                } else {
			                    this.joinTeamList = this.joinTeamList.concat(teamList);
			                }
			
			                this.loadingType = teamList.length < 10 ? "nomore" : "more";
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
			quitTeam(item,key){
				let _this = this;
				uni.showModal({
				    title: '提示',
				    content: '你确认要退出该批发团队吗？',
				    success: function (res) {
				        if (res.confirm) {
				            uni.request({
				            	url: _this.$Url + '/clmsj/team/outStock', // http://bull.hnw.net/index/bull/client_wash_info
				            	data: { id:item.id },
				            	header:{ 'auth' : uni.getStorageSync('session_key') },
				            	method:'POST',
				            	success: (res) => {
				            		if (res.data.code == 0) {
				            			_this.$api.msg('退出成功');							
										_this.loadData();
				            		}else{
				            			_this.$api.msg(`退出失败！` + res.data.msg);
				            		}
				            	},
				            })
				        }
				    }
				});
				
			},
			searchTeam(e){
				let _this = this;
				uni.request({
					url: _this.$Url + '/clmsj/Team/searchTeam', // http://bull.hnw.net/index/bull/client_wash_info
					data: { 'id' : _this.searchVal},
					header:{
						'auth' : uni.getStorageSync('session_key')
					},
					method:'POST',
					success: (res) => {
						if (res.data.code == 0) {
							_this.searchTeamList = res.data.data.team;
						}
					},
				})
			},
			joinTeam(item){
				let _this = this;
				uni.request({
					url: _this.$Url + '/clmsj/Team/applyStock', // http://bull.hnw.net/index/bull/client_wash_info
					data: { 'team_id' : item.id},
					header:{
						'auth' : uni.getStorageSync('session_key')
					},
					method:'POST',
					success: (res) => {
						if (res.data.code == 0) {
							_this.$api.msg('申请成功，请等待团队主认证');
							// this.loadData();
							uni.navigateBack();
							console.log(res)
						}else{
							_this.$api.msg(res.data.msg);
							setTimeout(()=>{
								uni.navigateBack()
							},1500)
						}
					},
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
	.mp-search-box{
		width: 100%;
		padding: 10px 10px;
		.ser-input{
			flex:1;
			height: 66upx;
			line-height: 66upx;
			text-align: center;
			font-size: 28upx;
			color:$font-color-base;
			border-radius: 20px;
			background: #f2f2f2;
		}
		.placeholder{
			color: #888888;
			background-image: url(../../static/icon-search.png);
			background-repeat: no-repeat;
			text-indent: 40px;
			background-size: 30rpx;
			background-position: 30% center;
			background-origin: content;
		}
	}
	.list{
		margin-bottom: 10px;
		background: #FFFFFF;
		padding: 10px;
		.tit-name{
			text-align: center;line-height: 35px; border-bottom: 1px solid #EEEEEE;
			padding-bottom: 5px;
		}
		.not-data{
			text-align: center;font-size: 14px; margin: 30px 0px;
			color: #909399;
		}
		.item{
			display: flex;
			justify-content: flex-start;
			margin: 5px 0px;
			border-bottom: 1px solid #EBEEF5;
			padding: 5px 0px;
			.logo{
				width: 70px;
				text-align: center;
				image{
					width: 50px;
					height: 50px;
				}
			}
			.detail{
				width: calc(75% - 70px); 
				font-size: 14px;
				line-height: 22px;
				.title{
					font-size: 15px;
				}
				.id{
					color: #555555;
				}
				.creator{
					color: #555555;
				}
			}
			.handle{
				width: 25%;
				.btn-join{
					height:30px;line-height: 30px; font-size: 14px;margin-top: 10px;
				}
			}
		}
	}
	
</style>
