import { UserModel } from "../models/User";

interface IUser {
    uid: string;
    name: string;
}

export async function AddUserController(body : IUser) {
    
    const {uid, name} = body;

    if(!uid || !name) throw new Error("Missing task fields");

    const newUser = new UserModel({uid, name});
    await newUser.save();
    return newUser;
}