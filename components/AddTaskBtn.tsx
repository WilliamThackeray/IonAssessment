import { View, Text, StyleSheet, Button, Alert } from "react-native";

type AddTaskProps = {
  addFunc: Function;
  taskTitle: string;
};

export function AddTaskBtn(props: AddTaskProps) {
  return (
    <>
      <Button
        title="Add Task"
        onPress={() => {
          props.addFunc(props.taskTitle);
        }}
      />
    </>
  );
}
