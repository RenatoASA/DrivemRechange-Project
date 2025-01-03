import { Request, Response, NextFunction } from "express";

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {

    if (error.type === "CONFLICT") {
        res.status(409).send(error.message)
    }
    if (error.type === "NOT FOUND") {
        res.status(404).send(error.message)
    }
    
        res.status(500).send(error.message)
    

}
