<template>
 <ul class="list">
   <li>
     <seller-icon class="icon" size="2" type="discount"></seller-icon>
     <span>在线支付满28见士大夫，满50奖11</span>
   </li>
   <li>
     <seller-icon class="icon" size="2" type="decrease"></seller-icon>
     <span>在线支付满225，满50奖12313</span>
   </li>
   <li>
     <seller-icon class="icon" size="2" type="gurantee"></seller-icon>
     <span>在线支付满300水电，满50奖9999</span>
   </li>
   <li>
     <seller-icon class="icon" size="2" type="invoice"></seller-icon>
     <span>在线支付满89见fvvfg，满00</span>
   </li>
 </ul>
</template>

<script>
export default {
  name: 'list',
}
</script>

<style lang="stylus" scoped>
    .list
        width 80%
        margin 0 auto
        box-sizing border-box
        padding 0 12px
        font-size 12px
        font-weight 200px
        color white
        margin-top 24px
        margin-bottom 28px
        & > li
            display flex
            align-items center
            margin-bottom 12px
            &:last-child
                margin-bottom 0
            .icon
                margin-right 6px

           



</style>
