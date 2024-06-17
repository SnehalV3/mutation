import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const deleteSingleProduct = (id: string) => {
  return axios.delete(`https://fakestoreapi.com/products/${id}`).then((res) => {
    console.log(res.data);
    return res.data;
  });
};


export const updateSingleProduct = ({
  id,
  product,
}: {
  id: string;
  product: any;
}) => {
  return axios
    .put(`https://fakestoreapi.com/produts/${id}`, product)
    .then((res) => {
      console.log(res);
      return res.data;
    });
};

export const addSingleProduct = (productDetails:any) =>{
    return axios.post('https://fakestoreapi.com/products',productDetails).then((res)=>{
        return res.data;
    })
}

// export const useDeleteSingleProduct = (id:string)=>{
//     return useQuery(['deleteSingleProduct'],()=> deleteSingleProduct(id))
// }
