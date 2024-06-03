import { ProfileModel } from "../models/Profile";

export async function RemoveProfileController(params: {id?: string}) {
    const { id } = params;

    if(!id) throw new Error("Missing profile id");

    const deletedTask = await ProfileModel.deleteOne({ _id: id });

    if(!deletedTask) throw new Error("Unknown task"); 

    return deletedTask;
};