import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db_config';

const bcryptSalRounds = 12;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = '7d';

export async function registerService(email: string, full_name: string, password: string, school_name: string){
    try {
        
        const {rows} = await db.query('SELECT email FROM users WHERE email = $1', [email]);
        
        if(rows.length > 0){
            return({
                status: 409,
                success: false,
                message: 'Email já cadastrado!'
            });
        }

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

export async function loginService(email: string, password: string){
    try {

        const {rows} = await db.query('SELECT user_uuid, email, full_name, password FROM users WHERE email = $1', [email]);

        if(rows.length === 0){
            return({
                status: 401,
                success: false,
                message: 'Email ou senha inválidos!'
            });
        }

        const user = rows[0];

        const passwordMatches = await bcrypt.compare(password, user.password);

        if(!passwordMatches){
            return({
                status: 401,
                success: false,
                message: 'Email ou senha inválidos!'
            });
        }

        const token = jwt.sign(
            { id: user.user_uuid, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return({
            status: 200,
            success: true,
            message: 'Login realizado com sucesso!',
            token,
            user: {
                id: user.user_uuid,
                email: user.email,
                full_name: user.full_name
            }
        });
    } catch (error) {
        console.log(error);
        return({
            status: 500,
            success: false,
            message: 'Erro ao fazer login!'
        });
    }
}