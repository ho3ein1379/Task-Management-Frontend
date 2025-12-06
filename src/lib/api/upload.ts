import { api } from "./axios";
import { endpoints } from "@/src/lib/config/endpoints";
import { Attachment } from "@/src/types/Index";

export const uploadApi = {
  uploadFile: async (taskId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<Attachment>(
      endpoints.main.uploads.upload_file(taskId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  getTaskAttachments: async (taskId: string) => {
    const response = await api.get<Attachment[]>(
      endpoints.main.uploads.get_task_attachments(taskId),
    );
    return response.data;
  },

  downloadFile: (attachmentId: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL}${endpoints.main.uploads.downloadFile(attachmentId)}`;
  },

  deleteAttachment: async (attachmentId: string) => {
    await api.delete(endpoints.main.uploads.deleteAttachment(attachmentId));
  },
};
