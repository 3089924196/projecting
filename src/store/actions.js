import {GETSELLER,GETSGOODS,GETRATINGS} from "store/mutation_types.js";
import axios from 'http/http';
export default {
async [GETSELLER]({commit,state}){
const {data,code}=await axios.get("/api/seller")
if(code===state.OK){
  commit(GETSELLER,data)
}
},
async [GETSGOODS]({commit,state}){
  const {data,code}=await axios.get("/api/goods")
  if(code===state.OK){
    commit(GETSGOODS,data)
  }
  },
  async [GETRATINGS]({commit,state}){
    const {data,code}=await axios.get("/api/ratings")
    if(code===state.OK){
      commit(GETRATINGS,data)
    }
    },
}