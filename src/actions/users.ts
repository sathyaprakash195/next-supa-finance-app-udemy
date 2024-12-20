"use server";

import { createClient } from "@/config/supabase-server-config";

export const resetUserPassword = async (code = "", password = "") => {
  try {
    const supabaseServerConfig = await createClient();

    // get the temporary user session using the code
    const { data, error } =
      await supabaseServerConfig.auth.exchangeCodeForSession(code);
    if (error) throw new Error(error.message);

    // then update the user password
    const { error: updateError } = await supabaseServerConfig.auth.updateUser({
      password,
    });
    if (updateError) throw new Error(updateError.message);

    return {
      success: true,
      message: "Password reset successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getLoggedInUser = async () => {
  try {
    const supabaseServerConfig = await createClient();
    const authResponse = await supabaseServerConfig.auth.getUser();
    if (authResponse.error) throw new Error(authResponse.error.message);

    const userProfileResponse = await supabaseServerConfig
      .from("user_profiles")
      .select("*")
      .eq("id", authResponse.data.user.id)
      .single();

    if (userProfileResponse.error)
      throw new Error(userProfileResponse.error.message);

    const user = {
      ...authResponse.data.user,
      profile: userProfileResponse.data,
    };

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
