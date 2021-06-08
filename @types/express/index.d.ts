import * as express from "express"
import { Customer } from "../../src/models/Customer";

declare global {
  namespace Express {
    interface Request {
      customer: Customer
    }
  }
}