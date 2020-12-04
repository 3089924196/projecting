<template>
<div class="stars">
<div class="star" :class="[className,`star-${size}`]"
v-for="(className,index) in classNames" :key="index">
</div>
</div>
</template>

<script>
const FULLSIZE=5;
const ON='on';
const HALF='half';
const OFF='off';
export default {
  name: 'stars',
  props:{
    score:Number,
    size:String,

  },
  computed:{
    classNames(){
      if(this.score===undefined)
      return [OFF,OFF,OFF,OFF,OFF]
      let arr=[];
      let score=Math.floor(this.score*2)/2;
      let ONSize=Math.floor(score);
      for(let i=0;i<ONSize.length;i++){
      arr.push(ON)
      }
      let needHalf=(score%1===0?false:true);
      needHalf?arr.push(HALF):"";
      while (arr.length<FULLSIZE)
      arr.push(OFF)
      return arr
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
    .stars
        display inline-flex
        & > .star
            background-size 100%
            background-repeat no-repeat
            &.star-48
                width 20px
                height 20px
                margin-right 20px
                &:last-child
                    margin-right 0px
                &.on
                    bg-image(star48_on)
                &.half
                    bg-image(star48_half)
                &.off
                    bg-image(star48_off)
                
            &.star-36
                width 15px
                height 15px
                margin-right 15px
                &:last-child
                    margin-right 0px
                &.on
                    bg-image(star36_on)
                &.half
                    bg-image(star36_half)
                &.off
                    bg-image(star36_off)
            &.star-24
                width 10px
                height 10px
                margin-right 10px
                &:last-child
                    margin-right 0px
                &.on
                    bg-image(star24_on)
                &.half
                    bg-image(star24_half)
                &.off
                    bg-image(star24_off)
</style>
