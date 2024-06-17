import {
  Box,
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Flex,
  FormLabel,
  IconButton,
  Input,
  Textarea,
  toast,
} from "@sparrowengg/twigs-react";
import { CloseIcon } from "@sparrowengg/twigs-react-icons";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  addSingleProduct,
  updateSingleProduct,
} from "../../feature/admin/services";
import { useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";

const AddEditProductModal = ({
  isEdit,
  product,
}: {
  isEdit: boolean;
  product?: any;
}) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (isEdit && product) {
      setFormData({
        title: product?.title || "",
        price: product?.price || "",
        category: product?.category || "",
        description: product?.description || "",
        image: product?.image || "",
      });
    }
  }, [isEdit, product]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const updateSingleProductMutation = useMutation({
    mutationFn: updateSingleProduct,
    onMutate: (data) => {
      toast({
        variant: "success",
        title: "Product updated",
        description: "Product updated Successfully",
      });
      const previousData:any = queryClient.getQueryData(['productData'])
      queryClient.setQueryData(['productData'],(previousData:any)=>{
        const updatedData = previousData.map((item:any) =>
          item.id === data.id ? { ...item, ...data.product } : item
        );
        return updatedData;
      })
        return {previousData};
    },
    onError: (err,_,context) => {
      toast({
        variant: "error",
        title: "Error in updation",
        description: "There was a problem in updating product.",
      });

      queryClient.setQueryData(['productData'],context?.previousData)
    },
  });

  const addSingleProductMutation = useMutation({
    mutationFn: addSingleProduct,
    onMutate: (data) => {
      toast({
        variant: "success",
        title: "Product deleted",
        description: "Product deleted Successfully",
      });
      const previousData = (queryClient.getQueryData(["productData"]));
      const newData = { ...data, id: nanoid(10) };
      console.log({ previousData, newData });
      queryClient.setQueryData(['productData'], (previousData) => {
        return [data, ...(previousData as any)];
      });      
    },
    onError: () => {
      toast({
        variant: "error",
        title: "Error in deletion",
        description: "There was a problem in deleting product.",
      });
    },
  });

  const handleForm = (isEdit: boolean) => {
    isEdit ? console.log(formData, product?.id) : console.log(formData);
    isEdit
      ? updateSingleProductMutation.mutate({
          id: product?.id,
          product: formData,
        })
      : addSingleProductMutation.mutate(formData);
  };

  return (
    <DialogContent>
      <DialogTitle>{isEdit ? "Edit" : "Add"} Product</DialogTitle>
      <DialogDescription
        css={{
          color: "$neutral600",
          fontSize: "$sm",
        }}
      >
        {isEdit
          ? "Change the details of the product"
          : "Add the details of the products"}
      </DialogDescription>
      <Box
        css={{
          marginBottom: "$12",
        }}
      >
        <FormLabel
          css={{
            marginBottom: "$8",
          }}
        >
          Title
        </FormLabel>
        <Input
          css={{
            boxSizing: "border-box",
          }}
          placeholder="Mens Shirt"
          id="title"
          size="md"
          value={formData.title}
          onChange={handleInputChange}

          // defaultValue={product?.title}
        />
      </Box>
      <Box
        css={{
          marginBottom: "$12",
        }}
      >
        <FormLabel
          css={{
            marginBottom: "$8",
          }}
        >
          Price
        </FormLabel>
        <Input
          css={{
            boxSizing: "border-box",
          }}
          placeholder="$ 50"
          id="price"
          size="md"
          value={formData.price}
          onChange={handleInputChange}

          // defaultValue={product?.price}
        />
      </Box>
      <Box
        css={{
          marginBottom: "$12",
        }}
      >
        <FormLabel
          css={{
            marginBottom: "$8",
          }}
        >
          Category
        </FormLabel>
        <Input
          css={{
            boxSizing: "border-box",
          }}
          placeholder="Mens Clothing"
          id="category"
          size="md"
          value={formData.category}
          onChange={handleInputChange}

          // defaultValue={product?.category}
        />
      </Box>
      <Box
        css={{
          marginBottom: "$12",
        }}
      >
        <FormLabel
          css={{
            marginBottom: "$8",
          }}
        >
          Image
        </FormLabel>
        <Input
          css={{
            boxSizing: "border-box",
          }}
          placeholder="Image Url"
          id="image"
          size="md"
          value={formData.image}
          onChange={handleInputChange}

          // defaultValue={product?.category}
        />
      </Box>
      <Box
        css={{
          marginBottom: "$12",
        }}
      >
        <FormLabel
          css={{
            marginBottom: "$8",
          }}
        >
          Description
        </FormLabel>
        <Textarea
          rows="8"
          value={formData.description}
          onChange={handleInputChange}
          id="description"
          // defaultValue={product?.description}
          placeholder="Enter your description"
        />
      </Box>
      <Flex
        css={{
          justifyContent: "flex-end",
        }}
        justifyContent="flex-end"
      >
        <DialogClose asChild>
          <Button
            color="primary"
            type="submit"
            onClick={() => handleForm(isEdit)}
            size="md"
          >
            {isEdit ? "Save Changes" : "Add Product"}
          </Button>
        </DialogClose>
      </Flex>
      <Box
        css={{
          position: "absolute",
          right: "10px",
          top: "10px",
        }}
      >
        <DialogClose asChild>
          <IconButton aria-label="Close" color="default" icon={<CloseIcon />} />
        </DialogClose>
      </Box>
    </DialogContent>
  );
};

export default AddEditProductModal;
