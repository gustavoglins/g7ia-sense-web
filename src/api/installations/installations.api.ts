import { CreateInstallation, Installation } from "@/types/installations.type";
import { apiClient } from "../client";

export const installationsApi = {
  getAll() {
    return apiClient<Installation[]>("/installations");
  },

  getById(id: string) {
    return apiClient<Installation>(`/installations/${id}`);
  },

  create(data: CreateInstallation) {
    return apiClient<Installation>("/installations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id: string, data: Partial<CreateInstallation>) {
    return apiClient<Installation>(`/installations/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete(id: string) {
    return apiClient<void>(`/installations/${id}`, {
      method: "DELETE",
    });
  },
};
