<template>
 <div class="goodsWrap">
        <div class="goods">
            <div class="left" ref="left">
                <ul class="typeList" ref="typeList">
                    <li class="typeItem" :class="{active:currentIndex === index}"
                        v-for="(good,index) in goods" :key="index" @click="leftToRight(index)">
                        <seller-icon class="icon" size="3"
                          v-show="good.type >= 0"  :type="good.type"></seller-icon>
                        <span class="name">{{good.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="right" ref="right">
                <ul class="classList" ref="classList">
                    <li class="classItem" v-for="(good,index) in goods" :key="index">
                        <h2 class="title">{{good.name}}</h2>
                        <ul class="foodList">
                            <li class="foodItem" v-for="(food,index) in good.foods" :key="index">
                                <seller-food :food="food"></seller-food>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <seller-cart @clear="clear" class="cartWrap" :selectedFood="selectedFoods"></seller-cart>
    </div>
</template>
<script>
import {GETSELLER,GETSGOODS,GETRATINGS} from "store/mutation_types.js";
import BetterScroll from 'better-scroll';
import {mapState,mapActions} from "vuex"
import food from 'components/food/food';
import cart from 'components/cart/cart';
export default {
  name: "goods",
        data(){
            return {
                scrollY:0,//需要当前右侧列表滑动的实时距离 : scrollY
                heightArr:[]//需要所有右侧分类项高度组成的一个累加数组 : heightArr
            }
        },
        computed:{
            ...mapState(["goods","iconTypes"]),
            //代表我们当前滑在哪一个列表上
            currentIndex(){
               
                var index = 0;
                index = this.heightArr.findIndex((item,index,arr)=>{
                    return (this.scrollY >= item && this.scrollY < arr[index+1])
                })

                if(index !== this.oldIndex){
                    //以下两行代码 应该在index产生改变时在执行
                    this.oldIndex = index
                    //选中的那个分类项 要尽量的出现在最顶部
                    let typeLiNodes = this.$refs.typeList && this.$refs.typeList.children;
                    //尽量的让typeLiNodes[index] 出现在滑屏区域的最顶部
                    this.leftScroll && this.leftScroll.scrollToElement(typeLiNodes[index],300)
                }


                //让对应的左侧分类项选中
                return index
            },
             //购物车组件需要的数据(选中的商品数组)
            selectedFoods(){
                let arr = [];
                this.goods.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if(food.count && food.count>0){
                            arr.push(food)
                        }
                    })
                })
                return arr;
            }
        },
        methods:{
            ...mapActions([GETSGOODS]),
            //初始化滑屏
            initScroll(){
                this.$nextTick(()=>{
                    //将滑屏的包裹器传入到BScroll内部就可以产生滑屏
                    this.leftScroll = new BScroll(this.$refs.left,{click:true});
                    //计算得到右侧滑屏元素移动的实时距离(正值)
                    this.rightScroll =new BScroll(this.$refs.right,{
                        probeType:3,
                        click:true
                    });
                    this.rightScroll.on("scroll",({x, y})=>{
                        this.scrollY = Math.abs(y)
                    })
                })
            },
            //初始化heightArr
            initHeightArr(){
                //确保当前的这个注册 在goods数据被修改之后再进行
                this.$nextTick(()=>{ 
                    //childNodes会包含文本节点
                    let rightLiNodes = this.$refs.classList.children;

                    let height = 0;
                    let heights = [height];
                    rightLiNodes.forEach((item)=>{
                        height += item.offsetHeight;
                        heights.push(height)
                    })
                    this.heightArr = heights

                    
                })
            },
            //左侧列表同步右侧列表
            leftToRight(index){
                this.rightScroll.scrollTo(0,-this.heightArr[index],300)
            },
            add(food){
                if(food){
                    if(food.count>0){
                        food.count++
                    }else{
                        this.$set(food,"count",1)
                    }
                }
              
        },
        remove(food){
            if(food.count>0)
                food.count--
        
        },
        clear(){
this.goods.array.forEach((good) => {
    good.foods.forEach((food) => {
        if(food.count && food.count>0)
        food.count=0
    })
})
        }
        },
        components:{
            "seller-food":food,
        },
        //mounted代表挂载完成 但是挂载完成并不代表页面渲染成功
        async mounted(){
           
            //会照成大量的请求浪费
            await this[GETSGOODS](); //当前这个await是必须的! 确保goods数据得到更新 再注册nextTick
            this.initScroll();
            this.initHeightArr();

            //为购物车的加减 在总线上注册事件
            this.$bus.$on("add",this.add);
            this.$bus.$on("remove",this.remove);

        },
                  
           
       
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
        overflow hidden
        .left
            width 80px
            .typeList
                .typeItem
                    one-px(rgba(7,17,27,.1))
                    display flex
                    justify-content center
                    align-items center
                    box-sizing border-box
                    width 80px
                    height 54px
                    padding 0 12px
                    background #f3f5f7
                    font-size:12px
                    line-height 14px
                    color rgba(0,0,0,.6)
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
                        color rgba(147,153,159,1)
                    .foodList
                        zoom 1
                        .foodItem
                            overflow hidden
                            one-px(rgba(7,17,27,.1))
                            &:last-child
                                border-none()
    .cartWrap
        height 46px
</style>
