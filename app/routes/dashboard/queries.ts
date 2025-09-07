import db from "~/db";
import { storages } from "../storage/schema";


export const getStorages = async () => {
    const allStorages = await db.select({
        id: storages.id,
        name: storages.name,
        type: storages.type,
        room: storages.room,
        color_hex: storages.color_hex,
        photo_url: storages.photo_url,
        image_width: storages.image_width,
        image_height: storages.image_height,
        is_archived: storages.is_archived,
        created_at: storages.created_at,
        updated_at: storages.updated_at,
    }).from(storages);
    return allStorages;
}