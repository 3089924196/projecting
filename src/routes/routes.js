import goods from "pages/goods/goods.vue"
import ratings from "pages/ratings/ratings.vue"
import seller from "pages/seller/seller.vue"
export default [
    {path:"/goods",component:goods},
    {path:"/ratings",component:ratings},
    {path:"/seller",component:seller},
    {path:"/",redirect:"/goods"}
]