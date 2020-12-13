import {GETSELLER,GETSGOODS,GETRATINGS} from "store/mutation_types.js";
export default {
  [GETSELLER](state,seller){
    state.seller=seller
  },
  [GETSGOODS](state,goods){
    state.goods=goods
  },
  [GETRATINGS](state,ratings){
    state.ratings=ratings
  },
}