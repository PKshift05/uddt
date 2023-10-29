import * as React from 'react';
import { useState  , createContext, useContext } from 'react';
import { Text, View, StyleSheet ,TextInput, TouchableOpacity} from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import {Ionicons, AntDesign } from "@expo/vector-icons";




const InputHeader = (props: any) => {
    
    const [NameMovie,setSearchText] = useState<string>('');
    console.log(NameMovie);
  return (
    <View style={styles.inputBox}>
        <TextInput 
            style={styles.textIput} 
            onChangeText={NameMovie => setSearchText(NameMovie)}
            value={NameMovie}
            placeholder="Search your Movie..."
            placeholderTextColor={COLORS.WhiteRGBA15}
        />
        <TouchableOpacity style={styles.searchIcon} onPress={() => props.searchFunction(NameMovie)} >
            <Ionicons name='search' color={COLORS.Orange} size={FONTSIZE.size_24}>
            </Ionicons>
            
        </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
    inputBox: {
        display: 'flex',
        paddingVertical:SPACING.space_8,
        paddingHorizontal:SPACING.space_24,
        borderWidth:2,
        borderColor:COLORS.WhiteRGBA15,
        borderRadius:BORDERRADIUS.radius_20,
        flexDirection: 'row', 
    },
    textIput:{
        width:"90%",
        
        fontSize: FONTSIZE.size_14,
        color:COLORS.White,
    },
    searchIcon:{
        alignItems:'center',
        justifyContent:'center',
        padding: SPACING.space_4,
    }
});

export default InputHeader;