import { createCartApi } from "@/services/cart";
import { useMutation } from "@tanstack/react-query";

const useCartMutation = () => {
  const createCartMutation = useMutation({
    mutationFn: (email: string) => createCartApi(email),
  });
  return { createCartMutation };
};

export default useCartMutation;
