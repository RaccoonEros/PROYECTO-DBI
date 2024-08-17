import { Router, Request, Response } from "express";
import sql from "mssql";

export const clientRouter: Router = Router();

clientRouter.get("/emision/:branchID", async (req: Request, res: Response) => {
  const branchID = req.params.branchID
  try {
    const result =
      await sql.query(`select Peliculas.ID, Peliculas.Titulo, Peliculas.Duracion_en_minutos, Peliculas.Poster, Clasificacion.TIPO from peliculas
                        join Clasificacion on Peliculas.ID_Clasificacion = Clasificacion.ID
                        join Estados on Peliculas.ID_Estado = Estados.ID
                        join Peliculas_Sucursales on Peliculas.ID = Peliculas_Sucursales.ID_Pelicua
                        where Estados.ID = 2 and Peliculas_Sucursales.ID_Sucursal = ${branchID};
`);

    return res.status(200).json({
      message: "movies processed successfully",
      data: result.recordset,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "error while processing movies request" });
  }
});

clientRouter.get('/sucursales', async (req: Request, res: Response) => {
  try {
    const result = await sql.query("select * from Sucursales")
    return res.status(200).json({
      message: 'success',
      data: result.recordset
    })
  } catch(err) {
    return res.status(500).json({ message: 'error while handling sucursales data' })
  }
})

