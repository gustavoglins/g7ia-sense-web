import { installationsApi } from "@/api/installations/installations.api";
import { useQuery } from "@tanstack/react-query";

export function useInstallations() {
  return useQuery({
    queryKey: ["installations"],
    queryFn: installationsApi.getAll,
  });
}
