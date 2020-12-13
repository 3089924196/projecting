<template>
   <div>
        <div class="cart">
            <div  class="left" style="color: white" @click="foldFn">
                <div class="icon">
                    <div class="logo" :class="{active:totalCount>0}">
                        <i class="seller-shopping_cart"></i>
                    </div>
                    <span class="qipao" v-show="totalCount>0">{{totalCount}}</span>
                </div>
                <div class="totalPrice" :class="{active:totalPrice>0}">
                    <span>¥{{totalPrice}}</span>
                </div>
                <div class="deliveryPrice">
                    <span>另需配送费¥{{seller.deliveryPrice}}元</span>
                </div>
            </div>
            <div class="right" :class="{active:totalPrice>=seller.minPrice}">
                <span>{{rightText}}</span>
            </div>
            <!--小球动画-->
            <div class="balls">
                <div class="ballWrap" v-for="(ball,index) in balls" :key="index">
                    <transition
                            @before-enter="beforeDrop"
                            @enter="dropping"
                            @after-enter="afterDrop">
                        <i class="ball" v-show="ball.show"></i>
                    </transition>
                </div>
            </div>
        </div>
        <div class="list" v-show="showList">
            <div class="header">
                <span class="cartText">购物车</span>
                <span class="clear" @click="clear">清空</span>
            </div>
            <div class="content" ref="content">
                <ul>
                    <li class="item" v-for="(selectedFood,index) in selectedFoods" :key="index">
                        <span class="left"> {{selectedFood.name}} </span>
                        <div class="right">
                            <span v-show="selectedFood.count" class="price">
                                ¥{{selectedFood.price * selectedFood.count}}
                            </span>
                            <seller-control class="contorl" :food="selectedFood" ></seller-control>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mask" v-show="showList" @click="fold=true"></div>
    </div>
</template>

