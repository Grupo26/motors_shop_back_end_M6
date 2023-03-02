import { Request, Response } from "express";
import createCommentsServices from "../../services/comments/create";

const createCommentsController = async (req: Request, res: Response) => {
    const body = req.body;
    const id = req.user.id;
    const createdComment = await createCommentsServices(body, id);
    return res.status(201).json(createdComment);
};

export { createCommentsController}