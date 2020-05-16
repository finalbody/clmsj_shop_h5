<template>
    <view class="content">
		<view class="background"></view>
		<view class="store-info" v-if="shop.id">
			<view class="title" style="line-height: 40px;text-align: center;">{{shop.name}}</view>
			<view>
				<view  style="text-align: center;padding: 50px 20px; font-size: 24px;">
					{{verifyMsg}}
				</view>
				<view style="margin-top: 20px;">
					<button class="add-btn" type="warn" @click="navTo('/pages/store/index')">返回控制台</button>
				</view>
			</view>
		</view>
		<view class="store-info">
			<view class="title" style="line-height: 40px;text-align: center;">请联系管理员获取绑定二维码</view>
		</view>
       
		<view style="height: 100px;"></view>
		<!-- 底部操作菜单 -->
		<page-bottom type="tabBar" :shopId="shop.id"></page-bottom>
		<uni-login type="login" :showLogin="showLogin" :onlyLogin='1'></uni-login>
		
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
			shop:{},
			code:0,
			verifyMsg:'',
			showLogin:0,
        };
    },

    async onLoad(options) {
		this.code = options.code;
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
		async loadData() {
			let _this = this;
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
			
			app.request(_this.$Url + "/clmsj/order/orderToVerification", {
				code: this.code
			}).then(res=>{
				if(res.data.code == 999){
					uni.showToast({
						icon:'none',
						title:'请重新登陆'
					});
					uni.setStorageSync('session_key',undefined);
					uni.setStorageSync('userInfo',undefined);
					_this.showLogin = 1;
					_this.$refs.uniLogin.toggleMask('loadData');
					return;
				}
				if (res.data.code == 0) {
					_this.verifyMsg = res.data.msg;
				}else{
					_this.verifyMsg = res.data.msg;
				}
			});
		},
		navTo(url,type){
			uni.navigateTo({  
				url
			})
		}, 
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
