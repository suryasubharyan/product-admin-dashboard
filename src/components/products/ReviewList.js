export default function ReviewList({ reviews = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">Reviews ({reviews.length})</h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((review, index) => (
            <li
              key={`${review.reviewerEmail}-${index}`}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">{review.reviewerName}</p>
                <span className="text-sm text-gray-600">★ {review.rating}</span>
              </div>
              <p className="mt-1 text-sm text-gray-700">{review.comment}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
