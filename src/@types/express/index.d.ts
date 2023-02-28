declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
      };
    }
  }
}
// namespace NodeJS {
//
// interface ProcessEnv {
// PGPORT: number | undefined;
// }
// }

export {};
