require("dotenv").config();
const app = require("./app");

const port = process.env.PORT;

const PORT = port || 3333;
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
