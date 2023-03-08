<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="login-button" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<view class="tip-text">
			登录后可享受更多权益
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters,  mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user',['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			// 获取用户授权信息
			getUserInfo(e) {
				 if(e.detail.errMsg === 'getUserInfo: fail auth deny') {
					 return uni.$showMessage('您取消了登陆！')
				 }
				 this.updateUserInfo(e.detail.userInfo);
				 this.getToken(e.detail)
			},
			async getToken(info) {
				const res = await uni.login().catch(err => err);
				if(res.errMsg !== "login:ok") return uni.$showMessage('登录失败！');
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature,
				}
				const data = await uni.$http.post('/api/public/v1/users/wxlogin', query);
				if(data.statusCode === 200) {
					this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
					this.navigateBack()
					return uni.$showMessage('登录成功！')
				} else {
					return uni.$showMessage('登录失败！')
				}
			},
			navigateBack() {
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container {
	height: 750rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;
	&::after {
		content: ' ';
		display: block;
		width: 100%;
		height: 40px;
		background-color: #ffffff;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.login-button {
		width: 90%;
		border-radius: 100px;
		margin: 15px 0px;
		background-color: #C00000;
	}
 	.tip-text {
		font-size: 12px;
		color: gray;
	}
}
</style>