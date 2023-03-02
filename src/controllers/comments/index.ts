import { Request, Response } from "express";
import createCommentsServices from "../../services/comments/create";

const createCommentsController = async (req: Request, res: Response) => {
    const contact = req.body;
    const id = req.user.id;
    const createdContact = await createCommentsServices(contact);
    return res.status(201).json(createdContact);
};

export { createCommentsController}