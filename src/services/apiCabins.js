import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createUpdateCabin(newCabin) {
  // try {
  const { id } = newCabin;
  const hasPrevImgPath = typeof newCabin.image === "string";

  const imageName =
    hasPrevImgPath ||
    `${Math.random()}-${newCabin.image.name.replace("/", "")}`;

  const imagePath = hasPrevImgPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  else query = query.insert([{ ...newCabin, image: imagePath }]);

  const { data, error } = await query.select();

  const operationType = id ? "edit" : "create";

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be ${operationType}d`);
  }

  if (hasPrevImgPath) return data;

  // 2. upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    // delete the cabin if there was an error uploading image
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error);
    throw new Error(
      `Image could not be uploaded, hence cabin is not ${operationType}d`
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
