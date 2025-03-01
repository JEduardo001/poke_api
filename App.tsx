import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';

interface Pokemon {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemons();
  }, []);

  const toggleSelection = (name: string) => {
    if (selectedPokemons.includes(name)) {
      setSelectedPokemons(selectedPokemons.filter(pokemon => pokemon !== name));
    } else {
      setSelectedPokemons([...selectedPokemons, name]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémons</Text>
        <View style={{flexDirection: "row",alignItems: "center", justifyContent: "space-around"}}>
          <Text>Buscar</Text>
          <TextInput
            style={styles.input}
            //onChangeText={}
            //value={}
          />
           
          <TouchableOpacity style={styles.button} onPress={() => console.log(' boton presionado')}>
            <Icon name="filter" size={30} color="blach" style={{ margin: 10 }} />
          </TouchableOpacity>
        </View>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <CheckBox
              title={item.name}
              checked={selectedPokemons.includes(item.name)}
              onPress={() => toggleSelection(item.name)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center"
  },
  item: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    //backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default App;
