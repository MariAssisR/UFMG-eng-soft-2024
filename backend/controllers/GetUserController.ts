import { UserModel } from "../models/User";

export async function GetUserController(params: {id?: string}) {
    const { id } = params;

    if(!id) throw new Error("Missing user id");

    const user = await UserModel.find({uid: id});
    return user;
}

