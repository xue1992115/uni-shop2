<template>
  <view>
  <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
  <button type="primary" size="mini" class="btnChooseAddress"
  @click="chooseAddress">请选择收货地址+</button>
  </view>
   <view class="address-info-box" v-else @click="chooseAddress">
     <view class="row1">
       <view class="row1-left">
         <view class="username">
           收货人：{{address.userName}}
         </view>
       </view>
       <view class="row1-right">
         <view class="phone"> 
           电话：{{address.telNumber}}
         </view>
         <uni-icons type="arrowright" size="16"></uni-icons>
       </view>
     </view>
     <view class="row2">
       <view class="row2-left">
         收货地址：
       </view>
       <view class="row2-right">
         {{addstr}}
       </view>
     </view>
   </view>
   <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
      };
    },
	computed: {
	  ...mapState('m_user',['address']),
	// 收货详细地址的计算属性
	...mapGetters('m_user',['addstr'])
	},
	methods: {
	...mapMutations('m_user',['updateAddress']),
		// 选择收货地址
		async chooseAddress() {
			console.log('hhh');
		// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
		// 返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
		const res = await uni.chooseAddress().catch(err => err);
			if(res.errMsg === 'chooseAddress:ok') {
				console.log(res, 'res');
				this.updateAddress(res)
			}
		}
	},
}
</script>

<style lang="scss">
.address-border{
  display: block;
  width: 100%;
  height: 5px;
}
.address-choose-box{
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-info-box{
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;
  .row1{
    display: flex;
    justify-content: space-between;
    .row1-left{
      .username{}
    }
    .row1-right{
      display: flex;
      justify-content: space-between;
      .phome{}
    }
  }
  .row2{
    display: flex;
    align-items: center;
    margin-top: 10px;
    .row2-left{
      white-space: nowrap;
    }
    .row2-right{}
  }
}
</style>