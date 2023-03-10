import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest, IUserResponse } from "../../interfaces/user";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appErrors";
import { Address } from "../../entities/address.entity";

const updateUserService = async (id: string, user: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const userEdited = await userRepository.findOne({
    where: { id: id },
    relations: ["address"]
  })
  const userAddress = userEdited?.address.id
  const addressRepository = AppDataSource.getRepository(Address);
  const addressEdited = await addressRepository.findOneBy({ id: userAddress })

  console.log(addressEdited)

  if (!userEdited) {
    throw new AppError("Usuário não encontrado", 404);
  }

  if (!addressEdited) {
    throw new AppError("Endereço não encontrado", 404)
  }

  await addressRepository.update(addressEdited.id, {
    cep: user.address?.cep ? user.address.cep : addressEdited.cep,
    state: user.address?.state ? user.address.state : addressEdited.state,
    city: user.address?.city ? user.address.city : addressEdited.city,
    street: user.address?.street ? user.address.street : addressEdited.street,
    number: user.address?.number ? user.address.number : addressEdited.number,
    complement: user.address?.complement ? user.address.complement : addressEdited.complement,
  })

  await userRepository.update(id, {
    name: user.name ? user.name : userEdited.name,
    email: user.email ? user.email : userEdited.email,
    profileImage: user.profileImage ? user.profileImage : userEdited.profileImage,
    cpf: user.cpf ? user.cpf : userEdited.cpf,
    phone: user.phone ? user.phone : userEdited.phone,
    birthdate: user.birthdate ? user.birthdate : userEdited.birthdate,
    description: user.description ? user.description : userEdited.description,
    password: user.password ? await hash(user.password, 10) : userEdited.password,
    typeUser: user.typeUser ? user.typeUser : userEdited.typeUser,
  })

  const userEditeded = await userRepository.findOne({
    where: { id: id },
    relations: ["address"]
  })

  return userEditeded;
};

export default updateUserService;
