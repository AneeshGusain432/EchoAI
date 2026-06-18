import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import api from "../../utils/Axios";

export function useConnectEmail() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.get("/api/v1/corsair/connect-email");
      return response.data;
    },

    onSuccess: (data) => {
      window.location.href = data.data.url;
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}
