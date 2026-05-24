import bcrypt from 'bcrypt';
import db from '../config/db_config';

const bcryptSalRounds = 12;

export async function registerService(email: string, full_name: string, password: string, school_name: string){
    try {
        const passswordHashed = await bcrypt.hash(password, bcryptSalRounds);

        if(full_name.length < 3){
            return({
                status: 422,
                success: false,
                message: 'Nome completo deve ter pelo menos 3 caracteres!'
            });
        }

        if(password.length < 8){
            return({
                status: 422,
                success: false,
                message: 'Senha deve ter pelo menos 8 caracteres!'
            });
        }

        await db.query('INSERT INTO users (email, full_name, password) VALUES ($1, $2, $3)', [email, full_name, passswordHashed]);

        console.log(school_name);

        return({
            status: 201,
            success: true,
            message: 'Usuário registrado com sucesso!'
        });
    } catch (error) {
        console.log(error);
        return({
            status: 500,
            success: false,
            message: 'Erro ao registrar usuário!'
        });
    }
}