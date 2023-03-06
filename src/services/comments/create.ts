import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import { User } from "../../entities/user.entity";
import { Vehicle } from "../../entities/vehicle.entity";
import { AppError } from "../../errors/appErrors";

const createCommentsServices = async (
    comment: string,
    userId: string,
    vehicle_id: string 

): Promise<Comment> => {
    const userRepository = AppDataSource.getRepository(User);
    const commentsRepository = AppDataSource.getRepository(Comment);
    const vehicleRepository = AppDataSource.getRepository(Vehicle);

    const users = await userRepository.findOneBy({ id: userId });
    const vehicles = await vehicleRepository.findOneBy({ id: vehicle_id });

    if(!comment){
        throw new AppError('comment is required', 404)
    }
    if(!users){
        throw new AppError('User not found', 404)
    }

    if(!vehicles){
        throw new AppError('Vehicle not found', 404)
    }
    const commentCreate = commentsRepository.create({
        comment,
        users,
        vehicles,
    })

    

    await commentsRepository.save(commentCreate);

    const findComment = await commentsRepository.findOne({
        where: { id: commentCreate.id },
        relations: ["vehicles"],
    });

    // const findComment = await commentsRepository.findOneBy({
    //     id: commentCreate.id,
    // });

    return findComment!;
};
export default createCommentsServices;



// const commentCreate = commentsRepository.create({
    //     comment,
    // })
    // const commentCreate = new Comment();
    // commentCreate.comment = comment;
    // commentCreate.users = users;
    // commentCreate.vehicles = vehicles;