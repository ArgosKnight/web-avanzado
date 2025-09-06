const express = require('express')
const ExcelJS = require ('exceljs')

const app = express()
const port = 3000

/* RUTA PRINCIPAL */
app.get("/", (req, res) => {
    res.send("Visita /reporte para descargar el excel")
})


app.get("/reporte", async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet("Ventas")

        worksheet.columns = [
            {header: "Producto", key: "producto", width: 30},
            {header: "Cantidad", key: "cantidad", width:15},
            {header: "Precio", key: "precio", width: 15}
        ]

        for (let i = 1; i <= 20; i++) {
            worksheet.addRow({
                producto: `Producto ${i}`,
                cantidad: Math.floor(Math.random()*50)+1,
                precio: (Math.random() * 100).toFixed(2)
            })
        }

         res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=reporte.xlsx"
        );
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error("Error generando el Excel:", error);
        res.status(500).send("Error generando el reporte");
    }
})


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})