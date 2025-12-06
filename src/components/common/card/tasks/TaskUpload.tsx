"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Button, Typography, Space, Modal } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined,
  FileOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { uploadApi } from "@/src/lib/api/upload";
import { Attachment } from "@/src/types/Index";
import UploadHelperHandlers from "@/src/components/common/containers/main/task/UploadHelperHandlers";
import { endpoints } from "@/src/lib/config/endpoints";

const { Text } = Typography;

interface TaskUploadProps {
  taskId: string;
  attachments: Attachment[];
  onUploadSuccess: () => void;
}

export default function TaskUpload({
  taskId,
  attachments,
  onUploadSuccess,
}: TaskUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    uploading,
    handleDelete,
    uploadProps,
    formatFileSize,
    handlePreview,
    isImage,
  } = UploadHelperHandlers({ taskId, onUploadSuccess, setPreviewImage });

  return (
    <div className="space-y-4 cursor-default">
      <div className="flex justify-between items-center">
        <Text strong>Attachments ({attachments.length})</Text>

        <Upload {...uploadProps}>
          <Button
            icon={<UploadOutlined />}
            loading={uploading}
            disabled={uploading}
          >
            Upload File
          </Button>
        </Upload>
      </div>

      <Space orientation="vertical" style={{ width: "100%" }}>
        {attachments.length === 0 && (
          <Text type="secondary">No attachments yet</Text>
        )}

        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div className="flex items-center gap-3">
              {isImage(attachment.mimetype) ? (
                <Image
                  width={18}
                  height={18}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${endpoints.main.uploads.preview(attachment)}`}
                  alt="Uploaded image"
                  className="!min-w-18 !min-h-18 object-cover rounded"
                />
              ) : (
                <FileOutlined className="text-2xl text-gray-400" />
              )}

              <div>
                <Text strong>{attachment.originalName}</Text>
                <br />
                <Text type="secondary" className="text-xs">
                  {formatFileSize(attachment.size)}
                </Text>
                <br />
                <Text type="secondary" className="text-xs">
                  {formatDistanceToNow(new Date(attachment.uploadedAt), {
                    addSuffix: true,
                  })}
                </Text>
              </div>
            </div>

            <Space>
              {isImage(attachment.mimetype) && (
                <Button
                  type="text"
                  icon={<EyeOutlined />}
                  onClick={() => handlePreview(attachment)}
                >
                  Preview
                </Button>
              )}

              <Button
                type="text"
                icon={<DownloadOutlined />}
                href={uploadApi.downloadFile(attachment.id)}
                target="_blank"
              >
                Download
              </Button>

              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() =>
                  handleDelete(attachment.id, attachment.originalName)
                }
              >
                Delete
              </Button>
            </Space>
          </div>
        ))}
      </Space>

      <Modal
        open={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage(null)}
        width={800}
      >
        {previewImage && (
          <Image
            width={40}
            height={40}
            src={previewImage}
            alt="Preview"
            className="!w-full !h-auto"
          />
        )}
      </Modal>
    </div>
  );
}
