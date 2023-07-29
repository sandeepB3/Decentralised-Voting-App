import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from "react-native";
import axios from 'axios';
const hostURL = "192.168.29.192" || "localhost";

const ElectionScreen = () => {
  const navigation = useNavigation();
  const [votingStart, setVotingStart] = useState(false);
  const [votingEnd, setVotingEnd] = useState(false);

  const elections = [
    { id: 1, name: 'VidhanSabha', date: 'April 25, 2023', location: 'Andheri', image: require('../assets/election_symbol.png') },
    { id: 2, name: 'LokaSabha', date: 'May 1, 2023', location: 'Ghatkopar', image: require('../assets/election_symbol.png') },
    { id: 3, name: 'Election 3', date: 'May 15, 2023', location: 'Dadar', image: require('../assets/indian_assembly.jpg') },
    { id: 4, name: 'Election 4', date: 'June 1, 2023', location: 'Mulund', image: require('../assets/election_symbol.png')},
    { id: 5, name: 'Election 5', date: 'June 15, 2023', location: 'Bandra', image: require('../assets/indian_assembly.jpg') },
    { id: 6, name: 'Election 6', date: 'July 1, 2023', location: 'Vasai', image: require('../assets/election_symbol.png') },
  ];

  useEffect(() => {
    const votingStatus = async () => {
      const { data } = await axios.get(`http://${hostURL}:4000/votingStatus`);
      setVotingStart(data.votingStarted);
      setVotingEnd(data.votingEnded);
    }
    votingStatus(); 
  },[])

  return (
    <ScrollView style={styles.container}>
      {elections.map((election) => (
        <TouchableOpacity key={election.id} style={styles.card} 
        onPress={() => (votingStart && !votingEnd) ? navigation.navigate('DetailsElection', { electionId: election.id })
        : (votingEnd ? Alert.alert("Voting has ended") : Alert.alert("Voting hasn't started yet"))}>
          <Image source={election.image} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name}>{election.name}</Text>
            <Text style={styles.location}>{election.location}</Text>
            <Text style={styles.date}>{election.date}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F7F7F7',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 6,
    height: 200,
    flexDirection: 'row',
  },
  image: {
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#888888',
  },
  date: {
    fontSize: 16,
    color: '#888888',
  },
});

export default ElectionScreen;
