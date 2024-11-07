"use client";
import { useEffect, useState } from "react";
import { useCategory, CategoryContextType } from "@/context/category";
import { useProduct, ProductContextType, IProduct } from "@/context/Product";
import { useParams } from "next/navigation";

export default function ProductCreate() {
  const { categories, fetchCategories } = useCategory() as CategoryContextType;
  const { createProduct, updateProduct, deleteProduct } =
    useProduct() as ProductContextType;
  const [formData, setFormData] = useState<IProduct | {}>();
  const params = useParams();
  const id = params.id;

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  const handleSave = (e: React.FormEvent, formData: IProduct | any) => {
    e.preventDefault();
    if (id) {
      updateProduct(formData);
    } else {
      createProduct(formData);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <form className="Form" onSubmit={(e) => handleSave(e, formData)}>
      <p className="lead">{id ? "Update" : "Create"} Product</p>

      <input
        type="text"
        placeholder="Title"
        onChange={handleForm}
        className="form-control p-2 my-2"
      />

      <textarea
        rows="5"
        className="form-control p-2 mb-2"
        placeholder="Description"
        onChange={handleForm}
      ></textarea>

      <input
        type="number"
        placeholder="Price"
        min="1"
        className="form-control p-2 mb-2"
        onChange={handleForm}
      />

      <div className="form-group">
        <select name="category" className="form-control p-2 mb-2">
          <option value="">Select Category</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id} name={c?.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button className={`btn btn-raised btn-${id ? "info" : "primary"}`}>
          {id ? "Update" : "Create"}
        </button>

        {id && (
          <>
            <button
              onClick={() => deleteProduct(id)}
              className="btn btn-danger btn-raised"
            >
              Delete
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-warning btn-raised"
            >
              Clear
            </button>
          </>
        )}
      </div>
    </form>
  );
}
