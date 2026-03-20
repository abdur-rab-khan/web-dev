"use client";
import { useTransition } from "react";

// LIKE BUTTON COMPONENT
function LikeButton({
  postId,
  toggleLikeCount,
}: {
  postId: number;
  toggleLikeCount: (postId: number) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(async () => {
      try {
        await toggleLikeCount(postId);
      } catch (error) {
        alert(`Error updating like count: ${error}`);
      }
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleLike}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
    >
      {isPending ? "Updating..." : "Like"}
    </button>
  );
}

export default LikeButton;
