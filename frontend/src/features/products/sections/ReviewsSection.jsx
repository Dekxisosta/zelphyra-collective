import { useMemo, useState } from "react";

const PAGE_SIZE = 5;

export default function Reviews({
  reviews = [],
  onAddReview,
}) {
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const sortedReviews = useMemo(() => {
    const arr = [...reviews];

    switch (sort) {
      case "highest":
        return arr.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return arr.sort((a, b) => a.rating - b.rating);
      default:
        return arr.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
    }
  }, [reviews, sort]);

  const visibleReviews = sortedReviews.slice(0, page * PAGE_SIZE);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return { star, count };
  });

  return (
    <div className="mt-10 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Customer Reviews</h2>

          <div className="text-sm text-gray-600 flex items-center gap-2">
            <Stars rating={averageRating} />
            <span>
              {averageRating.toFixed(1)} • {reviews.length} reviews
            </span>
          </div>
        </div>

        {/* SORT */}
        <select
          className="border rounded-lg px-2 py-1 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="highest">Highest rating</option>
          <option value="lowest">Lowest rating</option>
        </select>
      </div>

      {/* RATING DISTRIBUTION */}
      <div className="space-y-1">
        {ratingBreakdown.map((r) => (
          <div key={r.star} className="flex items-center gap-2 text-sm">
            <span className="w-10">{r.star}★</span>
            <div className="flex-1 h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-yellow-400 rounded"
                style={{
                  width: `${
                    reviews.length
                      ? (r.count / reviews.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
            <span className="w-8 text-right">{r.count}</span>
          </div>
        ))}
      </div>

      {/* ADD REVIEW */}
      <ReviewForm onAddReview={onAddReview} />

      {/* REVIEWS LIST */}
      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* LOAD MORE */}
      {visibleReviews.length < reviews.length && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="w-full py-2 border rounded-lg hover:bg-gray-50"
        >
          Load more
        </button>
      )}
    </div>
  );
}

/* ---------------- STAR DISPLAY ---------------- */

function Stars({ rating }) {
  const full = Math.round(rating);

  return (
    <span className="text-yellow-500 text-sm">
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

/* ---------------- REVIEW CARD ---------------- */

function ReviewCard({ review }) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="border rounded-xl p-4 space-y-2 bg-white">

      {/* USER */}
      <div className="flex justify-between items-center">
        <div className="font-medium flex items-center gap-2">
          {review.user}

          {review.verified && (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
              Verified
            </span>
          )}
        </div>

        <Stars rating={review.rating} />
      </div>

      {/* COMMENT */}
      <p className="text-gray-700">{review.comment}</p>

      {/* DATE */}
      <div className="text-xs text-gray-400">
        {new Date(review.date).toLocaleDateString()}
      </div>

      {/* REPLIES */}
      {review.replies?.length > 0 && (
        <div className="mt-3">
          <button
            className="text-sm text-blue-500"
            onClick={() => setShowReplies((s) => !s)}
          >
            {showReplies
              ? "Hide replies"
              : `View replies (${review.replies.length})`}
          </button>

          {showReplies && (
            <div className="mt-2 space-y-2 pl-4 border-l">
              {review.replies.map((r) => (
                <div key={r.id} className="text-sm">
                  <span className="font-medium">{r.user}: </span>
                  <span className="text-gray-600">{r.comment}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- REVIEW FORM ---------------- */

function ReviewForm({ onAddReview }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <div className="border rounded-xl p-4 space-y-3 bg-gray-50">
      <h3 className="font-semibold">Write a review</h3>

      {/* STARS INPUT */}
      <div className="flex gap-1 text-2xl cursor-pointer text-yellow-500">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} onClick={() => setRating(n)}>
            {n <= rating ? "★" : "☆"}
          </span>
        ))}
      </div>

      {/* TEXT */}
      <textarea
        className="w-full border rounded-lg p-2 text-sm"
        placeholder="Write your thoughts..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* SUBMIT */}
      <button
        onClick={() => {
          if (!comment.trim()) return;

          onAddReview?.({
            id: Date.now(),
            user: "You",
            rating,
            comment,
            date: new Date().toISOString(),
            verified: false,
            replies: [],
          });

          setComment("");
          setRating(5);
        }}
        className="px-4 py-2 bg-black text-white rounded-lg text-sm"
      >
        Submit Review
      </button>
    </div>
  );
}