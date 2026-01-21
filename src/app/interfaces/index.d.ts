import { JwtPayload } from "jsonwebtoken";

export interface IUserJwtPayload extends JwtPayload {
  _id: string;
  email: string;
  role: string;
  organizationId: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IUserJwtPayload;
    }
  }
}


