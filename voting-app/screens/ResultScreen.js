import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import axios from 'axios';
import { BarChart } from 'react-native-chart-kit';
const hostURL = "192.168.43.192" || "localhost";


export default ResultScreen = () => {
  const [winner, setWinner] = useState(undefined);
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    async function getCandidates() {
      try {
        const response = await axios.get(`http://${hostURL}:4000/candidateList`);
        console.log(response.data.candidates);
        setCandidateList(response.data.candidates);
      } catch (err) {
        console.log(err);
      }
    }
    getCandidates();
  }, []);

  const handlePress = async () => {
    try {
      const { data } = await axios.get(`http://${hostURL}:4000/winner`);
      console.log(data.winner);
      setWinner(data.winner);
    } catch (err) {
      console.log(err);
    }
  };


  
  
  
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
        <View style={styles.chartContainer}>
        <Text>{"\n\n"}</Text>
          <BarChart
            data={{
              labels: candidateList.map(result => result[0]),
              datasets: [
                {
                  data: candidateList.map(result => result[1]),
                },
              ],
            }}
            width={screenWidth - 40}
            height={200}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(107, 70, 193, ${opacity})`,
            }}
            style={styles.chart}
          />
        </View>
    

        <Text>{"\n"}</Text>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Result</Text>
        </TouchableOpacity>

        {winner !== undefined ? (
          <View style={styles.resultContainer}>
            <Image source={require('../assets/trophy.jpeg')} style={styles.trophy} />
            <Text style={styles.winnerText}>Winner: {winner}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.notAnnouncedText}>Winner not announced yet</Text>
          </View>
        )}
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9FAFC',
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#00bfff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  notAnnouncedText: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#aaa',
    marginBottom: 20,
  },
  winnerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6B46C1',
  },
  trophy: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  result: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chart: {
    borderRadius: 16,
  },
});


