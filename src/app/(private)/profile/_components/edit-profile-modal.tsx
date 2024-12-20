import { createClient } from "@/config/supabase-browser-config";
import { uploadFileAndGetUrl } from "@/helpers/storage-helpers";
import { IUser } from "@/interfaces";
import { Button, Input, message, Modal, Upload } from "antd";
import React from "react";

interface IEditProfileModalProps {
  showEditProfileModal: boolean;
  setShowEditProfileModal: (value: boolean) => void;
  user: IUser;
  onSuccess: () => void;
}

function EditProfileModal({
  showEditProfileModal,
  setShowEditProfileModal,
  user,
  onSuccess,
}: IEditProfileModalProps) {
  const [name, setName] = React.useState(user.profile.name);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSave = async () => {
    try {
      setLoading(true);
      let newProfilePicUrl = user.profile.profile_pic;
      if (selectedFile) {
        const response: any = await uploadFileAndGetUrl(selectedFile);
        if (!response.success) {
          throw new Error(response.message);
        }
        newProfilePicUrl = response.data;
      }

      const supabaseBrowserConfig = createClient();
      const { data, error } = await supabaseBrowserConfig
        .from("user_profiles")
        .update({
          name,
          profile_pic: newProfilePicUrl,
        })
        .eq("id", user.id);

      if (error) throw new Error(error.message);
      message.success("Profile updated successfully");
      setShowEditProfileModal(false);
      onSuccess();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showEditProfileModal}
      onCancel={() => setShowEditProfileModal(false)}
      title="Edit Profile"
      centered
      footer
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="Name">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Profile Picture">Profile Picture</label>
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setSelectedFile(file);
              return false;
            }}
            onRemove={() => {
              setSelectedFile(null);
            }}
          >
            <span className="text-gray-500 text-xs">
              Click to upload profile picture
            </span>
          </Upload>
        </div>

        <div className="flex justify-end gap-5">
          <Button onClick={() => setShowEditProfileModal(false)}>Cancel</Button>
          <Button
            type="primary"
            disabled={!name || !selectedFile}
            loading={loading}
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
