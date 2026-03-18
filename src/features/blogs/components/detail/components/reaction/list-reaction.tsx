"use client";

import { toastNVB } from "@/components/base-components/toast";
import { createReaction } from "@/services/blog/reaction/api";
import { Reaction } from "@/services/blog/type";
import { RootState } from "@/stores";
import { getAnonymousId, setAnonymousId } from "@/utilities/cookies";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactionItem } from "./reaction-item";

const REACT_TYPE = ["Like", "Love", "Angry", "Lovely", "Haha", "Sad", "Wow"];

type ReactionType = {
  id: number;
  type: string;
  reaction: any;
};

export const ArticleListReaction = ({
  entryId,
  slug,
  listReactionBlog,
  listReaction,
  onReactionChange,
}: {
  entryId: string;
  slug: string;
  listReactionBlog: Reaction[];
  listReaction: ReactionType[];
  onReactionChange: () => void;
}) => {
  // redux
  const { user } = useSelector((state: RootState) => state.users_data);

  // state
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [listReactionFromApi, setListReactionFromApi] =
    useState(listReactionBlog);
  const [reactionCounts, setReactionCounts] = useState(() => {
    return REACT_TYPE.reduce(
      (acc, type) => {
        acc[type] = listReactionFromApi?.filter(
          (rc) => rc.type === type
        ).length;
        return acc;
      },
      {} as Record<string, number>
    );
  });

  // Logic
  const handleSelectReaction = useCallback(
    async (reaction: ReactionType) => {
      const previousSelected = selectedReaction;
      const previousCounts = { ...reactionCounts };
      // Optimistically update UI
      setReactionCounts((prevCounts) => {
        const updatedCounts = { ...prevCounts };
        if (selectedReaction && selectedReaction !== reaction.type) {
          updatedCounts[selectedReaction] = Math.max(
            0,
            (updatedCounts[selectedReaction] || 1) - 1
          );
        }
        updatedCounts[reaction.type] = (updatedCounts[reaction.type] || 0) + 1;
        return updatedCounts;
      });
      setSelectedReaction(reaction.type);

      const anonymousId = getAnonymousId() || String(Date.now());

      const metadata = {
        user_id: user?.id || anonymousId,
        first_name: user?.first_name || "Anonymous",
        last_name: user?.last_name || "",
        avatar:
          user?.avatar ||
          "https://framerusercontent.com/images/yC2S2Q7IpJCCGVZMDfLI.jpg",
      };

      try {
        if (!user?.id && !getAnonymousId()) {
          setAnonymousId(anonymousId);
          console.log("Anonymous ID added to cookies.");
        }

        console.log(metadata);
        console.log(entryId);
        console.log(reaction.id);

        await createReaction({
          entry_id: Number(entryId),
          reaction_id: Number(reaction.id),
          metadata: metadata,
        });

        onReactionChange?.();
        // ToastSuccess({
        //   msg: "Thích bài viết thành công",
        // });
      } catch (error) {
        // Rollback on error
        setReactionCounts(previousCounts);
        setSelectedReaction(previousSelected);
        toastNVB({
          msg: "Có lỗi xảy ra, vui lòng thử lại sau",
          type: "error",
        });
      }
    },
    [entryId, selectedReaction, reactionCounts, onReactionChange]
  );

  // Update counts when API data changes
  useEffect(() => {
    setReactionCounts(
      REACT_TYPE.reduce(
        (acc, type) => {
          acc[type] = listReactionFromApi.filter(
            (rc) => rc.type === type
          ).length;
          return acc;
        },
        {} as Record<string, number>
      )
    );
  }, [listReactionFromApi]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center flex-wrap items-center gap-6">
        {listReaction?.map((reaction: ReactionType, index: number) => (
          <ReactionItem
            key={index}
            reaction={reaction}
            typeReaction={selectedReaction === reaction.type}
            reactionCount={reactionCounts[reaction.type] || 0}
            onClick={() => handleSelectReaction(reaction)}
          />
        ))}
      </div>
    </div>
  );
};
