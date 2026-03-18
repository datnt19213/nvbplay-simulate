import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGhostReaction, deleteGhostReaction } from "@/services/ghost";
export const useReaction = () => {
  const queryClient = useQueryClient();
  const createReaction = useMutation({
    mutationFn: (data: { post_id: string; user_id: string }) => {
      const params = {
        post_id: data.post_id,
        user_id: data.user_id,
      };
      return createGhostReaction(params);
    },
    onSuccess: (res) => {
      queryClient.refetchQueries({ queryKey: ["ghost-posts"] });
      queryClient.refetchQueries({ queryKey: ["ghost-post-detail"] });
      return res;
    },
    onError: (error) => {
      return error;
    },
  });

  const deleteReaction = useMutation({
    mutationFn: (data: { post_id: string; user_id: string }) => {
      const params = {
        post_id: data.post_id,
        user_id: data.user_id,
      };
      return deleteGhostReaction(params);
    },
    onSuccess: (res) => {
      queryClient.refetchQueries({ queryKey: ["ghost-posts"] });
      queryClient.refetchQueries({ queryKey: ["ghost-post-detail"] });
      return res;
    },
    onError: (error) => {
      return error;
    },
  });

  return { createReaction, deleteReaction };
};
