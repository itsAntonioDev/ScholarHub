import { Request, Response } from "express";

export async function registerController(req: Request, res: Response){
    const {email, full_name, password, school_name} = req.body
    
    if(!email || !full_name || !password || !school_name){
        return res.status(422).json({
            success: false,
            message: 'Dados Inválidos',
        })    
    }

    try {

        
    } catch (error) {
        
    }
}
