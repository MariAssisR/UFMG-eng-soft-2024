import express, { Request, Response} from "express";

import { AddUserController } from "./controllers/AddUserController";
import { GetUserController } from "./controllers/GetUserController";

import { AddProfileController } from "./controllers/AddProfileController";
import { GetProfileController } from "./controllers/GetProfileController";
import { EditProfileController } from "./controllers/EditProfileController";
import { RemoveProfileController } from "./controllers/RemoveProfileController";

const router = express.Router()

router.get('/users/:id', async (req : Request, res : Response) => {
    try {
        const users = await GetUserController(req.params);
        return res.status(200).send(users);
    } catch(error) {
        return res.status(400);
    }
})

router.post('/users/new', async (req : Request, res : Response) => {
    try {
        const newUser = await AddUserController(req.body);
        return res.status(201).send(newUser);
    } catch(error) {
        return res.status(404).send(error);
    }
})

router.post('/profiles/', async (req : Request, res : Response) => {
    try {
        const profiles = await GetProfileController(req.body);
        return res.status(200).send(profiles);
    } catch(error) {
        return res.status(400);
    }
})

router.post('/profiles/new', async (req : Request, res : Response) => {
    try {
        const newProfile = await AddProfileController(req.body);
        return res.status(201).send(newProfile);
    } catch(error) {
        return res.status(404).send(error);
    }
})

router.put('/profiles/edit', async (req : Request, res : Response) => {
    try {
        const profile = await EditProfileController(req.body);
        return res.status(201).send(profile);
    } catch(error) {
        return res.status(404).send(error);
    }
})

router.delete('/profiles/delete/:id', async (req : Request, res : Response) => {
    try {
        const deletedProfile = await RemoveProfileController(req.params);
        return res.status(204).send(deletedProfile);
    } catch(error) {
        return res.status(404).send(error);
    }
})

export { router as Rotes }
