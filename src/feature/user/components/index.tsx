import React, { useEffect } from "react";
import { Box } from "@sparrowengg/twigs-react";
import { Flex } from "@sparrowengg/twigs-react";
import { useGetProductList } from "../services";
import ProductCard from "../../../common/components/productCard/product-card";

const HomePage = () => {
  const { data: productData, isLoading } = useGetProductList();

  useEffect(() => {
    console.log(productData);
  }, [isLoading]);

  return (
    <Box>
      <Flex
        css={{
          margin: "$10",
          gap: "$5",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {productData &&
          productData.map((product) => <ProductCard product={product} />)}
      </Flex>
    </Box>
  );
};

export default HomePage;
