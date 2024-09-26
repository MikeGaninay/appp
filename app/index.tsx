import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingInput, setEditingInput] = useState("");

  // Add a new task
  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: taskInput }]);
      setTaskInput("");
    }
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Edit a task
  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit);
    setEditingInput(taskToEdit.text);
  };

  // Save the edited task
  const saveTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, text: editingInput } : task
      )
    );
    setEditingTask(null);
    setEditingInput("");
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ImageBackground
      source={{ uri: "https://th.bing.com/th/id/OIP.-HOMyiy88nQV5skJ7AuthgHaNK?rs=1&pid=ImgDetMain" }}
      resizeMode="cover"
      style={styles.background}
      onError={(error) => console.log("Image failed to load:", error)}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Todo List App</Text>

        {/* Search task (moved to the top) */}
        <TextInput
          style={styles.input}
          placeholder="Search tasks"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Input for new task */}
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <Button title="Add Task" onPress={addTask} />

        {/* Task list */}
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.task}>
              {editingTask && editingTask.id === item.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editingInput}
                    onChangeText={setEditingInput}
                  />
                  <Button title="Save" onPress={saveTask} />
                </>
              ) : (
                <>
                  <Text style={styles.taskText}>{item.text}</Text>
                  <TouchableOpacity onPress={() => editTask(item.id)}>
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <Text style={styles.deleteButton}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Adds opacity to see the background through
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
    color: "#333",
  },
  editButton: {
    color: "blue",
    marginRight: 10,
  },
  deleteButton: {
    color: "red",
  },
});
