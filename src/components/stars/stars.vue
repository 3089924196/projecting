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
      let ONSize=Math.floor(score*2);
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
    .stars
        display inline-flex
        & > .star
          background pink
            background-size 100%
            background-repeat no-repeat
            &.star-48
                width 20px
                height 20px
            &.star-36
                width 15px
                height 15px
            &.star-24
                width 10px
                height 10px
</style>
