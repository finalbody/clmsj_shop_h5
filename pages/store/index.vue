<template>
    <view class="content">
		<view class="background"></view>
		<view class="store-info">
			<view class="title" style="line-height: 40px;text-align: center;">{{shop.name}}</view>
			<view class="verify" v-if="1==2">
				<!-- <view class="scans" @click="scans()">
					<text class="yticon icon-scan"></text>
				</view> -->
				<view class="codeBox">
					<input type="number" placeholder="请输入消费券密码"/>
					<button style="width: 80px;" type="warn" size="mini" @click="confirmVerify()">消费验证</button>
				</view>
			</view>
		</view>
		
        <view class="store-section">
            <view class="tit-name">
				<text class="yticon icon-xinshangpin"></text>核销记录
			</view>
            
			<view
				v-for="(item,index) in verifyList" :key="index"
				class="order-item"
			>
				<view class="i-top b-b">
					<text class="time">核销码：{{item.verification_code}}</text>
				</view>
				<view class="goods-box-single">
					<image class="goods-img" :src="item.goods.original_img" mode="aspectFill"></image>
					<view class="right">
						<view class="title clamp">{{item.goods.goods_remark}}</view>
						<text class="attr-box">
							<text v-if="item.spec_color" style="margin-right: 8px;">{{item.spec_color}} </text>
							<text v-if="item.spec_size" style="margin-right: 8px;">{{item.spec_size}} </text>
						</text>
						<!-- <text class="price">{{item.goods_price}}</text> -->
						<view class="price-box">结算金额
						<text class="price">{{item.total_money}}</text>
						</view>
					</view>
				</view>
				
				<!-- <view class="price-box">
					结算金额
					<text class="price">{{item.total_money}}</text>
				</view> -->
				<view class="i-top b-t">
					<!-- <text class="time">核销码:232352353</text> -->
					<text class="time">核销时间：{{item.create_time}}</text>
					<text class="state">核销人：张三</text>
				</view>
				<!-- <view class="action-box b-t">
					
				</view> -->
			</view>
        </view>
        <uni-load-more :status="loadingType"></uni-load-more>
		
		<view style="height: 100px;"></view>
		<!-- 底部操作菜单 -->
		<page-bottom type="tabBar" :shopId="shop.id"></page-bottom>
		<uni-login type="login" :showLogin="showLogin" :onlyLogin='0'></uni-login>
		<view class="contact-box">
			<button class="btn-contact" open-type="contact" :send-message-title="shop.name" :send-message-img="shop.cover || '/static/shop-bg-none.png'" :send-message-path="'/pages/shop/index?sid='+ shop.id" :session-from="'sid='+ shop.id" show-message-card="true">客服</button>
		</view>
		
    </view>
</template>

<script>
const app = getApp();
import pageBottom from '@/components/page-bottom';
import uniLogin from '@/components/uni-login';
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
    components: {
        uniLogin,pageBottom,uniLoadMore
    },
    data() {
        return {
            headerPosition: "fixed",
            headerTop: "0px",
            loadingType: "more", //加载更多状态
			shop:{},
			verifyList:[],
            page: 1,
			showLogin:0,
			store_id:0
        };
    },

    async onLoad(options) {
		this.store_id = options.store_id;
    },
    onShow() {
        this.loadData("refresh");
    },
    onPageScroll(e) {
        //兼容iOS端下拉时顶部漂移
        if (e.scrollTop >= 0) {
            this.headerPosition = "fixed";
        } else {
            this.headerPosition = "absolute";
        }
    },
    //下拉刷新
    onPullDownRefresh() {
        this.loadData("refresh");
    },
    //加载更多
    onReachBottom() {
        this.loadData();
    },
    methods: {
		//加载商品 ，带下拉刷新和上滑加载
		async loadData(type = "add", loading) {
			let _this = this;
		    //没有更多直接返回
		    if (type === "add") {
		        if (this.loadingType === "nomore") {
		            return;
		        }
		        this.loadingType = "loading";
		    } else {
		        this.loadingType = "more";
		    }
			
			app.request(_this.$Url + "/clmsj/order/getShopsExpense", {
				page: this.page,
			}).then(res=>{
				if (res.data.code == 0) {
					this.shop = res.data.data;
				}else{
					uni.showToast({
						icon:'none',
						title: res.data.msg
					});
				}
			});
			
		    if (type === "refresh") {
		        this.page = 1;
		    }
			app.request(_this.$Url + "/clmsj/order/userOrderList", {
				page: this.page,
			}).then(res=>{
				if (res.data.code == 0) {
					let verifyList = res.data.data;
					this.page++;
										
					if (type == "refresh") {
					    this.verifyList = verifyList;
					} else {
					    this.verifyList = this.verifyList.concat(verifyList);
					}
							
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType =  verifyList.length < 10 ? "nomore" : "more";
					if (type === "refresh") {
					    if (loading == 1) {
					        uni.hideLoading();
					    } else {
					        uni.stopPullDownRefresh();
					    }
					}
				}
			});
		},
		confirmVerify(){
			
		},
		scans(){
			
		}
    }
};
</script>
<style lang="scss">
page,
.content {
	.background {
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		height: 50px;
		background-color: #4399FC;
		z-index: -1;
	}
}


