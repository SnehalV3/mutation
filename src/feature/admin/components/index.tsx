import { useEffect } from "react";
import { useGetProductList } from "../../user/services";
import {
  Box,
  Button,
  Dialog,
  DialogTrigger,
  Flex,
} from "@sparrowengg/twigs-react";
import ProductCard from "../../../common/components/productCard/product-card";
import AddEditProductModal from "../../../common/components/add-edit-product-modal";

const Admin = () => {
  const { data: productData, isLoading } = useGetProductList();

  useEffect(() => {
    console.log(productData);
  }, [isLoading]);

  return (
    <Box>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="md"
            css={{
              margin: "$10",
            }}
          >
            Add Product
          </Button>
        </DialogTrigger>
        <AddEditProductModal isEdit={false} />
      </Dialog>
      <Flex
        css={{
          margin: "$10",
          gap: "$5",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {productData &&
          productData.map((product:any) => (
            <ProductCard product={product} isAdmin={true} />
          ))}
      </Flex>
    </Box>
  );
};

export default Admin;
