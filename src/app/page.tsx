import { Title } from "./components/Title/title";
import { Quadrado } from "./components/Quadrado/quadrado";
import { ButtonPrincipal } from "./components/buttonPrincipal/button";
import { ListaItens } from "./components/ListaItens/ListaItens";

export default function Home() {
  return (
    <div>
      <Title/>
      <h1>Willian Gabriel</h1>
      <Quadrado/> 
      <br />
      <ButtonPrincipal/>  
      <br /><br />
      <ListaItens/>
    </div>
  );
}
