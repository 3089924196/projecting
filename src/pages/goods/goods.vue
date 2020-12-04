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
    scrollY:0,
    heightArr:[]
    }
  },
  async mounted() {
    await this[GETSGOODS]();
  },
  computed:{
    ...mapState(["goods","iconTypes"]),
    currentIndex(){
      var index=0,
      index=this.heightArr.findIndex((item,index,arr)=>{
      return (this.scrollY >= item && this.scrollY<arr[index+1])
      })
      if(index !==this.oldIndex){
        this.oldIndex=index
        let typeLiNodes=this.$refs.typeList && this.$refs.type.children;
        this.leftScroll && this.leftScroll.scrollToElement(typeLiNodes[index],300)
      }
      return index
    }
    
  },
methods: {
  ...mapActions([GETGOODS]),
  initScroll(){
    this.$nexTick(()=>{
      this.leftScroll=new BetterScroll(this.$refs.left,{click:true});
      this.rightScroll=new BetterScroll(this.$refs.right,{
        click:true,
        probeType:3
        });
        this.rightScroll.on("scroll",({x,y})=>{
          this.scrollY=Math.abs(y)
        })
    })
  },
  initHeightArr(){
    this.$nexTick(()=>{
      let rightLiNodes=this.$refs.classList.children;
      let height =0;
      let heights=[height];
      rightLiNodes.forEach((item)=>{
        height+=item.offsetHeight;
        heights.push(height)

      })
      this.heightArr=heights
    })
  },
  leftToRight(index){
    this.rightScroll.scrollTo(0,-this.heightArr[index],300)
  }
},
components:{
  "seller-food":food,
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
