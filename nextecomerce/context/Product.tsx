"use client";
import { createContext, useContext } from "react";
import toast from "react-hot-toast";

export interface IProduct {
  _id: any;
  createdAt: any;
  name: string;
  slug: string;
  updatedAt: any;
}

export type ProductContextType = {
  createProduct: (product: IProduct) => Promise<void>;
  updateProduct: (product: IProduct) => Promise<void>;
  deleteProduct: (id: any) => Promise<void>;
};

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const createProduct = async (product: IProduct) => {
    try {
      const response = await fetch(`${process.env.API}/admin/product`, {
        method: "POST",
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success(`Product "${data?.title}" created`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateProduct = async (product: IProduct) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/${product?._id}`,
        {
          method: "PUT",
          body: JSON.stringify(product),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        toast.success(`Product "${data?.title}" updated`);
        window.location.href = "/dashboard/admin/products";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id: any) => {
    try {
      const response = await fetch(`${process.env.API}/admin/product/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        toast.success(`Product "${data?.title}" deleted`);
        // router.back();
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
