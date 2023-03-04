import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createCommentsServices from "../../services/comments/create";
import deleteCommentService from "../../services/comments/delete";
import listCommentsService from "../../services/comments/listAll";
import updateCommentService from "../../services/comments/update";

const createCommentsController = async (req: Request, res: Response) => {
    const { comment } = req.body;
    const userId = req.user.id;
    const { vehicle_id } = req.params;
    const createdComment = await createCommentsServices(
        comment,
        userId,
        vehicle_id
    );
    return res.status(201).json(instanceToPlain(createdComment));
};

const listCommentsController = async (req: Request, res: Response) => {
    const listAll = await listCommentsService();
    return res.status(201).json(instanceToPlain(listAll));
};

const deleteCommentController = async (req: Request, res: Response) => {
    const userId = req.user.id
    const {comment_id} = req.params
    await deleteCommentService(comment_id, userId);
    return res.status(204).send();
};

const updateCommentController = async (req: Request, res: Response) =>{
    const userId = req.user.id
    const {comment_id} = req.params
    const data = req.body

    const commentUpdated = await updateCommentService(userId, comment_id, data)
    return res.status(200).json(instanceToPlain(commentUpdated))


}

export {
    createCommentsController,
    listCommentsController,
    deleteCommentController,
    updateCommentController
};
