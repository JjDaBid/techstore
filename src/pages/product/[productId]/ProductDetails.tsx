/* eslint-disable @typescript-eslint/no-explicit-any */

import { Rating } from "@mui/material";
import SetColor from "../../../components/products/SetColor";
import { useState, useCallback, useEffect } from "react";
import SetQuantity from "../../../components/products/SetQuantity";
import Button from "../../../components/buttons/Button";
import ProductImage from "../../../components/products/ProductImage";
import ListRating from "./ListRating";
import { useCart } from "../../../hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: selectedImgType;
  quantity: number;
  price: number;
};

export type selectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30-%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const handleColorSelect = useCallback(
    (value: selectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  const productRating = product.reviews.reduce((acc: number, item: any) => 
        item.rating + acc, 0) / product.reviews.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />

      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reseñas</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORÍA: </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">MARCA: </span>
          {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "En stock" : "Sin stock"}
        </div>

        <Horizontal />

        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-cente gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Producto agregado al carro de compras</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="Ver Carro"
                outline
                onClick={() => navigate(`/cart`)}
              ></Button>
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQuantityIncrease={handleQuantityIncrease}
              handleQuantityDecrease={handleQuantityDecrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Agregar al carro"
                onClick={() => handleAddProductCart(cartProduct)}
              />
            </div>
          </>
        )}

        <div></div>
      </div>
      <div>
        <ListRating product={product} />
      </div>
    </div>
  );
};
export default ProductDetails;
