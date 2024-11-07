"use client";
import { useEffect } from "react";
import { useCategory, CategoryContextType } from "@/context/category";

export default function CategoryList() {
  const { fetchCategories, categories, setUpdatingCategory } =
    useCategory() as CategoryContextType;

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="my-5">
      {categories?.map((c) => (
        <button className="btn" onClick={() => setUpdatingCategory(c)}>
          {c.name}
        </button>
      ))}
    </div>
  );
}
