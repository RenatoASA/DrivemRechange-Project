import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

export function validateSchema(schema:ObjectSchema){
    return (req:Request, res:Response, next:NextFunction)=>{
        const validation = schema.validate(req.body);
        if(validation.error){
            res.status(httpStatus.UNPROCESSABLE_ENTITY).send(validation.error.details.map
                (detail=>detail.message ));
        }
    
        next();
    }
}