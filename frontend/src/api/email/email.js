import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import api from "../../utils/Axios";

export function useGetEmails(tab = "all", maxResults = 20) {
  return useInfiniteQuery({
    queryKey: ["emails", tab],
    queryFn: async ({ pageParam }) => {
      const response = await api.get(
        `/api/v1/email/get?tab=${tab}&maxResults=${maxResults}`,
        {
          params: {
            pageToken: pageParam,
          },
        },
      );
      return response.data;
    },

    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.data?.nextPageToken ?? undefined;
    },
  });
}

export function useGetUnreadEmailCount() {
  return useQuery({
    queryKey: ["email-counts"],
    queryFn: async () => {
      const response = await api.get("/api/v1/dashboard/get-unread-mail");
      return response.data;
    },
  });
}

export function useGetSingleEmail(emailId) {
  return useQuery({
    queryKey: ["single-email", emailId],

    queryFn: async () => {
      const response = await api.get(`/api/v1/email/${emailId}`);

      return response.data;
    },

    enabled: !!emailId,
  });
}

export function useSendEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/api/v1/email/send", data);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["emails"],
      });

      toast.success("Email sent successfully");
    },
    onError: () => {
      toast.error("Unable to send email");
    },
  });
}

export function useReplyEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/api/v1/email/reply", data);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["emails"],
      });
      toast.success("Reply sent successfully");
    },
    onError: () => {
      toast.error("Failed to send reply");
    },
  });
}

export function useForwardEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/api/v1/email/forward", data);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["emails"],
      });
      toast.success("Email forwarded successfully");
    },
    onError: () => {
      toast.error("Failed to forward email");
    },
  });
}

export function useStarEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (emailId) => {
      const response = await api.patch(`/api/v1/email/${emailId}/star`);

      return response.data;
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["emails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["single-email", id],
      });

      toast.success("Email added to starred");
    },
    onError: () => {
      toast.error("Failed to star email");
    },
  });
}

export function useUnstarEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (emailId) => {
      const response = await api.patch(`/api/v1/email/${emailId}/unstar`);

      return response.data;
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["emails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["single-email", id],
      });
      toast.success("Email removed from starred");
    },
    onError: () => {
      toast.error("Failed to remove star");
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (emailId) => {
      const response = await api.patch(`/api/v1/email/${emailId}/read`);

      return response.data;
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["emails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["single-email", id],
      });
    },
  });
}

export function useMarkAsUnread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (emailId) => {
      const response = await api.patch(`/api/v1/email/${emailId}/unread`);

      return response.data;
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["emails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["single-email", id],
      });
      toast.success("Marked as unread");
    },

    onError: () => {
      toast.error("Failed to mark email as unread");
    },
  });
}

export function useArchiveEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (emailId) => {
      const response = await api.patch(`/api/v1/email/${emailId}/archive`);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["emails"],
      });
      toast.success("Email archived");
    },
    onError: () => {
      toast.error("Failed to archive email");
    },
  });
}

export function useTrashEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (emailId) => {
      const response = await api.patch(`/api/v1/email/${emailId}/trash`);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["emails"],
      });
      toast.success("Email moved to trash");
    },
    onError: () => {
      toast.error("Failed to move email to trash");
    },
  });
}
