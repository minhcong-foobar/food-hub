"use client";

import { useEffect, useState } from "react";

type Review = {
  comment: string;
  rating: number;
  at: string;
};

export function ReviewCard({ foodId }: { foodId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(`/api/feedback?foodId=${foodId}`)
      .then((r) => r.json())
      .then(setReviews);
  }, [foodId]);

  return (
    <div className="flex flex-col gap-3">
      {reviews.map((r, i) => (
        <article
          key={i}
          className="rounded border p-3"
          dangerouslySetInnerHTML={{
            __html: `<strong>${r.rating}/5</strong> — ${r.comment} <em>(${r.at})</em>`,
          }}
        />
      ))}
    </div>
  );
}
