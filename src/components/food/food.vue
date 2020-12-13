<template>
    <div class="food">
       <div class="left">
           <img :src="food.image" alt="">
       </div>
       <div class="right">
          <span class="name">
              {{food.name}}
              </span> 
              <span class="description">
                  {{food.description}}
              </span>
              <span class="info">
                  <span class="count">{{food.sellCount}}份</span>
                  <span class="ratings">好评率{{food.rating}}%</span>

              </span>
              <span class="price">
               <span class="new">￥{{food.price}}</span>
               <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
             </span>            
       </div>
       <seller-control class="control" :food="food"></seller-control>
    </div>
</template>

<script> 
import control from 'components/control/control'
    export default {
        name: "food",
      props:{
          food:Object
      },
      components:{
          "seller-control":control
      }
    }
</script>

<style scoped lang="stylus">
    .food
        display flex
        margin 18px
        position relative
        .left
            width 64px
            height 64px
            margin-right 10px
            border-radius 10px
            img
                border-radius 10px
                width 100%
                height 100%
        .right
            flex 1
            display flex
            flex-direction column
            font-size 10px
            line-height 10px
            color rgba(147,153,159,1)
            .name
                margin-top 2px
                font-size 14px
                line-height 14px
                color rgba(7,17,27,1)
            .description
                margin 8px 0px
                line-height 17px
            .info
                zoom 1
                .count
                    margin-right 12px
                .ratings
                    zoom 1
            .price
                margin-top 8px
                .new
                    margin-right 8px
                    font-size 14px
                    line-height 24px
                    color red
                    font-weight bold
                .old
                    zoom 1
                    text-decoration line-through
        .control
            position absolute
            right  0
            bottom 0
</style>