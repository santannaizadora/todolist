import Task from './components/Task';
import styled from 'styled-components';
import { TaskType } from './@Types/taskType';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState<TaskType []>([
    {
      id: 1,
      name: 'passear com o cachorro',
      isComplete: false,
    },
    {
      id: 2,
      name: 'lavar louça',
      isComplete: true,
    },
  ]);

  const getTasks = async () => {
    await axios('https://api20221202134334.azurewebsites.net/api/ToDoItems/', {
      method: 'GET',
    }).then((response) => {
      setTasks(response.data);
    });
  };

  useEffect(() => {
    getTasks();
  }, tasks);

  return (
    <Container>
      <Title>Minhas tarefas</Title>
      {tasks.map((task) => {
        return <Task task={tasks} setTask={setTasks} />;
      })}
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 20px;
`;

const Title = styled.h1``;

export default App;
