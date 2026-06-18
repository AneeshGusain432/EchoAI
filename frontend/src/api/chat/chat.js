import { useMutation } from "@tanstack/react-query";
import api from "../../utils/Axios";

export function useChatWithAgent() {
  return useMutation({
    mutationFn: async (prompt) => {
      const response = await api.post("/api/v1/chat/ask", { prompt });
      return response.data;
    },
  });
}
