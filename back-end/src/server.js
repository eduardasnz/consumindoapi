import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
const prisma = new PrismaClient()
app.use(express.json())
app.use(cors('http://localhost:5173'))

// criar usuarios
app.post('/users', async (req, res) => {
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.send('User registered successfully!').status(201)
})

//editar usuario
app.put('/users/:id', async (req, res) => {
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.send('User edit successfully!').status(201)
})

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({ message: "user deleted successfully"})
})

//listar usuarios
app.get('/users', async (req, res) => {
    
    const listUsesr = await prisma.user.findMany()
    res.json(listUsesr)
})


app.listen(2121, () => {
    console.log("app runn!")
})