"use client";
import { useState } from "react";
import { getAddress } from "../../get-address";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MdDelete } from "react-icons/md";

const inititalEnderecos: Address[] = [
  {
    id: self.crypto.randomUUID(),
    cep: "51270-380",
    logradouro: "Rua Engenho Carau",
    complemento: "",
    unidade: "1",
    bairro: "Cohab",
    localidade: "Recife",
    uf: "PE",
    estado: "Pernambuco",
    regiao: "Nordeste",
    ibge: "2611606",
    gia: "",
    ddd: "81",
    siafi: "2619",
    createdAt: new Date(),
  },
  {
    id: self.crypto.randomUUID(),
    cep: "30130-010",
    logradouro: "Avenida Afonso Pena",
    complemento: "",
    unidade: "2",
    bairro: "Centro",
    localidade: "Belo Horizonte",
    uf: "MG",
    estado: "Minas Gerais",
    regiao: "Sudeste",
    ibge: "3106200",
    gia: "",
    ddd: "31",
    siafi: "4123",
    createdAt: new Date(),
  },
  {
    id: self.crypto.randomUUID(),
    cep: "01310-000",
    logradouro: "Avenida Paulista",
    complemento: "",
    unidade: "3",
    bairro: "Bela Vista",
    localidade: "São Paulo",
    uf: "SP",
    estado: "São Paulo",
    regiao: "Sudeste",
    ibge: "3550308",
    gia: "1004",
    ddd: "11",
    siafi: "7107",
    createdAt: new Date(),
  },
  {
    id: self.crypto.randomUUID(),
    cep: "40020-000",
    logradouro: "Praça da Sé",
    complemento: "Edifício Central",
    unidade: "4",
    bairro: "Centro Histórico",
    localidade: "Salvador",
    uf: "BA",
    estado: "Bahia",
    regiao: "Nordeste",
    ibge: "2927408",
    gia: "",
    ddd: "71",
    siafi: "3849",
    createdAt: new Date(),
  },
  {
    id: self.crypto.randomUUID(),
    cep: "70040-900",
    logradouro: "Esplanada dos Ministérios",
    complemento: "",
    unidade: "5",
    bairro: "Zona Cívico-Administrativa",
    localidade: "Brasília",
    uf: "DF",
    estado: "Distrito Federal",
    regiao: "Centro-Oeste",
    ibge: "5300108",
    gia: "",
    ddd: "61",
    siafi: "9701",
    createdAt: new Date(),
  },
];

type Address = {
  id: string;
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  createdAt: Date;
};

function formatDate(date: Date) {
  const result = formatDistanceToNow(new Date(date), {
    includeSeconds: true,
    locale: ptBR,
  });

  return result;
}

export default function Home() {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const [enderecos, setEnderecos] = useState<Address[]>(inititalEnderecos);

  const [inputValue, setInputValue] = useState("");

  async function handleGetAddress() {
    if (inputValue.length !== 8) {
      alert("CEP inválido");
      return;
    }

    setLoading(true);

    try {
      const result = await getAddress(inputValue);
      setAddress(result.logradouro);
      // address = result;

      // const newEnderecos = [...enderecos, result];
      const newEndereco: Address = {
        id: self.crypto.randomUUID(),
        createdAt: new Date(),
        ...result,
      };

      console.log(newEndereco);

      setEnderecos([newEndereco, ...enderecos]);
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteAddress(id: string) {
    console.log(id);
    const filteredAddresses = enderecos.filter(
      (endereco) => endereco.id !== id
    );

    setEnderecos(filteredAddresses);
  }

  return (
    <div className="flex flex-col gap-4 px-56 mt-24">
      <div className="flex px-64 gap-2">
        <input
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Digite o CEP aqui"
          className="flex flex-1 rounded-md border border-black px-4 p-3"
        />

        <button
          disabled={inputValue === ""}
          onClick={handleGetAddress}
          className={`${
            loading && "opacity-30"
          } w-fit px-5 py-3 bg-blue-700 text-white rounded-xl`}
        >
          {loading ? "Carregando..." : "Obter endereço"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Logradouro</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>CEP</th>
            <th>Consultado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {enderecos.map((endereco) => (
            <tr key={endereco.id} className="border-2 [&>*]:py-2 [&>*]:px-2">
              <td>{endereco.logradouro}</td>
              <td>{endereco.bairro}</td>
              <td>{endereco.localidade}</td>
              <td>{endereco.uf}</td>
              <td>{endereco.cep}</td>
              <td>{formatDate(endereco.createdAt)}</td>
              <td className="flex">
                <button
                  onClick={() => handleDeleteAddress(endereco.id)}
                  className="p-1"
                >
                  <MdDelete size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
