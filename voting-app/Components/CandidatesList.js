import React, { useState, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../store/userSlice";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
const hostURL = "192.168.29.192" || "localhost";

export default Candidates_list = ({ candidate }) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const storeUser = useCallback(async(user) => {
    dispatch(setUserData(user));
  },[dispatch])

  const userData = useSelector((state) => state.user.data);
  let selectedCandidate;
  const [isLoading, setIsLoading] = useState(false);
  const [isFingerPrintverified, setIsFingerPrintverified] = useState(false);


  const handleVote = async (id) => {
    const voterId = userData[2];


    const castVote = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`http://${hostURL}:4000/vote`, 
        {candidateId: id, voterId: voterId});
        console.log(response.data);

        const update = await axios.post(`http://${hostURL}:4000/updateVoter`, {voterId})
        console.log(update.data);
      
        const { data } = await axios.post(`http://${hostURL}:4000/voterAuth`, {voterId});
        console.log(data.voterDetails);
        storeUser(data.voterDetails);   

        if(response){
          Alert.alert("Successfully Voted")
          // [
          //   {text: 'OK', onPress: () =>  navigation.navigate('Home')}
          // ],{ cancelable: false });
          setIsLoading(false);
        }
  
      }catch (error){
        console.log(error); 
      }
    }

    try {
      const { success, data } = await LocalAuthentication.authenticateAsync({
        promptMessage: "Scan your fingerprint to continue",
      });

      if(success) {
        setIsFingerPrintverified(true);
        Alert.alert("Success", "Fingerprint verified successfully!");
        castVote();

      }else if(isFingerPrintverified) {
        alert("Authentication failed");
      }

    }catch(error) {
      alert("Authentication failed");
    }
  }

  return (
    <View>
     <ActivityIndicator animating={isLoading} size="large" />
      <View
        key={candidate.id}
        style={[
          styles.candidateItem,
          selectedCandidate === candidate.id && styles.selectedCandidate,
        ]}
      >
        <View style={styles.candidatePhotoContainer}>
          <Image source={candidate.photo} style={styles.candidatePhoto} />
        </View>
        <View style={styles.candidateInfoContainer}>
          <Text style={styles.candidateName}>{candidate.name}</Text>
          <Text style={styles.candidateParty}>{candidate.party}</Text>
        </View>
        <View style={styles.voteButtonContainer}>
          <TouchableOpacity
            style={styles.voteButton}
            onPress={() => userData[3] === true ? Alert.alert("Error", "You have already voted") : handleVote(candidate.id)}
          >
            <Text style={styles.voteButtonText}>Vote</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  candidateItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  selectedCandidate: {
    backgroundColor: "#F9FAFC",
  },
  candidatePhotoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
  candidatePhoto: {
    width: 50,
    height: 50,
  },
  candidateInfoContainer: {
    flex: 1,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  candidateParty: {
    color: "#6B7280",
    marginTop: 5,
  },
  voteButtonContainer: {
    marginLeft: 10,
  },
  voteButton: {
    backgroundColor: "#6B46C1",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  voteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});


