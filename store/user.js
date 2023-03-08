export default{
  namespaced:true,
  state:()=>({
    address:JSON.parse(uni.getStorageSync('address')||'{}'),
	token: uni.getStorageSync('token') || '',
	userinfo: JSON.parse(uni.getStorageSync('userinfo')||'{}'),
	redirectInfo: null
  }),
  mutations:{
    updateAddress(state,address){
      state.address=address
      this.commit('m_user/saveAddressToStorage')
    },
	updateUserInfo(state, userinfo){
	  state.userinfo = userinfo;
	  this.commit('m_user/saveUserInfoToStorage');
	},
	updateToken(state, token){
	  state.token = token;
	  this.commit('m_user/saveTokenToStorage');
	},
	updateRedirectInfo(state, redirectInfo){
	  state.redirectInfo = redirectInfo;
	},
    saveAddressToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
	saveUserInfoToStorage(state){
	  uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
	},
	saveTokenToStorage(state){
	  uni.setStorageSync('token',state.token)
	},
  },
  getters:{
    addstr(state) {
		if (!state.address.provinceName) return ''
			// 拼接 省，市，区，详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName +
			state.address.countyName +state.address.detailInfo
		}
	}
}