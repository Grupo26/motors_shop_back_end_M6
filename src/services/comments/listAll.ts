import AppDataSource from "../../data-source"
import { Comment } from "../../entities/comments.entity"

const listCommentsService = ()=>{
    const commentsRepository = AppDataSource.getRepository(Comment)
    const comments = commentsRepository.find()
    return comments
}
export default listCommentsService