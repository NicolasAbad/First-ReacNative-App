import React, {useState} from 'react';

import {Alert, StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';

export default function App() {

  const[enteredGoalText, setEnteredGoalText] = useState("");
  const[courseGoals, setCourseGoals] = useState([]);
  const[goalToDeleteIndex, setGoalToDeleteIndex] = useState ("");
  

  function deleteGoalHandler() {
    const index = parseInt(goalToDeleteIndex);
  
    if (isNaN(index) || index < 0 || index >= courseGoals.length) {
      alert("Invalid index");
      return;
    }
  
    setCourseGoals(currentGoals => {
      const newGoals = [];
  
      for (let i = 0; i < currentGoals.length; i++) {
        if (i !== index) {
          newGoals.push(currentGoals[i]); // keep all except the one at index
        }
      }
  
      return newGoals;
    });
  
    setGoalToDeleteIndex('');
  }
  
 // Function to handle goal update using Alert prompt
 function handleUpdateGoal(index) {
  Alert.prompt(
    "Update Goal", // Title of the alert
    "Enter the updated goal:", // Message of the alert
    [
      {
        text: "Cancel", // Cancel button
        style: "cancel",
      },
      {
        text: "Update", // Update button
        onPress: (newGoal) => {
          if (newGoal.trim()) {
            setCourseGoals(currentGoals => {
              const updatedGoals = [...currentGoals];
              updatedGoals[index] = newGoal; // Update goal at the selected index
              return updatedGoals;
            });
          }
        },
      },
    ],
    "plain-text", // Input type (simple text input)
    courseGoals[index], // Initial text (the existing goal)
    "default" // Keyboard type (default)
  );
}

function deleteAllHandler() {
  Alert.alert(
    "Confirm Delete", // Title of the alert
    "Are you sure you want to delete all goals?", // Message of the alert
    [
      {
        text: "Cancel", // Text for the cancel button
        style: "cancel", // Button style (cancel)
      },
      {
        text: "Delete", // Text for the delete button
        style: "destructive", // Button style (red, destructive)
        onPress: () => setCourseGoals([]) // Action to clear goals if delete is pressed
      }
    ]
  );
}


 
    function addGoalHandler() {
      setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      enteredGoalText,
      ]);
      setEnteredGoalText(""); 
      }
  


  return (
  <View style={styles.appContainer}>
  <View style ={styles.inputContainer}>
  <TextInput 
    style={styles.textInput} 
    placeholder="Enter your goal" 
    onChangeText={setEnteredGoalText} 
    value={enteredGoalText} />
  <Button title="Add Goal" onPress={addGoalHandler}/>
  </View>


  <View style ={styles.inputContainer}>
  <TextInput 
    style={styles.textInput} 
    placeholder="Delete a Goal"
    keyboardType='numeric' 
    onChangeText={setGoalToDeleteIndex} 
    value={goalToDeleteIndex} />
  <Button title="Delete Goal" onPress={deleteGoalHandler}/>
  </View>

  <View style={styles.goalsContainer}>
  
  <ScrollView contentContainerStyle={styles.scrollView}>
  <Text style={{ fontWeight: 'bold' }}>List of Goals:</Text>
    {courseGoals.map((goal, index) => (
      <View key={index} style={styles.goalSquare}>
      <Text style={styles.goalText}>{index} - {goal}</Text>
      <Button title="Update" onPress={() => handleUpdateGoal(index)} />
    </View>
    ))}
    <Button title="Delete All" onPress={deleteAllHandler}/>
  </ScrollView>
  </View>
  </View>
  );
  }

 
    const styles = StyleSheet.create({
    appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    },
    inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 24,
    },
    textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
    },
    goalsContainer: {
    flex: 5,
    },
    
      scrollView:{
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:10,

      },
      goalSquare: {
        backgroundColor: '#ffcccb', // light red background color
        width: '80%', // 80% of parent width
        marginVertical: 10, // space between squares
        padding: 10,
        borderRadius: 10, // rounded corners
        alignItems: 'center', // center the text inside the square
      },
      goalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // dark text color
      }

    });