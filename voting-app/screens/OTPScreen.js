import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const hostURL = "192.168.43.192" || "localhost";

const OTPScreen = () => {
  
  const userData = useSelector(state => state.user.data);
  console.log(userData);
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(true);
  const navigation = useNavigation();
  
  useEffect(() => {
    async function fetchOTP(){
      try{
        const response = await axios.post(`http://${hostURL}:4000/otpAuth`, {mobileNumber: userData[1]})
        console.log(response.data);
      }catch(e){
        console.log(e);
      }
    }
    fetchOTP();
  },[sent]) 

  const handleVerifyOTP = async() => {
    // handle OTP verification logic
    try{
      const response = await axios.post(`http://${hostURL}:4000/otpVerify`,
      {mobileNumber: userData[1], otp: otp});
      console.log(response.data);
      
      if(response.data === 'approved'){
        navigation.replace('Home');
      }
    
    }catch(e){
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Didn't receive the code?</Text>
        <TouchableOpacity onPress={() => setSent(false)}>
          <Text style={styles.footerLink}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    fontSize: 25,
    padding: 15,
  },
  button: {
    backgroundColor: '#6B46C1',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    fontSize: 20,
    marginRight: 5,
  },
  footerLink: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default OTPScreen;
