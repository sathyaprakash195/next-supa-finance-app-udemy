import { createClient } from "@/config/supabase-browser-config";
import { IUser } from "@/interfaces";
import { Button, Input, message, Modal } from "antd";
import React from "react";

interface ChangePasswordModalProps {
  showChangePasswordModal: boolean;
  setShowChangePasswordModal: (value: boolean) => void;
  user: IUser;
}

function ChangePasswordModal({
  showChangePasswordModal,
  setShowChangePasswordModal,
  user,
}: ChangePasswordModalProps) {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSave = async () => {
    try {
      setLoading(true);
      const supabaseBrowserConfig = createClient();
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const { error } = await supabaseBrowserConfig.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw new Error(error.message);
      }
      message.success("Password updated successfully");
      setShowChangePasswordModal(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="CHANGE PASSWORD"
      open={showChangePasswordModal}
      onCancel={() => setShowChangePasswordModal(false)}
      centered
      footer={null}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="newPassword" className="text-sm">
            New Password
          </label>
          <Input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </label>
          <Input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        <div className="flex justify-end gap-5">
          <Button
            onClick={() => setShowChangePasswordModal(false)}
            type="default"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            loading={loading}
            onClick={onSave}
            disabled={!newPassword || !confirmPassword}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ChangePasswordModal;
