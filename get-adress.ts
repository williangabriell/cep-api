async function getAdress(cep: string) {
  const url = `https://viacep.com./ws/${cep}/json/`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error)
    console.error("Ocorreu um erro inesperado")
  }
}

getAdress("50771630");
console.log("Restante de código");
