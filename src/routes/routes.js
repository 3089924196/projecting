import goods from "pages/goods/goods.vue"
import ratings from "pages/ratings/ratings.vue"
import sellers from "pages/sellers/seller.vue"
export default [
    {path:"/goods",component:goods},
    {path:"/ratings",component:ratings},
    {path:"/sellers",component:sellers},
    {path:"/",redirect:"/goods"}
]