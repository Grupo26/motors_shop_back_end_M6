import AppDataSource from "../data-source";
import { AppError } from "../errors/appErrors";

export const getRepo = (entity: any) => {
  const repo = AppDataSource.getRepository(entity);
  return repo;
};

export const getObjectOr404 = async (
  entity: any,
  key: string | number | boolean
) => {
  const repo = getRepo(entity);
  const object = await repo.findOneBy({ key });

  if (!object) throw new AppError("Not Found", 404);
  return object;
};

export const getRepoAndObject = async (
  entity: any,
  key: string | number | boolean
) => {
  const repo = getRepo(entity);
  const object = await getObjectOr404(entity, key);
  return { repository: repo, object: object };
};
