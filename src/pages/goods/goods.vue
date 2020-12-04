<template>
<div class="goodsWrap">
<div class="goods">
<div class="left" ref="left">
<ul class="typeList" ref="typeList">
  <li class="typeItem" :class="{active:currentIndex===index}"
  v-for="(good,index) in goods" :key="index" @click=leftToRight(index)>
  <seller-icon class="icon" v-show="good.type>=0" :type="good.type" size="3" ></seller-icon>
  <span class="name">{{good.name}}</span>
  </li>
</ul>
</div>
<div class="right">
  <ul class="classList" ref="classList">
    <li class="classItem" v-for="(good,index) in goods" :key="index">
      <h2 class="title">{{good.name}}</h2>
      <ul class="foodList">
        <li class="foodItem" v-for="(good,index) in goods" :key="index">
          <seller-food :food="food"></seller-food>
        </li>
      </ul>
    </li>
  </ul>
</div>
   </div>
   <div class="cart"></div>
 </div>
</template>
<script>
import {GETSELLER,GETGOODS,GETRATINGS} from "store/mutation_types.js";
import BetterScroll from 'better-scroll';
import {mapState,mapActions} from "vuex"
import food from 'components/food/food';
export default {
  name: "goods",
  data(){
    return{

    }
  },
  async mounted() {
    await this[GETSGOODS]();
  },
  computed:{
    ...mapState(["goods","iconTypes"]),
  },
methods: {
  ...mapActions([GETGOODS]),
  
},
components:{
  "seller-food":food
}
}
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
.goodsWrap
    display flex
    flex-direction column
    .goods
        flex 1
        display flex
        overflow hiddeen
        .left
            width 80px
            .typeList
                .typeItem
                    display flex
                    justify-content center
                    align-items center
                    box-sizing border-box
                    width 80px
                    height 54px
                    padding 0 12px
                    background #f3f5f7
                    font-size 12px
                    font-weight 200
                    line-height 174px
                    color rgba(240,20,20)
                    &.active
                        background pink
                    &:after
                        width 56px
                    




</style>
