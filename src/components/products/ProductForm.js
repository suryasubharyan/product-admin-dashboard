"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import FormField from "@/components/ui/FormField";
import ProductPreview from "./ProductPreview";
import { AlertIcon } from "@/components/ui/Icons";
import {
  inputClass,
  inputErrorClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/ui/styles";
import { EMPTY_PRODUCT_FORM, validateProduct, toProductPayload } from "@/lib/productValidation";

const TITLE_MAX = 100;

function fieldClass(error) {
  return error ? inputErrorClass : inputClass;
}

function Section({ title, description, children }) {
  return (
    <section className="space-y-5 p-6">
      <div>
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function ProductForm({
  initialValues = EMPTY_PRODUCT_FORM,
  categories,
  onSubmit,
  submitLabel,
  cancelHref,
  thumbnail,
}) {
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
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <Section title="Basic details" description="What the product is and where it belongs.">
          <FormField label="Title" htmlFor="title" error={errors.title}>
            <input
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              maxLength={TITLE_MAX}
              placeholder="e.g. Wireless Earbuds"
              aria-invalid={Boolean(errors.title)}
              className={fieldClass(errors.title)}
            />
            <p className="mt-1.5 text-right text-xs text-slate-400">
              {values.title.length}/{TITLE_MAX}
            </p>
          </FormField>

          <FormField label="Description" htmlFor="description" error={errors.description}>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={values.description}
              onChange={handleChange}
              placeholder="A couple of lines about what it is and who it is for."
              aria-invalid={Boolean(errors.description)}
              className={fieldClass(errors.description)}
            />
            {!errors.description && (
              <p className="mt-1.5 text-xs text-slate-400">At least 10 characters.</p>
            )}
          </FormField>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Category" htmlFor="category" error={errors.category}>
              <select
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                aria-invalid={Boolean(errors.category)}
                className={fieldClass(errors.category)}
              >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Brand" htmlFor="brand">
              <input
                id="brand"
                name="brand"
                value={values.brand}
                onChange={handleChange}
                placeholder="Optional"
                className={inputClass}
              />
            </FormField>
          </div>
        </Section>

        <Section title="Price and stock" description="What customers pay and how many you have.">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Price" htmlFor="price" error={errors.price}>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  $
                </span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={values.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  aria-invalid={Boolean(errors.price)}
                  className={`${fieldClass(errors.price)} pl-7`}
                />
              </div>
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
                placeholder="0"
                aria-invalid={Boolean(errors.stock)}
                className={fieldClass(errors.stock)}
              />
              {!errors.stock && (
                <p className="mt-1.5 text-xs text-slate-400">Use 0 when the item is sold out.</p>
              )}
            </FormField>
          </div>

          {submitError && (
            <p
              role="alert"
              className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              <AlertIcon className="h-4 w-4 shrink-0" />
              {submitError}
            </p>
          )}
        </Section>

        <div className="flex items-center justify-end gap-3 rounded-b-xl bg-slate-50/60 px-6 py-4">
          {cancelHref && (
            <Link href={cancelHref} className={secondaryButtonClass}>
              Cancel
            </Link>
          )}
          <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
            {isSubmitting ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>

      <div className="lg:sticky lg:top-24">
        <ProductPreview values={values} thumbnail={thumbnail} />
      </div>
    </div>
  );
}
