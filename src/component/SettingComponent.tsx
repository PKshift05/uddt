import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import { IconButton } from 'react-native-paper';


const SettingComponent = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <IconButton icon={props.icon} size={25} iconColor={COLORS.White} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subtitle}>{props.subheading}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View >
        <IconButton icon="chevron-right" size={25} iconColor={COLORS.White}/>
        
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_15,
    borderBottomColor:COLORS.Grey,
  },
  title:{
    fontSize:FONTSIZE.size_18,
    color:COLORS.White,
  },
  subtitle:{
    fontSize:FONTSIZE.size_14,
    color:COLORS.Grey,
  },
  settingContainer:{
    flex:1,
  },
  icon:{
    marginRight:20,
    
  },
});

export default SettingComponent;