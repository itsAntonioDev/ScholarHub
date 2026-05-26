import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { register } from "../services/routes/auth"

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    width: 100vw;
    background: #fcfafa;
    gap: 1.5rem;
`

const Title = styled.h1 <{$fontSize?: string, $color?: string, $fontWeight?: string}>`
    color: ${props => props.$color || '#4f4f4f'}; 
    font-size: ${props => props.$fontSize};
    font-weight: ${props => props.$fontWeight};
`

const Card = styled.div`
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10rem;
    border-radius: .5rem;
    gap: 1rem;
`

const Input = styled.input`
    box-sizing: border-box;
    background-color: #fcfafa;
    border: 1px solid #a7a7a7;
    border-radius: 4px;
    padding: 12px 16px;
    color: #000000;
    font-size: 14px;
    outline: none;
    width: 100%;
`

const Button = styled.button`
    width: 100%;
    background-color: #2d88d4;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 14px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 8px;

`

const Link = styled.div`
    color:  #667085;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: .5rem;

`

function Login(){
    
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [schoolName, setSchoolName] = useState('');

    const navigate = useNavigate();

    async function handleRegister(){
        if(!email || !password || !fullName || !schoolName) return alert('Please fill in all fields')

        try{    
            const {data: response} = await register(email, password, fullName, schoolName)
       
            if(response.success) {
                alert(response.message)
                navigate('/login')
            }
        }catch(error){
            console.error(error)
            alert('An error occurred while trying to register, please try again later')
        }
    }
    

    return(
        <Container>
            <Title>Welcome, create your school account </Title>
            <Card>
                <Title style={{"marginBottom": "1rem"}} $color="#667085"  $fontWeight="normal" $fontSize="1rem">It is our great pleasure to have you on board! </Title>
                 <Input
                    type="text"
                    placeholder="Enter the name of admin"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter the name of school"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                 <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleRegister}>Register</Button>
                <Link>Already have an account? <p style={{'color': '#2d88d4', 'fontWeight': 'bold', 'cursor': 'pointer'}} onClick={() => navigate('/login')}>Sign in</p> </Link>
            </Card>
        </Container>      
    )
}

export default Login