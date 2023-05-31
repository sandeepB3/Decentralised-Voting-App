import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const userData = useSelector((state) => state.user.data);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Image style={styles.Avatar} source={require('../assets/icon.jpeg')} /> 
        </View>
        <View style={{ backgroundColor: '#f2f2f2', borderRadius: 10, padding: 20 }}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ flex: 1, fontWeight: 'bold', color: '#444' }}>Name:</Text>
            <Text style={{ flex: 2 }}>{"  "}{userData[0]}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ flex: 1, fontWeight: 'bold', color: '#444' }}>Mobile No:</Text>
            <Text style={{ flex: 2 }}>{"  "}{userData[1]}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ flex: 1, fontWeight: 'bold', color: '#444' }}>Voter Id:</Text>
            <Text style={{ flex: 2 }}>{"  "}{userData[2]}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ flex: 1, fontWeight: 'bold', color: '#444' }}>Voted:</Text>
            <Text style={{ flex: 2 }}>{"  "}{''+userData[3]}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  Avatar:{
    width:100,
    height:100,
    justifyContent:'center',
  }
})

