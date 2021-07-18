import React, {useRef, createRef} from 'react';
import {SafeAreaView, Dimensions, StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Image, Pressable, Share} from 'react-native';
import COLORS from '../../consts/colors';
import {Icon, Button, SocialIcon} from 'react-native-elements';
import contactDetails from '../../consts/contacts';
//import Share from 'react-native-share';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

const {width} = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {
	const contactItems = [
			{
	id: '1',
	name:'Adam Smith',
	image: require('../../images/default4.png'),
	price: 'R950',
	liked: true,
	verified: true,
	number: '0123456789',
	},
	{
	id: '2',
	name:'Jane Doe',
	image: require('../../images/default2.png'),
	price: 'R1950',
	liked: false,
	verified: false,
	number: '0123456789',
	},
	{
	id: '3',
	name:'Lelouche V Britannia',
	image: require('../../images/default5.png'),
	price: 'R2550',
	liked: true,
	verified: true,
	number: '0123456789',
	},
	{
	id: '4',
	name:'Whitney Davids',
	image: require('../../images/default3.png'),
	price: 'R350',
	liked: false,
	verified: false,
	number: '0123456789',
	}
			
	];
	
	const customShare = async (index, contactItems, myVar) => {
		myVar = myVar || 'text' 
		//console.log(contactItems.item)
		const messageText = 'Hi, this is the contact you wanted, name: '+contactItems.item.name+' number: '+contactItems.item.number;
		//console.log(messageText);
		const url = await captureRef(viewRef.current[index], {
				format: 'png',
				quality:0.7	
		});
		const shareOptions = {
			mimeType: 'image/png',
			dialogTitle: 'Share via:',			

			//without using expo:

			//message: 'This is a text message',
			
			//url: url
			//url:files.image2
			//urls:[files.image1, files.image2]
			//urls: files.samplePdf
			//import files from another directory, convert these files to base64
			//write them in the following format: 
			//module.exports ={image1:'data:image/png;base64,/9jssddade...', samplepdf:'data:application/pdf;base64,sfefsdf...',appLogo:'data:/image/png;base64,fdadfda...'}
		}
		try {
			
			if (myVar =='image') {
			//const ShareResponse = await Share.open(shareOptions);
				const ShareResponse = await Sharing.shareAsync(url, shareOptions);
			} else {
				const result = await Share.share({
					message:messageText,
				});
				
			}
			
		} catch(error) {
			console.log('Error =>', error);
		}
	};
	
	const viewRef = useRef(contactItems.map(() => createRef()));
	const ListContacts = () => {

		const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
		

		return (
			<View style={style.categoriesContainer}>
			{contactItems.map((item, index) => (
			<TouchableOpacity activeOpacity={0.8} key={index} ref={viewRef.current[index]} onPress={()=>setSelectedCategoryIndex(index)}>
			
				<View  style={[style.categoryItemsBtn, {backgroundColor:selectedCategoryIndex == index ? COLORS.darkblue: COLORS.light},]}>
					<View>
						<Image source={item.image} style={{height: 50, width:50, borderRadius: 50, backgroundColor:'#fff'}}/>
					</View>
					<View style={{width:'50%', flexDirection:'column'}}>
						<Text style={[style.categoryText, {color:selectedCategoryIndex == index ? COLORS.white: COLORS.dark}]}>{item.name}</Text>
						<Text style={[style.categoryNumber, {color:selectedCategoryIndex == index ? COLORS.white: COLORS.dark}]}>{item.number}</Text>
					</View>
					<View style={{width:'40%', flexDirection:'row'}}>
						<Icon name="heart" style={{paddingHorizontal:10}} type="material-community" size={20} color={item.liked == true ? COLORS.red: COLORS.grey}/>
						<TouchableOpacity onPress={()=>{const myVar='image'; customShare(index, {item}, myVar)}}>
							<Icon style={{paddingHorizontal:10}} name="message-image-outline" type="material-community" size={20} color={selectedCategoryIndex == index ? COLORS.white: COLORS.dark}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{const myVar='text'; customShare(index, {item}, myVar)}}>
							<Icon style={{paddingHorizontal:10}} name="chat-outline" type="material-community" size={20} color={selectedCategoryIndex == index ? COLORS.white: COLORS.dark}/>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
			))}
			
			</View>
		);
	};
	
	return (
	<SafeAreaView style={{backgroundColor: COLORS.white, flex:1}}>
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={style.header}>
				<Icon name="sort" size={28} color={COLORS.dark} />
				<Icon name="account-multiple-plus" type="material-community" size={28} color={COLORS.dark} />
				
			</View>
			<Text style={style.headerTitle}>Contacts</Text>
			<View style={{
				flexDirection: 'row',
				justifyContent:'space-between',
				padding:20,
				}}>
					<View style={style.searchInputContainer}>
						<Icon name="search" color={COLORS.dark} size={25}/>
						<TextInput style={{marginLeft:20, width:'100%'}} placeholder="Search contact..."/>
					</View>
					
				</View>
				
				<ListContacts />
				
				
		</ScrollView>		
	</SafeAreaView>
	);
	
};

const style = StyleSheet.create({

	iconContainer: {
		height: 25,
		width: 25,
		backgroundColor: COLORS.white,
		position:'absolute',
		right:15,
		top: 15,
		borderRadius: 15,
		justifyContent:'center',
		alignItems: 'center',
		elevation:2
	},
	popularCard: {
		height: 90,
		width: width -100,
		backgroundColor: COLORS.white,
		elevation: 10,
		marginVertical:20,
		flexDirection: 'row',
		borderRadius:10,
		marginRight: 10,
		marginLeft: 10,
	},
	rating: {
		fontWeight: 'bold',
		color: COLORS.grey,
		fontSize: 12,
	}, 
	price: {
		fontWeight:'bold',
		color: COLORS.grey,
		fontSize: 12,
	},
	cardName: {
		marginTop:10,
		fontSize:12,
		color: COLORS.dark,
		fontWeight: 'bold',
	},
	card: {
		height:240,
		backgroundColor: COLORS.white,
		elevation:10,
		width:width/2.5,
		marginRight: 10,
		marginLeft:10,
		padding:10,
		marginVertical:20,
		borderRadius:10,
	},
	categoriesContainer: {
		marginVertical:10,
		marginTop:10,
		justifyContent: 'space-between',
		padding: 20
	},
	categoryItemsBtn: {
		flexDirection: 'row',
		backgroundColor: COLORS.light,
		padding:10,
		borderRadius:7,
		alignItems:'center',
		marginVertical:2
	},
	categoryText: {
		fontSize: 18,
		fontWeight: 'bold',
		color:COLORS.dark, 
		marginLeft:5
	}, 
	categoryNumber: {
		fontSize: 13,
		color:COLORS.dark, 
		marginLeft:5
	},
	header: {
		paddingVertical: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20
	}, 
	headerTitle: {
		fontSize:23,
		fontWeight: 'bold',
		width: '55%',
		lineHeight:30,
		paddingHorizontal: 20
	},
	searchInputContainer: {
		height:50,
		backgroundColor: COLORS.light,
		flex:1,
		borderRadius:12,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal:20,
	},
	sortBtn: {
		backgroundColor:COLORS.white,
		color: COLORS.dark,
		height:50,
		width:50,
		borderRadius:12,
		justifyContent:"center",
		alignItems: "center",
		marginLeft:10
	},
	title: {
		fontSize:  18,
		fontWeight: 'bold',
		paddingHorizontal: 20,
	},
});
export default HomeScreen;