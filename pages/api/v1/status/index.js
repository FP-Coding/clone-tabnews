import database from "infra/database.js";

const status = async (request, response) => {
  const result = await database.query("SELECT 1+1 as SUM");
  console.log(result.rows);

  return response.status(200).json({ Felipe: "Sou um aluno curso.dev" });
};

export default status;
