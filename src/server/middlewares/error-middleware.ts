import { NextFunction } from "express";
import { Request, Response } from "express";

export const errorMiddleware = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(500).send({ message: error.message, error: "Unexpected Error" });
};
