import { CheckSquare, Square } from 'phosphor-react';
import styled from 'styled-components';
import { TaskType } from '../@Types/taskType';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

function Task({ task, setTask }: { task: TaskType, setTask: Dispatch<SetStateAction<TaskType[]>> }) {
  const { id, name, isComplete } = task;

  return (
    <Container key={id}>
      <Title>{name}</Title>
      <Button
        onClick={() => {
          axios.put(`https://api20221202134334.azurewebsites.net/api/ToDoItems/${id}`, {
            id,
            name,
            isComplete: !isComplete,
          }).then((response) => {
            setTask((prevState) => {
              return prevState.map((task) => {
                if (task.id === id) {
                  return response.data;
                }
                return task;
              });
            });
          });
        }}
      >{isComplete ? <CheckSquare size={24} /> : <Square size={24} />}</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export default Task;
