import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateCabin } from "../../services/apiCabins";

function useCreateUpdateCabin(isUpdateSession) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      toast.success(
        isUpdateSession
          ? "Cabin successfully edited"
          : "New cabin successfully created"
      );
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return [mutate, isPending];
}

export default useCreateUpdateCabin;
