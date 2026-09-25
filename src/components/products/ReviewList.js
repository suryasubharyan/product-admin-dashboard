import { StarIcon } from "@/components/ui/Icons";

const STARS = [1, 2, 3, 4, 5];

export default function ReviewList({ reviews = [] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">
        Customer reviews <span className="font-normal text-slate-500">({reviews.length})</span>
      </h2>

      {reviews.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
          No reviews yet.
        </p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {reviews.map((review, index) => (
            <li
              key={`${review.reviewerEmail}-${index}`}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                  {review.reviewerName?.charAt(0) ?? "?"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-900">{review.reviewerName}</p>
                  <p className="text-xs text-slate-400">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <div className="flex" aria-label={`${review.rating} out of 5 stars`}>
                  {STARS.map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating ? "text-amber-400" : "text-slate-200"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
