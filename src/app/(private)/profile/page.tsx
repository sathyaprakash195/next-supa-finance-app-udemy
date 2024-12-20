"use client";
import { getLoggedInUser } from "@/actions/users";
import Loader from "@/components/loader";
import { IUser } from "@/interfaces";
import { Button, message } from "antd";
import React, { useEffect } from "react";
import EditProfileModal from "./_components/edit-profile-modal";
import ChangePasswordModal from "./_components/change-password-modal";

function ProfilePage() {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showEditProfileModal, setShowEditProfileModal] = React.useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] =
    React.useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response: any = await getLoggedInUser();
      if (response.success) {
        setUser(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const renderUserProperty = (label: string, value: string) => {
    try {
      return (
        <div className="flex flex-col">
          <span className="text-xs uppercase text-gray-600">{label}</span>
          <span className="text-sm font-semibold">{value}</span>
        </div>
      );
    } catch (error) {
      return <> </>;
    }
  };

  if (loading) {
    return (
      <div className="h-40">
        <Loader />
      </div>
    );
  }

  let dummyProfilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div>
      <h1 className="text-xl font-bold">User Profile</h1>

      <div className="grid grid-cols-4 mt-5 gap-5">
        <div className="col-span-1 flex flex-col gap-5 justify-center items-center p-5 rounded-sm border border-gray-300">
          <img
            src={user?.profile.profile_pic || dummyProfilePic}
            alt=""
            className="w-32 h-32 rounded-full object-cover"
          />
          <h1 className="text-lg uppercase font-semibold">
            {user?.profile.name}
          </h1>
        </div>
        <div className="col-span-3 p-5 border border-gray-300 rounded-sm grid grid-cols-3">
          {renderUserProperty("ID", user?.id || "")}
          {renderUserProperty("Username", user?.profile.name || "")}
          {renderUserProperty("Email", user?.email || "")}
          {renderUserProperty("Created At", user?.created_at || "")}
          {renderUserProperty(
            "Email Verified At",
            user?.email_confirmed_at || ""
          )}
          {renderUserProperty("Updated At", user?.updated_at || "")}
        </div>
      </div>

      <div className="flex justify-end gap-5 mt-7">
        <Button type="primary" onClick={() => setShowEditProfileModal(true)}>
          Edit Profile
        </Button>
        <Button type="primary" onClick={() => setShowChangePasswordModal(true)}>
          Change Password
        </Button>
      </div>

      {showEditProfileModal && (
        <EditProfileModal
          showEditProfileModal={showEditProfileModal}
          setShowEditProfileModal={setShowEditProfileModal}
          user={user!}
          onSuccess={fetchUser}
        />
      )}

      {showChangePasswordModal && (
        <ChangePasswordModal
          showChangePasswordModal={showChangePasswordModal}
          setShowChangePasswordModal={setShowChangePasswordModal}
          user={user!}
        />
      )}
    </div>
  );
}

export default ProfilePage;
