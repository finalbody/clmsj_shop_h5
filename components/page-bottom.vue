<template>
	<view class="content">
		<!-- 底部操作菜单 -->
		<view class="tabBar">
			<navigator v-if="type=='tabBar'" url="/pages/index/index" open-type="reLaunch" class="p-b-btn">
				<text class="yticon icon-shouye"></text>
				<text>首页</text>
			</navigator>
			<navigator v-if="type=='shopBar'" :url="'/pages/shop/index?sid='+ shopId" open-type="reLaunch" class="p-b-btn">
				<text class="yticon icon-shouye"></text>
				<text>店铺首页</text>
			</navigator>
			<!-- <navigator url="/pages/shop/live" open-type="redirect" class="p-b-btn">
				<text class="yticon icon-zhibo"></text>
				<text>直播</text>
			</navigator> -->
			<navigator url="/pages/user/user" open-type="reLaunch" class="p-b-btn">
				<text class="yticon icon-gerenzhongxin"></text>
				<text>个人中心</text>
			</navigator>
		</view>
	</view>
</template>
 
<script>
	
	export default {
		data() {
			return {
			}
		},
		props: {
			type: {
				type: String,
				default: 'tabBar'
			},
			shopId: {
				type: Number,
				default: 0
			},
		},
		methods: {
			
			eventClick(){
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>
/* 底部操作菜单 */
.tabBar{
	position:fixed;
	left: 0px;
	right: 0px;
	bottom:0px;
	z-index: 95;
	display: flex;
	justify-content: space-between;
	// align-items: spac;
	width: 100%;
	height: 100upx;
	background: rgba(255,255,255,1);
	box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
	border-radius: 0px;
	
	.p-b-btn{
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $font-sm;
		color: $font-color-base;
		width: 50%;
		height: 80upx;
		margin-top: 5px;
		.yticon{
			font-size: 50upx;
			line-height: 50upx;
			color: $font-color-light;
		}
		&.active, &.active .yticon{
			color: $uni-color-primary;
		}
		.icon-fenxiang2{
			font-size: 42upx;
			transform: translateY(-2upx);
		}
		.icon-shoucang{
			font-size: 46upx;
		}
	}
	.action-btn-group{
		display: flex;
		height: 76upx;
		border-radius: 100px;
		overflow: hidden;
		box-shadow: 0 20upx 40upx -16upx #fa436a;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
		margin-left: 20upx;
		position:relative;
		&:after{
			content: '';
			position:absolute;
			top: 50%;
			right: 50%;
			transform: translateY(-50%);
			height: 28upx;
			width: 0;
			border-right: 1px solid rgba(255,255,255,.5);
		}
		.action-btn{
			display:flex;
			align-items: center;
			justify-content: center;
			width: 180upx;
			height: 100%;
			font-size: $font-base ;
			padding: 0;
			border-radius: 0;
			background: transparent;
		}
	}
}
</style>
