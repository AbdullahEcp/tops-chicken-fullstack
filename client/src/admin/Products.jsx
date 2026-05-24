import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaPlus,
  FaSave,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const loadProducts = async () => {
    const res = await fetch(`${API}/api/products/admin/all`);
    const data = await res.json();

    if (data.success) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setForm({
      name: "",
      category: "",
      price: "",
      description: "",
      imageUrl: "",
    });
  };

  const submitProduct = async (e) => {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";

      const url = editingId
        ? `${API}/api/products/${editingId}`
        : `${API}/api/products`;

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("imageUrl", form.imageUrl);

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        resetForm();
        loadProducts();
      } else {
        alert(data.message || "Save failed");
      }
    } catch {
      alert("Server error");
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      imageUrl: product.image,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleAvailability = async (id, current) => {
    const res = await fetch(`${API}/api/products/availability/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isAvailable: !current,
      }),
    });

    const data = await res.json();

    if (data.success) {
      loadProducts();
    } else {
      alert(data.message || "Update failed");
    }
  };

  return (
    <div>
      <div className="rounded-[40px] bg-gradient-to-r from-black via-red-950 to-red-700 p-8 text-white shadow-2xl">
        <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
          Product Management
        </p>

        <h1 className="mt-3 text-5xl font-black">
          Restaurant Menu Control
        </h1>

        <p className="mt-3 max-w-3xl font-semibold text-gray-200">
          Add, edit and manage menu products safely without deleting your
          restaurant menu.
        </p>
      </div>

      <div className="mt-8 rounded-[40px] bg-white p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-700 text-3xl text-yellow-300">
            {editingId ? <FaSave /> : <FaPlus />}
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[3px] text-red-700">
              {editingId ? "Edit Product" : "Add Product"}
            </p>

            <h2 className="text-3xl font-black">
              {editingId
                ? "Update Restaurant Item"
                : "Create New Menu Item"}
            </h2>
          </div>
        </div>

        <form
          onSubmit={submitProduct}
          className="mt-8 grid gap-5 lg:grid-cols-2"
        >
          <Input
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Example: Zinger Burger"
          />

          <Input
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Burger / Pizza / Wrap"
          />

          <Input
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="£9.99"
          />

          <Input
            label="Image URL"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://image-url.com/item.jpg"
          />

          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-black text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Write product description..."
              className="w-full rounded-3xl border-2 border-gray-100 bg-gray-50 p-5 font-bold outline-none focus:border-red-700"
            ></textarea>
          </div>

          <div className="flex flex-wrap gap-3 lg:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-red-700 px-8 py-4 font-black text-white hover:bg-black"
            >
              {editingId ? "Update Product" : "Add Product"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full bg-gray-200 px-8 py-4 font-black text-black"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {products.length === 0 ? (
          <div className="rounded-[34px] bg-white p-10 text-center shadow-xl">
            <h2 className="text-3xl font-black">No Products Found</h2>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="overflow-hidden rounded-[36px] bg-white shadow-2xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[3px] text-red-700">
                      {product.category}
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                      {product.name}
                    </h2>
                  </div>

                  <div
                    className={`rounded-full px-5 py-3 text-sm font-black ${
                      product.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.isAvailable ? "Available" : "Unavailable"}
                  </div>
                </div>

                <p className="mt-4 font-semibold leading-7 text-gray-600">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <h3 className="text-4xl font-black text-red-700">
                    {product.price}
                  </h3>

                  <div className="flex gap-3">
                    <button
                      onClick={() => editProduct(product)}
                      className="rounded-full bg-yellow-400 px-5 py-3 font-black text-black hover:bg-black hover:text-white"
                    >
                      <FaEdit className="inline" /> Edit
                    </button>

                    <button
                      onClick={() =>
                        toggleAvailability(
                          product._id,
                          product.isAvailable
                        )
                      }
                      className={`rounded-full px-5 py-3 font-black text-white ${
                        product.isAvailable
                          ? "bg-red-700"
                          : "bg-green-700"
                      }`}
                    >
                      {product.isAvailable ? (
                        <>
                          <FaTimesCircle className="inline" /> Disable
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="inline" /> Enable
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-gray-700">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-3xl border-2 border-gray-100 bg-gray-50 p-5 font-bold outline-none focus:border-red-700"
      />
    </div>
  );
}