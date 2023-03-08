<template>
	<view class="my-info">
		<view class="top-box">	
			<image :src="userinfo.avatarUrl" mode="" class="avatar"></image>
			<view class="nick-name">{{userinfo.nickName}}</view>
		</view>
		<view class="panel-list">
			<view class="panel">
				<view class="panel-item">
					<view class="panel-body">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-body">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-body">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-body">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="panel-title">我的订单</view>
				<view class="panel-item">
					<view class="panel-body">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待收款</text>
					</view>
					<view class="panel-body">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-body">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退货/退款</text>
					</view>
					<view class="panel-body">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name:"my-userInfo",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['userinfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateAddress', 'updateUserInfo', 'updateToken']),
			async logout() {
				const res = await uni.showModal({
					title: '提示',
					content: "确认退出吗？"
				}).catch(err => err);
				console.log(res, 'res')
				if(res  && res.confirm) {
					this.updateAddress({});
					this.updateUserInfo({});
					this.updateToken('');
				}
			}
		}
	}
</script>

<style lang="scss">
.my-info {
	height: 100%;
	background-color: #f4f4f4;
	.top-box{
		height: 400rpx;
		background-color: #c00000;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		.avatar {
			width: 90px;
			height: 90px;
			border-radius: 50%;
			border: 2px solid #fff;
			box-shadow: 0 1px 5px  black;
		}
		.nick-name {
			font-size: 16px;
			color: white;
			margin-top: 10px;
		}
	}	
	.panel-list {
		.panel {
			background: #ffffff;
			border-radius: 3px;
			width: 92%;
			padding: 2px 5px;
			margin: -10px auto;
			margin-bottom: 20px;
			padding: 3px;
			.panel-title {
				line-height: 45px;
				padding-left: 10px;
				font-size: 15px;
			}
			.panel-item {
				display: flex;
				justify-content: space-around;
				line-height: 20px;
				.panel-body {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 12px;
					.icon {
						width: 35px;
						height: 35px;
					}
				}
			}
			.panel-list-item {
				display: flex;
				justify-content: space-between;
				font-size: 15px;
				padding: 0px 15px;
				line-height: 45px;
			}
		}
	}
}	
</style>