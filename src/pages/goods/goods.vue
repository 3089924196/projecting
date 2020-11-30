<template>
  <div class="goodsWrap">
    <div class="goods">
      <div class="left"
           ref="left">
        <ul class="typeList"
            ref="typeList">
          <li class="typeItem"
              :class="{active:currentIndex === index}"
              v-for="(good,index) in goods"
              :key="index"
              @click="leftToRight(index)">
            <seller-icon class="icon"
                         size="3"
                         v-show="good.type >= 0"
                         :type="good.type"></seller-icon>
            <span class="name">{{good.name}}</span>
          </li>
        </ul>
      </div>
      <div class="right"
           ref="right">
        <ul class="classList"
            ref="classList">
          <li class="classItem"
              v-for="(good,index) in goods"
              :key="index">
            <h2 class="title">{{good.name}}</h2>
            <ul class="foodList">
              <li class="foodItem"
                  v-for="(food,index) in good.foods"
                  :key="index">
                <seller-food :food="food"></seller-food>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <seller-cart @clear="clear"
                 class="cartWrap"
                 :selectedFoods="selectedFoods"></seller-cart>
  </div>
</template>

<script>
export default {
  name: "goods"
}
</script>

<style scoped lang="stylus">
.goodsWrap
  display flex
  flex-direction column
  .goods
    flex 1
    display flex
    overflow hidden
    .left
      width 80px
      .typeList
        .typeItem
          one-px(rgba(7, 17, 27, 0.1))
          display flex
          justify-content center
          align-items center
          box-sizing border-box
          width 80px
          height 54px
          padding 0 12px
          background #f3f5f7
          font-size 12px
          line-height 14px
          color rgba(0, 0, 0, 0.6)
          font-weight bold
          &.active
            background pink
          &:after
            width 56px
          &:last-child
            border-none()
          .icon
            margin-right 3px
          .name
            zoom 1
    .right
      flex 1
      .classList
        .classItem
          .title
            height 26px
            padding-left 14px
            background #f3f5f7
            border-left 5px solid #d9dde1
            font-size 12px
            line-height 26px
            color rgba(147, 153, 159, 1)
          .foodList
            zoom 1
            .foodItem
              overflow hidden
              one-px(rgba(7, 17, 27, 0.1))
              &:last-child
                border-none()
  .cartWrap
    height 46px
</style>