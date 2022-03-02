import fs from 'fs';
import http from 'http';
import { stdout,stdin,exit } from 'process';

const getTxtValue= () => fs.readFileSync('database.txt',{encoding:'base64'})
const txt= getTxtValue().toString()
 
if(txt == ''){
    console.log("Erro ao carregar o mega database :(")
    exit()
} 

const setTxtValue = (value) => fs.writeFileSync('database.txt',value,(err)=>{
    console.log('Erro ao escrever no mega database :(')
    exit()
})

let counter = 0;

const server = http.createServer(
    (req,res)=>{
            ++counter;//cound be a async action
            setTxtValue(counter.toString())
            console.log(req.toString())
            res.writeHead(200,{'Content-Type': 'text/plain'})
            res.write(`Counter Atual: ${counter}`)
            return res.end()
        }
        
    )

const PORT = process.env.PORT || 8080
server.listen(PORT) //http:localhost:8080/ -> file system () => read write .txt 
console.log(`Servidor Iniciado na porta ${PORT}`)
//server.on('exit',() => {
//    console.log('Limpando arquivo...')
//    setTxtValue('0')
//})