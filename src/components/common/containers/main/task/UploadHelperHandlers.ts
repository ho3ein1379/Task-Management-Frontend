import { Dispatch, SetStateAction, useState } from "react";
import { App, UploadProps } from "antd";
import { uploadApi } from "@/src/lib/api/upload";
import { Attachment } from "@/src/types/Index";
import { endpoints } from "@/src/lib/config/endpoints";

interface TaskUploadProps {
  taskId: string;
  onUploadSuccess: () => void;
  setPreviewImage: Dispatch<SetStateAction<string | null>>;
}

export default function UploadHelperHandlers({
  taskId,
  onUploadSuccess,
  setPreviewImage,
}: TaskUploadProps) {
  const { message, modal } = App.useApp();

  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      await uploadApi.uploadFile(taskId, file);
      message.success(`${file.name} uploaded successfully`);
      onUploadSuccess();
    } catch (error) {
      message.error(`${file.name} upload failed`);
      console.log("upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (attachmentId: string, filename: string) => {
    modal.confirm({
      title: "Delete Attachment",
      content: `Are you sure you want to delete "${filename}"?`,
      okText: "Yes, Delete",
      okType: "danger",
      onOk: async () => {
        try {
          await uploadApi.deleteAttachment(attachmentId);
          message.success("Attachment deleted");
          onUploadSuccess();
        } catch (error) {
          message.error("Failed to delete attachment");
          console.log("Failed to delete attachment", error);
        }
      },
    });
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("File must be smaller than 5MB!");
        return false;
      }
      handleUpload(file);
      return false;
    },
    showUploadList: false,
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const isImage = (mimetype: string) => mimetype.startsWith("image/");

  const handlePreview = (attachment: Attachment) => {
    if (isImage(attachment.mimetype)) {
      setPreviewImage(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoints.main.uploads.preview(attachment)}`,
      );
    }
  };

  return {
    uploading,
    handleDelete,
    uploadProps,
    formatFileSize,
    handlePreview,
    isImage,
  };
}
