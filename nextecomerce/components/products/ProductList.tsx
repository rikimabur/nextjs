"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Pagination from "@/components/products/Pagination";
import Image from "next/image";
export default function ProductList() {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const fetchProducts = async (page: number) => {
    try {
      const response = await fetch(`${process.env.API}/product?page=${page}`, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.err);
      } else {
        setProducts(data?.products);
        setCurrentPage(data?.currentPage);
        setTotalPages(data?.totalPages);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProducts(page | 1);
  }, [page]);

  const handleClick = (product: any) => {
    if (product?.slug) {
      router.push("/dashboard/admin/product");
    } else {
      toast.error("The product could not found!");
    }
  };

  return (
    <div className="container my-5">
      <div className="row gx-3">
        {/* <pre>{JSON.stringify(products, null, 4)}</pre> */}
        {products?.map((product) => (
          <div key={product?._id} className="col-lg-6 my-3">
            <div style={{ height: "200px", overflow: "hidden" }}>
              <Image
                src={product?.images[0]?.secure_url || "/images/default.jpeg"}
                alt={product?.title}
                width={500}
                height={300}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
            <div className="card-body">
              <h5
                className="card-title pointer"
                onClick={() => handleClick(product)}
              >
                ${product?.price?.toFixed(2)} {product?.title}
              </h5>

              <p className="card-text">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      product?.description?.length > 160
                        ? `${product?.description?.substring(0, 160)}..`
                        : product?.description,
                  }}
                />
              </p>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pathname={pathname}
      />
    </div>
  );
}
