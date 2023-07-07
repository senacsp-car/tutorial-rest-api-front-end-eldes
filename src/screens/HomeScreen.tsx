import axios from 'axios';
import { useEffect, useState } from 'react';

type Item = {
  id?: number;
  nome: string;
  descricao: string;
}

export default function HomeScreen() {
  const [itens, setItens] = useState<Item[]>([]);
  const [nome, setNome] = useState<string>();
  const [descricao, setDescricao] = useState<string>();

  const [carregando, setCarregando] = useState(false);

  useEffect(function () {
    setCarregando(true);
    axios.get('http://localhost:4000/api/itens')
    .then(function (response) {
      setItens(response.data);
    })
    .catch(function (error) {
      alert(error);
    })
    .finally(function () {
      setCarregando(false);
    });
  }, []);

  function botaoSalvarClicado() {
    if ((nome !== undefined) && (descricao !== undefined)) {
      const item: Item = {
        nome,
        descricao
      }
      //TODO Recaregar a tela.
      axios.post('http://localhost:4000/api/itens', item)
      .then()
      .catch();
    }
  }

  return (
    <div>
      <h1>Home</h1>
      {(carregando) && (
        <div>Carregando...</div>
      )}
      <ul>
        {itens.map(function (item) {
          return <li>{item.nome}</li>
        })}
      </ul>
      <div>
        <input
          placeholder='Nome'
          onChange={function (e) { setNome(e.target.value) }}
        />
        <input
          placeholder='Descricao'
          onChange={function (e) { setDescricao(e.target.value) }}
        />
        <button onClick={botaoSalvarClicado}>Salvar</button>
      </div>
    </div>
  );
}