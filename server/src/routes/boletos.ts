import { Router, Request, Response } from "express";
import sql from "mssql";

export const ticketsRouter: Router = Router();

ticketsRouter.get("/precios", async (req: Request, res: Response) => {
  try {
    const result = await sql.query("SELECT * FROM PRECIOS_GENERALES");
    const tickets = result.recordset;
    res.status(200).json({
      message: "successfull",
      data: tickets,
    });
  } catch (err) {
    res.status(500).json({ message: "error while getting prices" });
  }
});

ticketsRouter.get(
  "/precios/:idProyeccion",
  async (req: Request, res: Response) => {
    const id: number = Number(req.params.idProyeccion);
    try {
      const result = await sql.query(`
                      select distinct Tipos_Asientos.Nombre, Tipos_Asientos.Valor_Agregado, Precios.Precio, Rango_Edades.Tipo  from Proyecciones
                      join Asientos_Salas on Proyecciones.ID_Sala = Asientos_Salas.ID_Sala
                      join Asientos on Asientos_Salas.ID_Asiento = Asientos.ID
                      join Tipos_Asientos on Asientos.ID_Tipo_Asiento = Tipos_Asientos.ID
                      join Precios on Proyecciones.ID_Tipo_Proyeccion = Precios.ID_Tipo_Proyeccion
                      join Rango_Edades on Precios.ID_Rango_Edades = Rango_Edades.ID
                      where Proyecciones.ID = ${id};
                    `);

      res.status(200).json({
        message: "successfull",
        data: result.recordset,
      });
    } catch (err) {
      res.status(500).json({
        message: "error while getting tickets",
      });
    }
  }
);

ticketsRouter.get("/proyecciones/:id", async (req: Request, res: Response) => {
  const proyeccionID = parseInt(req.params.id);
  try {
    const result = await sql.query(`select Salas.Numero_Sala from Proyecciones
                                    join Salas on Proyecciones.ID_Sala = Salas.ID
                                    where Proyecciones.ID = ${proyeccionID}
                                  `);
    return res.status(200).json({
      message: "success",
      data: result.recordset[0],
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while handling proyecciones" });
  }
});


ticketsRouter.get('/proyecciones/:id/info', async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const result = await sql.query(`select Peliculas.Poster, Peliculas.Titulo, Proyecciones.Fecha, Proyecciones.Horario, Clasificacion.TIPO, Proyecciones.Doblada from Proyecciones
                                    join Peliculas on Proyecciones.ID_Pelicula = Peliculas.ID
                                    join Clasificacion on Peliculas.ID_Clasificacion = Clasificacion.ID
                                    where Proyecciones.ID = ${id}
                                  `)
    return res.status(200).json({
      message: 'sucessful',
      data: result.recordset[0]
    })
  } catch(err) {
    return res.status(500).json({ message: "error while handling proyeccion info" })
  }
})

ticketsRouter.get('/asientos/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const result = await sql.query(`select Asientos_Proyecciones_Salas.Ocupado, Asientos.Habilitado, Asientos.Numero_Asiento, Asientos.ID, Tipos_Asientos.Nombre from Proyecciones
                                    join Asientos_Proyecciones_Salas on Proyecciones.ID = Asientos_Proyecciones_Salas.ID_Proyeccion
                                    join Asientos on Asientos_Proyecciones_Salas.ID_Asiento = Asientos.ID
                                    join Tipos_Asientos on Asientos.ID_Tipo_Asiento = Tipos_Asientos.ID
                                    where Proyecciones.ID = ${id}
                                  `)
    return res.status(200).json({
      message: 'success',
      data: result.recordset
    })
  } catch(err) {
    return res.status(500)
  }
})