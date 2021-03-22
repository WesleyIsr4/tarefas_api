import React, { useState, useEffect } from "react";
import { Badge, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../../service/api";
import moment from "moment";
import "./index.css";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get("/tasks");
    console.log(response);
    setTasks(response.data);
  }

  async function finishedTask(id: Number) {
    await api.patch(`tasks/${id}`);
    loadTasks();
  }

  async function deleteTask(id: Number) {
    await api.delete(`tasks/${id}`);
    loadTasks();
  }

  function formateDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  function newTask() {
    history.push("/tarefas_cadastro");
  }

  function editTask(id: number) {
    history.push(`/tarefas_cadastro/${id}`);
  }

  function viewTask(id: number) {
    history.push(`/tarefas/${id}`);
  }

  return (
    <div className="container">
      <div className="task-header">
        <h1>Task page</h1>
        <Button variant="dark" size="sm" onClick={newTask}>
          Nova tarefa
        </Button>
      </div>
      <Table
        striped
        borderless
        hover
        variant="dark"
        className="text-center table"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Data de criação</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{formateDate(task.created_at)}</td>
              <td>
                <Badge variant={task.finished ? "success" : "warning"}>
                  {task.finished ? "Finalizado" : "Pendente"}
                </Badge>{" "}
              </td>
              <td>
                <Button
                  disabled={task.finished}
                  size="sm"
                  variant="dark"
                  onClick={() => editTask(task.id)}
                >
                  Editar
                </Button>{" "}
                <Button
                  disabled={task.finished}
                  size="sm"
                  variant="dark"
                  onClick={() => finishedTask(task.id)}
                >
                  Finalizar
                </Button>{" "}
                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => viewTask(task.id)}
                >
                  Visualizar
                </Button>{" "}
                <Button
                  onClick={() => deleteTask(task.id)}
                  size="sm"
                  variant="dark"
                >
                  Remover
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tasks;
