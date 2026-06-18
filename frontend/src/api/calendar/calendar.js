import { useQuery } from "@tanstack/react-query";
import api from "../../utils/Axios";

export function useGetCalendarEvents() {
  return useQuery({
    queryKey: ["calendar-events"],

    queryFn: async () => {
      const response = await api.get("/api/v1/calendar/events");

      return response.data;
    },
  });
}
