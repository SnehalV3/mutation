import {
  Box,
  IconButton,
  Text,
  Flex,
  AlertDialog,
  AlertDialogTrigger,
  Button,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogActions,
  AlertDialogCancel,
  AlertDialogAction,
  Dialog,
  DialogTrigger,
  toast
} from "@sparrowengg/twigs-react";
import {
  DeleteIcon,
  PencilIcon,
} from "@sparrowengg/twigs-react-icons";
import React from "react";
import AddEditProductModal from "../add-edit-product-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSingleProduct } from "../../../feature/admin/services";

const ProductCard = ({
  product,
  isAdmin = false,
}: {
  product: any;
  isAdmin: boolean;
}) => {

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: deleteSingleProduct,
    onMutate: (data) => {
      toast({
        variant: "success",
        title: "Product deleted",
        description: "Product deleted Successfully",
      });

      const previousData = queryClient.getQueryData(['productData'])
      console.log(previousData, data)
      queryClient.setQueryData(['productData'],(previousData:any)=>{
        const filterData = previousData.filter((item:any) => item.id !== data);
        return filterData
      })

      return {previousData}
    },
    onError: (err,_,context) => {
      toast({
        variant: "error",
        title: "Error in deletion",
        description: "There was a problem in deleting product.",
      });

      queryClient.setQueryData(['productData'],context?.previousData)

    },
  })

  const handleDelete = (id:string) =>{
    mutate(id)
  }
  
  return (
    <Box
      css={{
        width: "250px",
        height: "350px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "$2",
        border: "1px solid $accent500",
        padding: "$5",
        borderRadius: "$md",
      }}
      key={product?.id}
    >
      {isAdmin && (
        <Flex
          css={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Dialog>
            <DialogTrigger asChild>
              <IconButton icon={<PencilIcon />} />
            </DialogTrigger>
            <AddEditProductModal product={product} isEdit={true}/>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <IconButton icon={<DeleteIcon />} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <React.Fragment key=".0">
                <AlertDialogTitle>
                  Are you sure you want to delete Product?
                </AlertDialogTitle>
                <AlertDialogActions>
                  <AlertDialogCancel asChild>
                    <Button color="default" size="lg">
                      Cancel
                    </Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button color="error" onClick={()=>handleDelete(product?.id)} size="lg">
                      Yes, delete
                    </Button>
                  </AlertDialogAction>
                </AlertDialogActions>
              </React.Fragment>
            </AlertDialogContent>
          </AlertDialog>
        </Flex>
      )}
      <Box
        css={{
          backgroundImage: `url(${product?.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: "90%",
          borderRadius: "$md",
        }}
      ></Box>
      <Text
        css={{
          textAlign: "center",
          whiteSpace: "nowrap",
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {product?.title}
      </Text>
      <Text>Price: ${product?.price}</Text>
    </Box>
  );
};

export default ProductCard;
