"use client"
import {getAddress} from "../../get-address"


export default function Home() {
  let addres = "Rua teste"

 async function handleGetAdress() {
  try {
    const result = await getAddress("50771630")
    addres = result;

    console.log(result)
  } catch(error) {
    alert("Ocorreu um erro ao obter endereço")
  }
   
  }
  return (
        <div>
            <h1>Página Home</h1>
            <span>Endereço: {addres}</span>
            <button onClick={handleGetAdress} 
                    className="px-5 py-3 bg-blue-700 text-black rounded-xl">
                    Obter Endereço
            </button>
        </div>
  );
}
