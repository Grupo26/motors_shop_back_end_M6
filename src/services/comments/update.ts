import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import { AppError } from "../../errors/appErrors";
import { ICommentRequest } from "../../interfaces/comment";

const updateCommentService = async (
    userId: string,
    comment_id: string,
    data: ICommentRequest
) => {
    const commentRepository = AppDataSource.getRepository(Comment);
    const comentToEdit = await commentRepository.findOneBy({ id: comment_id });

    if (!comentToEdit) {
        throw new AppError("Comment not Found");
    }
    if(comentToEdit.users.id != userId){
        throw new AppError('you cannot update a comment that is not yours', 400)
    }

    await commentRepository.update({id: comment_id},{
        comment: data.comment ? data.comment : comentToEdit.comment
    })

    const commentEdited = await commentRepository.findOneBy({id:comment_id})

    return commentEdited

};
export default updateCommentService;
