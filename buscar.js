
const { MongoClient } = require("mongodb");

const cliente = new MongoClient("mongodb://127.0.0.1:27017");

async function main() {
    try {
        await cliente.connect();

        const libros = cliente.db("biblioteca").collection("libros");

        const genero = "novela";

        const lista = await libros.find({ genero: genero }).toArray();

        console.log("Libros del género " + genero + ":");

        for (const libro of lista) {
            console.log(libro.titulo);
        }

        console.log("Total de libros encontrados: " + lista.length);

    } catch (error) {
        console.log("Error: " + error.message);

    } finally {
        await cliente.close();
    }
}

main();
