import {GETSELLERS,GETGOODS,GETRATINGS} from "store/mutation_types.js";
import axios from 'http/http';
export default {
async [GETSELLERS]({commit,state}){
await axios.get("/api/seller")
}
}