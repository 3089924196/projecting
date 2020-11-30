<template>
  <div id="app">
    <seller-header class="header"></seller-header>
    <div class="navs">
      <div class="nav">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="nav">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="nav">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view class="router"></router-view>
    </keep-alive>
  </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(["test"])
  },
  components: {
    "seller-header": header
  },
mounted() {
  
},
}
</script>

<style scoped lang="stylus">
@import './common/stylus/mixin.styl'
#app
  width 100%
  height 100%
  position relative
  .header
    zoom 1
  .navs
    one-px(black)
    display flex
    height 40px
    .nav
      flex 1
      a
        display flex
        justify-content center
        align-items center
        width 100%
        height 100%
        font-size 14px
        color rgb a(77, 85, 93, 1)
        &.active
          color rgba(240, 20, 20, 1)
  .router
    /* 实现了在所有设备下 根据设备不一样 固定的高度也不一样 */
    position absolute
    left 0
    right 0
    top 174px
    bottom 0
</style>
