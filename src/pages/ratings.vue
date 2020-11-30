<template>
  <div class="ratings"
       ref="ratingWrapper">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <span class="starsWrap">
              <seller-stars size="36"
                            :mr="3"
                            :score="seller.serviceScore"></seller-stars>
            </span>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <span class="starsWrap">
              <seller-stars size="36"
                            :mr="3"
                            :score="seller.foodScore"></seller-stars>
            </span>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <seller-split></seller-split>

      <seller-select :ratingType="ratingType"
                     @select="select"
                     @switch="switchFn"
                     :needText="needText"
                     :ratings="ratings"></seller-select>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item"
              v-for="(rating,index) in filterRatings"
              :key="index">
            <div class="avatar">
              <img width="28"
                   height="28"
                   :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <seller-stars size="24"
                              :mr="3"
                              :score="rating.score"></seller-stars>
                <span class="delivery"
                      v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont"
                      :class="rateTypeClass(rating.rateType)"></span>
              </div>
              <div class="time">{{rating.rateTime | dateString}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ratings"
}
</script>

<style scoped lang="stylus">
.ratings
  position absolute
  top 175px
  bottom 0
  left 0
  width 100%
  overflow hidden
  background #fff
  .overview
    display flex
    padding 18px 0
    .overview-left
      flex 0 0 137px
      padding 6px 0
      width 137px
      border-right 1px solid rgba(7, 17, 27, 0.1)
      text-align center
      @media only screen and (max-width 320px)
        flex 0 0 120px
        width 120px
      .score
        margin-bottom 6px
        line-height 28px
        font-size 24px
        color rgb(255, 153, 0)
      .title
        margin-bottom 8px
        line-height 12px
        font-size 12px
        color rgb(7, 17, 27)
      .rank
        line-height 10px
        font-size 10px
        color rgb(147, 153, 159)
    .overview-right
      flex 1
      padding 6px 0 6px 24px
      @media only screen and (max-width 320px)
        padding-left 6px
      .score-wrapper
        margin-bottom 8px
        font-size 0
        .title
          display inline-block
          line-height 18px
          vertical-align top
          font-size 12px
          color rgb(7, 17, 27)
        .starsWrap
          display inline-block
          margin 0 12px
          vertical-align top
        .score
          display inline-block
          line-height 18px
          vertical-align top
          font-size 12px
          color rgb(255, 153, 0)
      .delivery-wrapper
        font-size 0
        .title
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)
        .delivery
          margin-left 12px
          font-size 12px
          color rgb(147, 153, 159)
  .rating-wrapper
    padding 0 18px
    .rating-item
      one-px(rgba(7, 17, 27, 0.1))
      display flex
      padding 18px 0
      .avatar
        flex 0 0 28px
        width 28px
        margin-right 12px
        img
          border-radius 50%
      .content
        position relative
        flex 1
        .name
          margin-bottom 4px
          line-height 12px
          font-size 10px
          color rgb(7, 17, 27)
        .star-wrapper
          margin-bottom 6px
          font-size 0
          .star
            display inline-block
            margin-right 6px
            vertical-align top
          .delivery
            display inline-block
            vertical-align top
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
        .text
          margin-bottom 8px
          line-height 18px
          color rgb(7, 17, 27)
          font-size 12px
        .recommend
          line-height 16px
          font-size 0
          .seller-thumb_up, .seller-thumb_down, .item
            display inline-block
            margin 0 8px 4px 0
            font-size 9px
          .seller-thumb_up
            color red
          .seller-thumb_down
            color rgb(147, 153, 159)
          .item
            padding 0 6px
            border 1px solid rgba(7, 17, 27, 0.1)
            border-radius 1px
            color rgb(147, 153, 159)
            background #fff
        .time
          position absolute
          top 0
          right 0
          line-height 12px
          font-size 10px
          color rgb(147, 153, 159)
</style>