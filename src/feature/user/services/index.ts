import axios from 'axios'
import {useQuery} from '@tanstack/react-query'

export const getProductList = () =>{
    return axios.get('https://fakestoreapi.com/products').then((res)=>{
        return res.data
    })
}

export const useGetProductList = () =>{
    return useQuery(['productData'],()=> getProductList())
}