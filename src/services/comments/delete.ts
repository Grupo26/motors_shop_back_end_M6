import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import { AppError } from "../../errors/appErrors";

const deleteCommentService = async (comment_id:string, userId:string) => {
    const commentsRepository = AppDataSource.getRepository(Comment)
    const commentToDelete = await commentsRepository.findOneBy({id: comment_id})

    if(!commentToDelete){
        throw new AppError("comment not found", 404)
    }
    if(commentToDelete.users.id != userId){
        throw new AppError('you cannot delete a comment that is not yours', 400)
    }
    await commentsRepository.remove(commentToDelete)
};

export default deleteCommentService;
