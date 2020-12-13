<template>
  <div class="contorl">
      <transition name="remove">
    <i v-show="food.count" @click="remove(food)"
    class="seller-remove_circle_outline remove"></i>
      </transition>
       
       <span v-show="food.count">{{food.count}}</span>
       <i class="seller-add_circle add" @click="add(food,$event)"></i>
</div>
</template>

<script>
import PubSub from 'pubsub-js'
export default {
  name: 'control',
  props:{
      food:Object
  },
  methods: {
      add(food,ev){
          this.$bus.$emit('add',food);
          PubSub.publish('ballAnimation',ev)
      },
      remove(food){
          this.$bus.$emit('remove',food);
      }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .contorl
        justify-content center
        align-items center
        display inline-flex
        i
            display inline-block
            font-size 24px
            vertical-align middle
            color rgba(0,160,220,1)
            &.add
                position relative
                z-index: 1
            &.remove
                opacity 1
                transform translate3d(0,0,0) rotate(-720deg)
        span
            display inline-block
            width 24px
            text-align center
            font-size 10px
            vertical-align middle
            color rgba(147,153,159,1)
</style>
