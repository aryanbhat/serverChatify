import { Request } from "express";

export interface MyRequest extends Request{
  user ?: string | undefined |  (() => string);
}