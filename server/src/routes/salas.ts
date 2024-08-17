import { Router, Request, Response } from "express";
import { salaSchema } from "../schemas/salas";
import sql from 'mssql'

export const salasRouter: Router = Router()


salasRouter.post('/nuevo', async (req: Request, res: Response) => {
  const data = req.body
  try {
    const isSafe = salaSchema.safeParse(data)
    if (!isSafe) return res.status(403).json({ message: 'invalid data' })
    
    const result = await sql.query(`INSERT INTO Salas VALUES (${data.numeroSala}, ${data.capacidad})`)
    console.log(result)
    
    return res.status(200).json({
      message: 'sala created successfully',
    })

  } catch(err) {
    return res.status(500).json({ message: 'error while saving salas', error: err })
  }

})