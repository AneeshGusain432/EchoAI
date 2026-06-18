import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-hot-toast";
import api from "../../utils/Axios";

export function useGoogleAuthMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (authCode) => {
      const response = await api.post("/api/v1/auth/google", {
        code: authCode,
      });
      return response.data;
    },
    onSuccess: (response) => {
      navigate({ to: "/dashboard" });
      toast.success(response?.message);
      localStorage.setItem("auth-user", JSON.stringify(response.data));
    },
    onError: () => {
      toast.error("Invalid credentials");
    },
  });
}

export function useGetme() {
  return useQuery({
    queryKey: ["getme"],
    queryFn: async () => {
      const response = await api.get("/api/v1/auth/get-me");
      return response.data;
    },
  });
}

export function useLogoutMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      await api.post("/api/v1/auth/logout");
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      localStorage.removeItem("auth-user");
      navigate({ to: "/" });
    },
    onError: (error) => {
      toast.error("Failed to logout user");
    },
  });
}
