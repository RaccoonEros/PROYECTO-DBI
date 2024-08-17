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
