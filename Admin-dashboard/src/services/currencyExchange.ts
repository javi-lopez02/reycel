import axios from './axios'

export const editCurrency = (cup: number, eur: number, id:string)=>{
  return axios.put(`/editCurrency/${id}`, {cup, eur})
}

export const getCurrency = ()=>{
  return axios.get("/currency")
}