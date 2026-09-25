"use client";

import { useRef, useState } from "react";
import FormField from "@/components/ui/FormField";
import { EMPTY_PRODUCT_FORM, validateProduct, toProductPayload } from "@/lib/productValidation";

const inputClass =
  "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function ProductForm({ initialValues = EMPTY_PRODUCT_FORM, categories, onSubmit, submitLabel }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submittingRef.current) return;

    const validationErrors = validateProduct(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await onSubmit(toProductPayload(values));
      // On success, keep the button disabled while the page navigates away.
    } catch (err) {
      setSubmitError(err.message);
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
      <FormField label="Title" htmlFor="title" error={errors.title}>
        <input id="title" name="title" value={values.title} onChange={handleChange} className={inputClass} />
      </FormField>

      <FormField label="Description" htmlFor="description" error={errors.description}>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange}
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Category" htmlFor="category" error={errors.category}>
          <select id="category" name="category" value={values.category} onChange={handleChange} className={inputClass}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Brand (optional)" htmlFor="brand">
          <input id="brand" name="brand" value={values.brand} onChange={handleChange} className={inputClass} />
        </FormField>

        <FormField label="Price ($)" htmlFor="price" error={errors.price}>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={values.price}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        <FormField label="Stock" htmlFor="stock" error={errors.stock}>
          <input
            id="stock"
            name="stock"
            type="number"
            step="1"
            min="0"
            value={values.stock}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>
      </div>

      {submitError && (
        <p role="alert" className="text-sm text-red-600">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
