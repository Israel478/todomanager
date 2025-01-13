import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Animated, 
  Easing, 
  Dimensions, 
  ScrollView, 
  Alert, 
  FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Predefined categories with colors
const CATEGORIES = [
  { id: 1, name: 'Groceries', color: '#FF6B6B' },
  { id: 2, name: 'Electronics', color: '#4ECDC4' },
  { id: 3, name: 'Clothing', color: '#45B7D1' },
  { id: 4, name: 'Others', color: '#96CEB4' },
];

const PRIORITIES = [
  { id: 'low', name: 'Low', color: '#96CEB4' },
  { id: 'medium', name: 'Medium', color: '#FFEEAD' },
  { id: 'high', name: 'High', color: '#FF6B6B' },
];

const ShoppingTodoForm = ({ navigation }) => {
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [priority, setPriority] = useState(PRIORITIES[0]);
  const [taskList, setTaskList] = useState([]); // Holds tasks
  const inputAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(inputAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleSubmit = () => {
    if (text.trim()) {
      const task = {
        id: Math.random().toString(), // Generate a unique ID
        text,
        category: selectedCategory,
        priority,
      };
      setTaskList((prevTasks) => [...prevTasks, task]);  // Add the task to the state
      setText('');
      Alert.alert('Task Added', 'Your shopping item has been successfully added!');
    } else {
      Alert.alert('Validation', 'Please enter a valid task!');
    }
  };

  const renderTask = ({ item }) => (
    <View style={[styles.taskItem, { borderColor: item.priority.color }]}>
      <Text style={styles.taskText}>{item.text}</Text>
      <Text style={styles.priorityText}>{item.priority.name}</Text>
      <Text style={[styles.categoryText, { backgroundColor: item.category.color }]}>
        {item.category.name}
      </Text>
    </View>
  );

  return (
    <View style={styles.formContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Animated.View 
        style={[styles.inputWrapper, { transform: [{ translateX: inputAnimation.interpolate({ inputRange: [0, 1], outputRange: [-width, 0] }) }] }]} >
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a shopping item"
          placeholderTextColor="#999"
          onSubmitEditing={handleSubmit}
        />
      </Animated.View>

      <View style={styles.categoryContainer}>
        <Text style={styles.sectionTitle}>Category:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {CATEGORIES.map(category => (
            <TouchableOpacity 
              key={category.id} 
              style={[styles.categoryChip, { backgroundColor: category.color }, selectedCategory.id === category.id && styles.selectedCategory]} 
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.priorityContainer}>
        <Text style={styles.sectionTitle}>Priority:</Text>
        <View style={styles.priorityButtons}>
          {PRIORITIES.map(p => (
            <TouchableOpacity
              key={p.id}
              style={[styles.priorityChip, { backgroundColor: p.color }, priority.id === p.id && styles.selectedPriority]}
              onPress={() => setPriority(p)}
            >
              <Text style={styles.priorityText}>{p.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Animated.View style={{ opacity: buttonAnimation, transform: [{ scale: buttonAnimation }] }}>
        <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Task List */}
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 50,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 14,
    fontSize: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    color: '#1c1c1e',
  },
  categoryContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1c1c1e',
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategory: {
    transform: [{ scale: 1.05 }],
  },
  categoryText: {
    color: '#fff',
    fontWeight: '600',
  },
  priorityContainer: {
    marginTop: 16,
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priorityChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedPriority: {
    transform: [{ scale: 1.05 }],
  },
  priorityText: {
    color: '#1c1c1e',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  taskList: {
    marginTop: 20,
  },
  taskListContent: {
    paddingBottom: 100,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  taskText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  priorityText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  categoryText: {
    padding: 4,
    marginTop: 8,
    fontSize: 12,
    color: '#fff',
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default ShoppingTodoForm;
