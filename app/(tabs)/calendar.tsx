import React, { useState } from "react";
import { StyleSheet, Button, TextInput, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TabThreeScreen() {
  const [step, setStep] = useState("taskName");
  const [taskName, setTaskName] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [tasks, setTasks] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  const addTask = () => {
    if (
      taskName.trim() !== "" &&
      selectedDay !== "" &&
      taskDescription.trim() !== "" &&
      taskTime.trim() !== ""
    ) {
      const newTask = {
        name: taskName,
        description: taskDescription,
        time: taskTime,
      };
      const newTasks = {
        ...tasks,
        [selectedDay]: [...(tasks[selectedDay] || []), newTask],
      };
      setTasks(newTasks);
      setTaskName("");
      setTaskDescription("");
      setTaskTime("");
      setStep("taskName");
    }
  };

  return (
    <ThemedView style={styles.container}>
      {Object.keys(tasks).length === 0 ? (
        <Text>No tiene tareas programadas</Text>
      ) : (
        Object.keys(tasks).map((day) => (
          <View key={day}>
            <Text>{day}:</Text>
            {tasks[day].map((task, index) => (
              <Text key={index}>
                {task.time}: {task.name} - {task.description}
              </Text>
            ))}
          </View>
        ))
      )}
      {step === "taskName" && (
        <ThemedView style={styles.notesContainer}>
          <TextInput
            style={styles.input}
            placeholder="Agregar nombre de la tarea"
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
          />
          <Button title="Continuar" onPress={() => setStep("calendar")} />
        </ThemedView>
      )}
      {step === "calendar" && (
        <ThemedView style={styles.notesContainer}>
          <ThemedText type="title">Calendario</ThemedText>
          <Calendar
            style={styles.calendar}
            onDayPress={(day) => {
              setSelectedDay(day.dateString);
              setMarkedDates({
                [day.dateString]: { selected: true, selectedColor: "skyblue" },
              });
            }}
            markedDates={markedDates}
          />
          <Button title="Atrás" onPress={() => setStep("taskName")} />
          <Button
            title="Continuar"
            onPress={() => setStep("taskDescription")}
          />
        </ThemedView>
      )}
      {step === "taskDescription" && (
        <ThemedView style={styles.notesContainer}>
          <TextInput
            style={styles.input}
            placeholder="Agregar descripción de la tarea"
            value={taskDescription}
            onChangeText={(text) => setTaskDescription(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Agregar hora de la tarea"
            value={taskTime}
            onChangeText={(text) => setTaskTime(text)}
          />
          <Button title="Atrás" onPress={() => setStep("calendar")} />
          <Button title="Guardar Tarea" onPress={addTask} />
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notesContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  calendar: {
    marginBottom: 20,
  },
});
