import React, { useState, useEffect } from "react";
import { Button, Card, Badge, ListGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import api from "../../service/api";

interface IParams {
  id: string;
}

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Detail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IParams>();

  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    findTask();
  }, [id]);

  function backTask() {
    history.goBack();
  }

  function formateDate(date: Date | undefined) {
    return moment(date).format("DD/MM/YYYY");
  }

  async function findTask() {
    const response = await api.get(`/tasks/${id}`);
    console.log(response);
    setTask(response.data);
  }

  return (
    <div className="container">
      <div className="task-header">
        <h1>Task details</h1>
        <Button variant="dark" size="sm" onClick={backTask}>
          Voltar
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {task?.description}
          </Card.Subtitle>
          <Card.Text>
            <Badge variant={task?.finished ? "success" : "warning"}>
              {task?.finished ? "Finalizado" : "Pendente"}
            </Badge>{" "}
          </Card.Text>
          <strong>Data de criação: </strong>
          <Badge variant="info">{formateDate(task?.created_at)}</Badge> <br />
          <strong>Data de atualização:</strong>
          <Badge variant="info">{formateDate(task?.updated_at)}</Badge>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detail;
