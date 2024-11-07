import CategoryList from "@/components/category/CategoryList";
import CategoryCreate from "@/components/category/CategoryCreate";
export default function AdminCategory() {
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col">
          <CategoryCreate />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="lead">List of Categories</p>
          <CategoryList />
        </div>
      </div>
    </div>
  );
}
