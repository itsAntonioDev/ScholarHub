import { Request, Response } from "express";
import { registerService, loginService } from "../services/auth_services";

export async function registerController(req: Request, res: Response){
    const {email, full_name, password, school_name} = req.body
    
    if(!email || !full_name || !password || !school_name){
        return res.status(422).json({
            success: false,
            message: 'Dados Inválidos',
        })    
    }

    try {
        const response = await registerService(email, full_name, password, school_name);

        return res.status(response.status).json({
            success: response.success,
            message: response.message,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao registrar usuário!',
        })    
    }
}

export async function loginController(req: Request, res: Response){
    const {email, password} = req.body

    if(!email || !password){
        return res.status(422).json({
            success: false,
            message: 'Dados Inválidos',
        })
    }

    try {
        const response = await loginService(email, password);

        return res.status(response.status).json({
            success: response.success,
            message: response.message,
            token: response.token,
            user: response.user,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao fazer login!',
        })
    }
}