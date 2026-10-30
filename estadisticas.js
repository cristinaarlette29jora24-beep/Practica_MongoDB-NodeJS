
const { MongoClient } = require("mongodb");

const cliente = new MongoClient("mongodb://127.0.0.1:27017");

async function main() {
    try {
        await cliente.connect();

        const libros = cliente.db("biblioteca").collection("libros");

        // Contar todos los libros
        const total = await libros.countDocuments();

        // Contar libros disponibles
        const disponibles = await libros.countDocuments({
            disponible: true
        });

        // Contar libros prestados
        const prestados = await libros.countDocuments({
            disponible: false
        });

        // Buscar el libro con más páginas
        const mayor = await libros.findOne(
            {},
            { sort: { paginas: -1 } }
        );

        console.log("ESTADÍSTICAS DE LA BIBLIOTECA");
        console.log("----------------------------");

        console.log("Número total de libros: " + total);
        console.log("Libros disponibles: " + disponibles);
        console.log("Libros prestados: " + prestados);

        if (mayor) {
            console.log(
                "Libro con más páginas: " +
                mayor.titulo +
                " (" + mayor.paginas + " páginas)"
            );
        } else {
            console.log("No hay libros registrados.");
        }

    } catch (error) {
        console.log("Error: " + error.message);

    } finally {
        await cliente.close();
    }
}

main();
