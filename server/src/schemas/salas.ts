import z from 'zod'

export const salaSchema = z.object({
  numeroSala: z.number(),
  capacidad: z.number() 
})