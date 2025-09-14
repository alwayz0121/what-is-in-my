// import db from "~/db";
// import { storages } from "../storage/schema";
import { browserClient } from "~/supa-client";


export const getStorages = async () => {
    const {data, error} = await browserClient.from("storages").select("*");
    console.log(data, error);
    return data;
}