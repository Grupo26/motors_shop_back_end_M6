import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createCommentsServices from "../../services/comments/create";

const createCommentsController = async (req: Request, res: Response) => {
    const {comment } = req.body;
    const userId = req.user.id;
    const {vehicle_id} = req.params
    const createdComment = await createCommentsServices(comment, userId, vehicle_id);
    return res.status(201).json(instanceToPlain(createdComment));
};

export { createCommentsController}