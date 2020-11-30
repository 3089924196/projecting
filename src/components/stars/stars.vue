<template>
    <div class="stars">
        <div class="star" :class="[className,`star-${size}`]"
             :style="{marginRight:mr+'px!important'}"
             v-for="(className,index) in classNames" :key="index"></div>
    </div>
</template>

<script>
    const FULLSIZE = 5;
    const ON = 'on';
    const HALF = 'half';
    const OFF = 'off';
    export default {
        name: "stars",
        props:{
            score:Number,
            size:String,
            mr:Number
        },
        computed:{
            //根据分数score要生成["ON","ON","ON","HALF","OFF"]
            classNames(){
                if(this.score === undefined)
                    return [OFF,OFF,OFF,OFF,OFF]


                let arr = [];
                //经过处理的分数 要么是要.5小数位 要么就是整数
                let score = Math.floor(this.score * 2) / 2;
                //ON的个数
                let ONSize = Math.floor(score);
                for(let i=0;i<ONSize;i++){
                    arr.push(ON)
                }
                //HALF的个数
                let needHalf = (score%1 ===0 ? false : true);
                needHalf ? arr.push(HALF) : "";
                //OFF的个数
                while (arr.length < FULLSIZE)
                    arr.push(OFF)

                return arr
            }
        }
    }
</script>

<style scoped lang="stylus">
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