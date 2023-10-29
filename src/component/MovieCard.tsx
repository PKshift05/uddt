import  React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Image, FlatList } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const genres: any = {
  1:'Âm nhạc',
  2:'Bí ẩn',
  3:'Chiến tranh',
  4:'Chiến tranh & Chính trị',
  5:'Chính kịch',
  6:'Gia đình',
  7:'Hài',
  8:'Giật gân',
  9:'Hành động',
  10:'Hành động & phiêu lưu',
  11:'Kinh dị',
  12:'Hoạt hình',
  13:'Kì ảo',
  14:'Lãng mạn',
  15:'Lịch sử',
  16:'Tài liệu',
  17:'Tin tức',
  18:'Tội phạm',
  19:'Khoa học viên tưởng',
  20:'Viễn tây',
  21:'Thần thoại'
};

const MovieCard = (props: any) => {
  return (
      <TouchableOpacity onPress={() =>props.cardFunction()}>
        <View style={[
          styles.container, 
          props.shouldMarginatedAtEnd 
          ? props.isFirst
          ? {marginLeft:SPACING.space_36}
          : props.isLast
          ? {marginRight:SPACING.space_36} 
          : {}
          :{},
          props.shouldMarginatedAround? {margin:SPACING.space_12}:{},
          {maxWidth: props.cardWidth}
          ]}>
          <Image 
          style={[styles.cardImage,{width:props.cardWidth}]}
          source={{uri:props.imagePath}}/>
          <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>

          <View style={styles.genreContainer}>         
                <View style={styles.GenreBox}>
                  <Text style={styles.textGenre}>{props.genre}</Text>
                </View>
          </View>
        </View>
      </TouchableOpacity>
   
  );
};


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex:1,
      backgroundColor:COLORS.Black
    },
    cardImage:{
      aspectRatio:2/3,
      borderRadius:BORDERRADIUS.radius_20,
      
    },
    textTitle:{
      
      fontSize:FONTSIZE.size_24,
      color:COLORS.White,
      textAlign:'center',
      textTransform:'uppercase',
      paddingVertical:SPACING.space_10,
    },
    genreContainer:{
        flex:1,
        flexDirection:'row',
        gap: SPACING.space_20,
        flexWrap: 'wrap',
        justifyContent:'center',
    },
    textGenre:{
        color: COLORS.White,
        textAlign:'center'
    },
    GenreBox:{ 
        borderColor:COLORS.WhiteRGBA50,
        borderWidth:1,
        paddingVertical:SPACING.space_4,
        paddingHorizontal:SPACING.space_10,
        borderRadius:BORDERRADIUS.radius_20,},
});

export default MovieCard;