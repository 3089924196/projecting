<template>
    <ul class="list">
        <li v-for="(support,index) in supports" :key="index">
            <seller-icon class="icon" size="2" :type="support.type"></seller-icon>
            <span>{{support.content}}</span>
        </li>
    </ul>
</template>

<script>
    import {mapState} from "vuex"
    export default {
        name: "list",
        props:{
            supports:Array
        },
        computed:{
            ...mapState(["iconTypes"]),
            /*iconType(){
                //如果遇到计算属性传参的需求
                // 那么我们计算属性对应的get方法需要返回一个函数
                // 当前函数的第一个参数就是我们计算属性使用时传的参数
                // 当前函数的返回值 就是计算属性渲染时运用的值
                return function (type) {
                    return this.iconTypes[type]
                }
            }*/
        }
    }
</script>

<style scoped lang="stylus">
    .list
        width 80%
        margin 0 auto
        box-sizing border-box
        padding 0 12px
        font-size 12px
        font-weight 200px
        color white
        margin-top 24px
        margin-bottom 28px
        & > li
            display flex
            align-items center
            margin-bottom 12px
            &:last-child
                margin-bottom 0
            .icon
                margin-right 6px

</style>