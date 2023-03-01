declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        typeUser: string;
      };
    }
  }
}
