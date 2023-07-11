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
  const [erro, setErro] = useState('');
  const [inserindo, setInserindo] = useState(false);

  function recarregarItens() {
    setCarregando(true);
    axios.get('http://localhost:4000/api/itens')
    .then(function (response) {
      setItens(response.data);
    })
    .catch(function (error) {
      //erro = 'Não foi possível conectar no servidor'
      setErro('Não foi possível conectar no servidor');
    })
    .finally(function () {
      setCarregando(false);
    });
  }

  useEffect(function () {
    recarregarItens();
  }, []);

  function botaoRecarregarClicado() {
    recarregarItens();
  }

  function botaoInserirClicado() {
    setInserindo(true);
  }

  function botaoCancelarClicado() {
    setInserindo(false);
  }

  function botaoSalvarClicado() {
    if ((nome !== undefined) && (descricao !== undefined)) {
      setCarregando(true);
      const item: Item = {
        nome,
        descricao,
      }
      axios.post('http://localhost:4000/api/itens', item)
      .finally(function () {
        setCarregando(false);
        setInserindo(false);
      })
      .then(function () {
        setNome('');
        setDescricao('');
        recarregarItens();
      })
      .catch(function (error) {
        setErro('Não foi possível criar o Item.');
      })
      ;
    }
  }

  return (
    <div>
      <h1>Home <button onClick={botaoRecarregarClicado}>Recarregar</button></h1>
      {(carregando) ? (
        <div>Carregando...</div>
      ) : (
        <>
          {(erro !== '') && (
            <div>ERRO: {erro}</div>
          )}
          <ul>
            {itens.map(function (item) {
              return <li>{item.nome}</li>
            })}
          </ul>
          {(inserindo) ? (
            <div>
              <input
                placeholder='Nome'
                onChange={function (e) { setNome(e.target.value) }}
                value={nome}
              />
              <input
                placeholder='Descricao'
                onChange={function (e) { setDescricao(e.target.value) }}
                value={descricao}
              />
              <button onClick={botaoCancelarClicado}>Cancelar</button>
              <button onClick={botaoSalvarClicado}>Salvar</button>
            </div>
          ) : (
            <button onClick={botaoInserirClicado}>Novo Item</button>
          )}
        </>
      )}
    </div>
  );
}