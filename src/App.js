import React, { useEffect, useState } from "react";
import Api from "./services/api";
import "./styles.css";

function App() {
  const [nameRepository, setNameRepository] = useState("");
  const [urlRepository, setUrlRepository] = useState("");
  const [techsRepository, setTechsRepository] = useState("");
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    Api.get("repositories").then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    try {
      const response = await Api.post("repositories", {
        title: nameRepository,
        url: urlRepository,
        techs: techsRepository,
      });

      setNameRepository("");
      setUrlRepository("");
      setTechsRepository("");
      setRepositories([...repositories, response.data]);

      alert("Projeto cadastrado com sucesso");
    } catch (error) {
      console.error(error);
      alert("Não foi possível cadastrar projeto");
    }
  }

  async function handleRemoveRepository(id, index) {
    try {
      await Api.delete(`repositories/${id}`);
      repositories.splice(index, 1);
    } catch (error) {}
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repository, index) => (
            <li key={repository.id}>
              {repository.title}
              <button
                onClick={() => handleRemoveRepository(repository.id, index)}
              >
                Remover
              </button>
            </li>
          ))}
      </ul>

      <input
        placeholder="nome do repositório"
        type="text"
        value={nameRepository}
        onChange={(ev) => setNameRepository(ev.target.value)}
      />

      <input
        placeholder="url do repositório"
        type="text"
        value={urlRepository}
        onChange={(ev) => setUrlRepository(ev.target.value)}
      />

      <input
        placeholder="techs do repositório (separados por virgula)"
        type="text"
        value={techsRepository}
        onChange={(ev) => setTechsRepository(ev.target.value)}
      />

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
