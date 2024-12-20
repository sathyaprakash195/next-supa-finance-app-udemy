import supabaseDBConfig from "@/config/supabase-db-config";

export const uploadFileAndGetUrl = async (file: File) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `public/${fileName}`;
    const { data, error } = await supabaseDBConfig.storage
      .from("basic")
      .upload(fileName, file);
    if (error) throw new Error(error.message);

    // get the file url after uploading
    const downloadUrlResponse = await supabaseDBConfig.storage
      .from("basic")
      .getPublicUrl(fileName);
    return {
      success: true,
      data: downloadUrlResponse.data.publicUrl,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
