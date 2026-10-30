
const { MongoClient } = require("mongodb");

const cliente = new MongoClient("mongodb://127.0.0.1:27017");

async function main() {
    try {
        await cliente.connect();

        const libros = cliente.db("biblioteca").collection("libros");

        // Marcar el libro como no disponible
        const resultado = await libros.updateOne(
            { titulo: "La sombra del viento" },
            { $set: { disponible: false } }
        );

        console.log("Libros modificados: " + resultado.modifiedCount);

        // Buscar los libros que siguen disponibles
        const lista = await libros.find({ disponible: true }).toArray();

        console.log("Libros que siguen disponibles:");

        for (const libro of lista) {
            console.log(libro.titulo);
        }

    } catch (error) {
        console.log("Error: " + error.message);

    } finally {
        await cliente.close();
    }
}

main();
