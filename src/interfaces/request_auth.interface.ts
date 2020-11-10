import { Request } from "express";

export interface RequestAuth extends Request {
  authToken?: string | null;
  uid?: string;
  email?: string;
}
