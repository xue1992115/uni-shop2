<template>
  <view>
    <view class="my-settle-container">
     <label class="radio" @click="changeAllState">
       <radio color="#c00000" :checked="isFullCheck"/><text>全选</text>
     </label>
     <view class="amount-box">
       合计: <text class="amount">￥{{checkedGoodsAmount}}</text>
     </view>
     <view class="btn-settle" @click="settlement">
       结算({{checkedCount}})
     </view>
    </view>
  </view>
</template>

<script>
  import {mapState, mapGetters,mapMutations} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        seconds: 3, 
		timer: null
      };
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
	  ...mapGetters('m_user',['addstr']),
	  ...mapState('m_user',['token']),
	  ...mapState('m_cart',['cart']),
      isFullCheck(){
        return this.total===this.checkedCount
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      ...mapMutations('m_user',['updateRedirectInfo']),
      changeAllState(){
        this.updateAllGoodsState(!this.isFullCheck)
      },
	  settlement() {
		  if(!this.checkedCount) return uni.$showMessage('请选择要结算的商品！');
		  if(!this.addstr) return uni.$showMessage('请选择收获地址！')
		  // if(!this.token) return uni.$showMessage('请先登陆！')
		  if(!this.token){
			  this.seconds = 3;
			  this.delayNavigate()
		  }
		  this.payOrder()
		  
	  },
	  delayNavigate(){
		this.showTips(this.seconds);
		this.timer = setInterval(() => {
			if(this.seconds === 0) {
				clearInterval((this.timer))
				uni.switchTab({
					url: '/pages/my/my',
					success: () => {
						this.updateRedirectInfo({
							openType: 'switchTab',
							from: '/pages/cart/cart'
						}); 
					}
				})
				return;
			}
			this.seconds--;
			this.showTips(this.seconds);
		}, 1000)
	  },
	  showTips(n) {
		uni.showToast({
			icon:'none',
			title: '请登录后在结算！' + n + '秒之后自动跳转到登陆页面',
			mask: true,
			duration: 1500,
		})  
	  },
	  async payOrder() {
		  const orderInfo = {
			  order_price: 0.01,
			  conignee_addr: this.addstr,
			  goods: this.cart.filter(item => item.goods_state).map((goods) => ({
				   goods_id: goods.goods_id,
				   goods_number: goods.goods_count,
				   goods_price: goods.goods_price,
			  }))
		  }
		  const res = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo);
		  if(res.data.meta.status !== 200) {
			  return uni.$showMessage('创建订单失败！')
		  }
		  const orderNumber = res.data.message.order_number;
		  const res2 = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
		  console.log(res2)
		  if(res2.data.meta.status !== 200) {
			return uni.$showMessage('预付订单失败！')
		  }
		  const payInfo = res2.data.message || {};
		  const res3 = await uni.requestOrderPayment(payInfo);
		  if(res3.data.err) return uni.$showMessage('订单未支付！')
		  const res4 = await uni.$http.post('/api/public/v1/my/orders/chkorder', { order_number: orderNumber })
		  if(res4.data.meta.status !== 200) {
		  	return uni.$showMessage('订单未支付！')
		  }
		  uni.showToast({
		  	title: '订单支付完成！',
			icon: 'success '
		  })
	  }
    }
  }
</script>

<style lang="scss">
.my-settle-container{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  .radio{
    display: flex;
    align-items: center;
  }
  .amount-box{
    .amount{
      color: #c00000;
      font-weight: bold;
    }
  }
  .btn-settle{
    background-color: #c00000;
    height: 50px;
    color: white;
    line-height: 50px;
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }
}
</style>