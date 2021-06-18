import React, {useState} from 'react';
import { Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const [selectedLanguage, setSelectedLanguage] = useState();

const Picker = () => {
  return (
    <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        </Picker>
  );
}

export default Picker;