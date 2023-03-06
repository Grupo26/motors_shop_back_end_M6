import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/user";
import { hash } from "bcrypt";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/appErrors";

const createUserService = async ({
  name,
  email,
  profileImage,
  cpf,
  phone,
  birthdate,
  description,
  password,
  typeUser,
  address,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);
  const newAddress = addressRepository.create({ ...address });

  const emailverify = await userRepository.findOneBy({ email: email });
  const cpfVerify = await userRepository.findOneBy({ cpf: cpf });

  if (emailverify) {
    throw new AppError("email already exist", 409);
  }

  if (cpfVerify) {
    throw new AppError("cpf already exist", 409);
  }

  await addressRepository.save(newAddress);

  const user = new User();
  user.name = name!;
  user.email = email!;
  user.profileImage = profileImage!;
  user.cpf = cpf!;
  user.phone = phone!;
  user.birthdate = birthdate!;
  user.description = description!;
  user.password = await hash(password!, 10);
  user.typeUser = typeUser!;
  user.address = newAddress;

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

export default createUserService;

