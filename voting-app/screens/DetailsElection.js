import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import CandidatesList from "../Components/CandidatesList";
import axios from "axios";
const hostURL = "192.168.43.192" || "localhost";

const DetailsElection = ({ electionId }) => {
  const [candidateList, setCandidatesList] = useState([]);
  
  useEffect(() => {
    async function getCandidates(){
      try {
        const response = await axios.get(`http://${hostURL}:4000/candidateList`);
        if(response.data.candidates) setCandidatesList(response.data.candidates);

      }catch (error) {
        console.log(error);
      }
    }
    getCandidates();
  },[]);

  const elections = [
    {
      id: 1,
      name: "VidhanSabha",
      candidates: [
        {
          id: 0,
          name: candidateList[0]?.[0],
          party: "None of the below",
          photo: require("../assets/party_logo/nota.png"),
        },
        {
          id: 1,
          name: candidateList[1]?.[0],
          party: "Democratic Party",
          photo: require("../assets/party_logo/BJP_logo.svg"),
        },
        {
          id: 2,
          name: candidateList[2]?.[0],
          party: "Republican Party",
          photo: require("../assets/party_logo/aap.png"),
        },
        {
          id: 3,
          name: candidateList[3]?.[0],
          party: "Green Party",
          photo: require("../assets/party_logo/congress.png"),
        },
        {
          id: 4,
          name: candidateList[4]?.[0],
          party: "Nation Congress Party",
          photo: require("../assets/party_logo/ncp.jpeg"),
        }
      ],
    },
  ];

  return (
    <> 
      {elections.map((election) => (
        <SafeAreaView style={styles.container} key={election.id}>
          <View style={styles.header}>
            <Text style={styles.electionName}>{election.name}</Text>
            <Text style={styles.infoText}>Election Information</Text>
          </View>
          <View style={styles.candidatesContainer}>
            {election.candidates.map((candidate) => (
              <CandidatesList candidate={candidate} key={candidate.id} />
            ))}
          </View>
        </SafeAreaView> 
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFC",
    paddingHorizontal: 6,
  },
  header: {
    backgroundColor: "#6B46C1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  electionName: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    color: "#FFF",
    fontSize: 16,
  },
  candidatesContainer: {
    marginBottom: 20,
  },
});

export default DetailsElection;