.store-info{
	position: relative;
	font-size: 14px;
	margin: 10px 15px;
	.title{
		font-size: 16px;
		color: #FFFFFF;
		padding: 5px 0px;
		// margin-top: 20px;
	}
	.verify{
		display: flex;
		justify-content: space-between;
		background: #F8F8F8;
		border-radius: 7px;
		height: 40px;
		line-height: 40px;
		padding: 5px 5px;
		.scans{
			width: 50px;
			margin-top: -3px;
			text-align: center;
			.yticon{
				font-size: 32px;
			}
		}
		.codeBox{
			width: calc(100% - 0px);
			display: flex;
			justify-content: space-between;
		}
		input{
			height: 60upx;
			line-height: 60upx;
			width: calc(100% - 180upx);
		}
		button{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			border-radius: 5px;			
			&:after{
				border: 0px solid #dddddd;
				border-color: #f7bcc8;
			}
		}
	}
	
}

.store-section{
	.tit-name{
		background: #FFFFFF;
		font-size: 15px;
		color: #333333;
		line-height: 50px;
		padding-left: 15px;
		border-bottom: 1px solid #EEEEEE;
		.yticon{
			vertical-align: middle;
			background: #FA436A;
			padding: 3px;
			border-radius: 50%;
			color: #ffffff;
			font-size: 12px;
			margin: 0px 3px;
			margin-top: -2px;
		}
	}
}
.contact-box{
	position: fixed;
	z-index: 999;
	right: 5px;
	bottom: 100px;
	width: 50px;
	button:after,.btn-contact{
		background: #F76260;
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 50%;
		color: #FFFFFF;
		font-size: 15px;
		width: 50px;
		height: 50px;
		line-height: 50px;
		padding: 0px;
		margin: 0px;
		border: none;
	}
	button:after{
		background: none;
		border: none;
		box-shadow:none
	}
}

.order-item{
	display: flex;
	flex-direction: column;
	padding-left: 30upx;
	background: #fff;
	// margin-top: 16upx;
	border-bottom: 8px solid #F5F5F5;
	.i-top{
		display: flex;
		align-items: center;
		height: 80upx;
		padding-right:30upx;
		font-size: $font-base;
		color: #555555;
		position: relative;
		.time{
			flex: 1;
		}
		.state{
			color: $base-color;
		}
		.del-btn{
			padding: 10upx 0 10upx 36upx;
			font-size: $font-lg;
			color: $font-color-light;
			position: relative;
			&:after{
				content: '';
				width: 0;
				height: 30upx;
				border-left: 1px solid $border-color-dark;
				position: absolute;
				left: 20upx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	/* 多条商品 */
	.goods-box{
		height: 160upx;
		padding: 20upx 0;
		white-space: nowrap;
		.goods-item{
			width: 120upx;
			height: 120upx;
			display: inline-block;
			margin-right: 24upx;
		}
		.goods-img{
			display: block;
			width: 100%;
			height: 100%;
			border-radius: 5px;
		}
	}
	/* 单条商品 */
	.goods-box-single{
		display: flex;
		padding: 20upx 0;
		.goods-img{
			display: block;
			width: 120upx;
			height: 120upx;
			border-radius: 5px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 30upx 0 24upx;
			overflow: hidden;
			.title{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				line-height: 1;
			}
			.attr-box{
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				padding: 10upx 12upx;
			}
			.price{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	}
	
	.price-box{
		// display: flex;
		// justify-content: flex-end;
		// align-items: baseline;
		// padding: 20upx 30upx;
		font-size: $font-sm + 2upx;
		color: $font-color-light;
		.num{
			margin: 0 8upx;
			color: $font-color-dark;
		}
		.price{
			font-size: $font-lg;
			color: $font-color-dark;
			&:before{
				content: '￥';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
			}
		}
	}
	.action-box{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100upx;
		position: relative;
		padding-right: 30upx;
	}
	.action-btn{
		width: 160upx;
		height: 60upx;
		margin: 0;
		margin-left: 24upx;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 5px;
		
		&:after{
			border: 1px solid #dddddd;
			border-color: #f7bcc8;
		}
		&.recom{
			background: #fff9f9;
			color: $base-color;
			&:after{
				border-color: #f7bcc8;
			}
		}
		&.confirm{
			background: #FA436A;
			color: #FFFFFF;
			&:after{
				border-color: #FA436A;
			}
		}
	}
}

</style>
