const status = (request, response) => {
  return response.status(200).json({ Felipe: "Sou um aluno curso.dev" });
};

export default status;
