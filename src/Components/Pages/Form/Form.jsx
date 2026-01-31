import { useEffect, useState } from "react";
import "./Form.css";
import { useNavigate, useParams } from "react-router";

export default function Form() {
  const { id } = useParams();
  const method = id ? "PUT" : "POST";
  const apiPath = id
    ? `http://localhost:2005/data/${id}`
    : `http://localhost:2005/data`;

  const [formInputs, setFomrInputs] = useState({
    titre: "",
    genre: "",
    stock: "",
    evaluation: "",
  });

  // GET THE FILM FOR UPDATE DATA =>
  useEffect(() => {
    if (id) {
      fetch(apiPath)
        .then((res) => res.json())
        .then((data) => {
          setFomrInputs({
            titre: data.titre,
            genre: data.genre,
            stock: data.stock,
            evaluation: data.evaluation,
          });
        });
    }
  }, [apiPath, id]);
  const navigate = useNavigate();
  // HANDLE SUBMIT FILM =>
  const handleBtnSubmit = (e) => {
    e.preventDefault();
    fetch(apiPath, {
      method: method,
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify({ id: `${Date.now()}`, ...formInputs }),
    }).then((res) => {
      if (res.ok) {
        alert(`film ${id ? "Updated" : "added"}  succsessfuly`);
        setFomrInputs({
          titre: "",
          genre: "",
          stock: "",
          evaluation: "",
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="container">
      <h1>{`${id ? "Update" : "create"} The Film`}</h1>
      <form onSubmit={handleBtnSubmit}>
        <div>
          <label htmlFor="titre">Titre</label>
          <input
            type="text"
            name="titre"
            id="titre"
            value={formInputs.titre}
            onChange={(e) => {
              setFomrInputs({ ...formInputs, titre: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <select
            name="genre"
            id="genre"
            value={formInputs.genre}
            onChange={(e) =>
              setFomrInputs({ ...formInputs, genre: e.target.value })
            }
          >
            <option>action</option>
            <option>thriller</option>
            <option>comedie</option>
          </select>
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input
            type="text"
            name="stock"
            id="stock"
            value={formInputs.stock}
            onChange={(e) =>
              setFomrInputs({ ...formInputs, stock: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="evaluation">Evaluation</label>
          <input
            type="text"
            name="titre"
            id="evaluation"
            value={formInputs.evaluation}
            onChange={(e) =>
              setFomrInputs({ ...formInputs, evaluation: e.target.value })
            }
          />
        </div>
        <button>{id ? "update" : "create"}</button>
      </form>
    </div>
  );
}
