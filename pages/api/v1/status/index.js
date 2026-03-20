function status(request, response) {
  response.status(200).json({ text: "Eu amo minha esposa ME" });
}

export default status;
