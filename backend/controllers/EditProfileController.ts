import { ProfileModel } from "../models/Profile";

interface IProfile {
    id: string;
    uid: string;
    name: string;
    photo?: string;
    kids: boolean;
}

export async function EditProfileController(body : IProfile) {

    const {name, uid, id, photo, kids} = body;

    if(!uid || !id) throw new Error("Missing profile info");
    if(!(name || photo || kids)) throw new Error("Missing profile fields");

    // Find the profile by uid
    const profile = await ProfileModel.findOne({ _id: id });

    if (!profile) {
        throw new Error('Profile not found');
    }

    // Update the profile with the new data
    profile.name = name;
    profile.photo = photo ?? profile.photo;
    profile.kids = kids;

    // Save the updated profile
    await profile.save();

    return profile

}