<script>
  import PubSub from 'pubsub-js'
    import BScroll from "better-scroll"
    import {mapState} from "vuex";
    import {transform} from "@/util/util.js"
    import control from "components/control/control.vue"
    export default {
        name: "cart",
        props:{
            selectedFoods:Array
        },
        data(){
            return {
                balls:[
                    {show:false},
                    {show:false},
                    {show:false},
                    {show:false},
                    {show:false}
                ], //小球数组
                dropBalls:[],//存放正在下降的小球
                fold:true //控制list是否要折叠  true:需要折叠  false:不需要折叠
            }
        },
        computed:{
            //商家相关的数据
            ...mapState(["seller"]),
            //总数量
            totalCount(){
                return this.selectedFoods.reduce((adder,selectedFood)=>{
                    return adder + selectedFood.count
                },0)
            },
            //总价钱
            totalPrice(){
                return this.selectedFoods.reduce((adder,selectedFood)=>{
                    return adder + (selectedFood.count * selectedFood.price)
                },0)
            },
            //结算文案
            rightText(){
                if(this.totalPrice === 0){
                    return `¥${this.seller.minPrice}元起送`
                }else if(this.totalPrice < this.seller.minPrice){
                    return `还差¥${this.seller.minPrice - this.totalPrice}元起送`
                }else if(this.totalPrice >= this.seller.minPrice){
                    return `去结算`
                }
            },
            //控制list的折叠的计算属性
            showList(){
                //当totalcount 降为0时  list也应该折叠起来
                if(this.totalCount <=0 ){
                    //按照数据驱动的编程思想  fold和showList一定是反比关系
                    this.fold = true
                    return false
                }

                if(!this.contentScroll){
                    this.contentScroll = new BScroll(this.$refs.content,{click:true})
                }else {
                    this.contentScroll.refresh()
                }

                return !this.fold
            }
        },
        methods:{
            //小球动画相关的方法
            drop(name,ev){
                
                for(let i=0;i<this.balls.length;i++){
                    let ball = this.balls[i];
                    if(!ball.show){
                      
                        ball.show = true;
                       
                        ball.target = ev.target;
                        this.dropBalls.push(ball)
                        return;
                    }
                }
            },
           
            beforeDrop(el){
               
                let count = this.balls.length;
                while (count--){
                    let ball = this.balls[count]
                    if(ball.show){
                       
                        let viewH = document.documentElement.clientHeight;
                        var bottom = ball.target.getBoundingClientRect().bottom;
                        let translateX = ball.target.getBoundingClientRect().left + 12 - 40;
                        let translateY = viewH - bottom + 12 - 30;
                        transform(el,"translateX",translateX)
                        transform(el,"translateY",-translateY)
                        return;
                    }
                }
            },
            dropping(el){
                
                let hook = el.offsetLeft; //会等到el渲染完才执行下面的代码
                //开始下落
                this.$nextTick(()=>{
                    //只能保证对应的小球显示了!!!! 不能保证他到达指定位置
                    transform(el,"translateX",0)
                    transform(el,"translateY",0)
                })
            },
            afterDrop(el){
                
                const ball = this.dropBalls.shift();
                if(ball.show){
                    ball.show = false ;
                    el.style.display="none";//让隐藏变的更快
                }
            },


            //购物车清空
            clear(){
                this.$emit("clear")
            },
            //购物车列表的折叠
            foldFn(){
                //看门狗  当总数量小于等于0的时候 我们点击购物车的左侧时
                // 不应该让fold产生任何改变
                if(this.totalCount<=0){
                    return;
                }
                this.fold = !this.fold
            }
        },
        components:{
            "seller-control":control
        },
        mounted(){
            //唤醒小球的订阅方法
            PubSub.subscribe('ballAnimation', this.drop);
        }
    }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .cart
        flex 0 0 0;
        position fixed
        z-index 3
        bottom 0
        left 0
        height 46px
        width 100%
        background #141d27
        display flex
        .left
            flex 1
            height 100%
            display flex
            .icon
                position relative
                bottom 15px
                width 56px
                height 56px
                border-radius 50%
                background #141d27
                margin-left 12px
                margin-right 12px
                display flex
                justify-content center
                align-items center
                .logo
                    display flex
                    justify-content center
                    align-items center
                    wi dth 44px
                    height 44px
                    border-radius 50%
                    background rgba(255,255,255,0.4)
                    &.active
                        background rgba(0,160,220,1)
                        i
                            color white
                    i
                        color rgba(255,255,255,0.4)
                .qipao
                    position absolute
                    right 0
                    top 5px
                    width 24px
                    height 16px
                    line-height 16px
                    border-radius 6px
                    background red
                    font-size 9px
                    font-weight 700
                    text-align center
            .totalPrice
                display flex
                justify-content center
                align-items center
                margin-right 12px
                font-size 16px
                line-height 24px
                font-weight 700
                color rgba(255,255,255,.4)
                &.active
                    color white
            .deliveryPrice
                display flex
                justify-content center
                align-items center
                font-size 14px
                line-height 24px
                font-weight 700
                color rgba(255,255,255,.4)
                padding-left 12px
                border-left 2px solid rgba(255,255,255,0.1)
        .right
            flex 0 0 105px
            height 100%
            background rgba(255,255,255,0.4)
            display flex
            justify-content center
            align-items center
            &.active
                background green
                span
                    color white
            span
                color rgba(255,255,255,0.6)
        .balls
            .ballWrap
                .ball
                    position absolute
                    left 32px
                    bottom 23px
                    width 15px
                    height 15px
                    border-radius 50%
                    background deeppink
                    transition .6s all linear
    .list
        max-height 255px
        position fixed
        z-index 2
        left 0
        bottom 45px
        width 100%
        background #f3f5f1
        padding-bottom 20px
        .header
            one-px(rgba(7,17,27,.1))
            height 40px
            background #f3f5f7
            display flex
            justify-content space-between
            align-items center
            .cartText
                margin-left 18px ;
                color rgba(7,17,27,1);
                font-weight 800
                font-size 14px
            .clear
                margin-right 18px
                color rgba(0,160,220,1);
                font-weight 800
                font-size 14px

        .content
            max-height 195px
            overflow hidden
            .item
                one-px(rgba(7,17,27,.1))
                display flex
                height 48px
                align-items center
                justify-content space-between
                .left
                    padding-left 18px
                .right
                    display flex
                    align-items center
                    padding-right  22px
                    .price
                        margin-right 12px
                        color rgba(240,20,20,1)
                        font-size 10px
                        font-weight 700
    .mask
        position fixed
        z-index 1
        left 0
        right 0
        top 0
        bottom 0
        background rgba(7,17,27,.6)
        backdrop-filter blur(5px)
</style>