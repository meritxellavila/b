import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, NavLink, useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col, Toast } from "react-bootstrap";
import AñadirComentario from "../components/AñadirOpiniones";

function DetallesReceta() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recetaDetalle, setReceta] = useState(null);
  const { recetasId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/recetas/${recetasId}`)
      .then((response) => {
        console.log(response.data);
        setReceta(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [recetasId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5005/api/recetas/${recetasId}`);
      navigate("/"); // Redirigir a la página de inicio después de eliminar la receta
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4 mt-4">Detalle de la Receta</h2>
      <Container>
        <Row>
          {recetaDetalle && (
            <Col key={recetaDetalle._id}>
              <Card
                className="mb-3 mt-4"
                style={{ fontFamily: "Indie Flower", fontSize: "1.2rem" }}
              >
                <Card.Img
                  variant="top"
                  src={recetaDetalle.imagen}
                  className="img-fluid"
                />
                <Card.Body>
                  <Card.Title className="text-center">
                    <h2>{recetaDetalle.nombre}</h2>
                  </Card.Title>
                </Card.Body>
                <Card.Body>
                  <Card.Text>
                    <strong>Ingredientes:</strong>
                  </Card.Text>
                  <ul className="list-group">
                    {recetaDetalle.ingredientes.map((ingrediente, index) => (
                      <li key={index} className="list-group-item">
                        {ingrediente}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
                <Card.Body>
                  <Card.Text>
                    <strong>Pasos:</strong>
                  </Card.Text>
                  <ol className="list-group">
                    {recetaDetalle.pasos.map((paso, index) => (
                      <li key={index} className="list-group-item">
                        {paso}
                      </li>
                    ))}
                  </ol>
                </Card.Body>
                <Card.Body>
                  <AñadirComentario />
                </Card.Body>
                <Container className="d-flex justify-content-between">
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    type="submit"
                    onClick={handleDelete}
                  >
                    Borrar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </Button>

                  <Link to={`/EditarReceta/${recetasId}`}>
                    <Button variant="outline-secondary" size="lg">
                      Editar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                        />
                      </svg>
                    </Button>
                  </Link>
                </Container>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default DetallesReceta;
