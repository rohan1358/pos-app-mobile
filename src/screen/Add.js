import React, {Component} from 'react';
import {
  Text,
  Button,
  View,
  Picker,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
// import { ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
// import { Button } from 'native-base';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: null,
      price: '',
      id_categori: '',
      stock: '',
    };

    // console.log(this.state.id_categori)
    // console.log(this.state.name)
    // console.log(this.state.image)
  }

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //  console.log(response.uri)
        this.setState({
          image: source,
          fileImage: response,
        });
      }
      // }
    });
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
  // ImagePicker.showImagePicker(options, response => {
  //   console.log('Response = ', response);
  //   // console.log(showImagePicker)

  //   if (response.didCancel) {
  //     console.log('User cancelled image picker');
  //   } else if (response.error) {
  //     console.log('ImagePicker Error: ', response.error);
  //   } else if (response.customButton) {
  //     console.log('User tapped custom button: ', response.customButton);
  //   } else {
  //     const source = {uri: response.uri};

  //     // You can also display the image using data:
  //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };

  //     this.setState({
  //       image: source,
  //     });
  //   }
  // });
  // };

  // selectImage = async () => {

  //     ImagePicker.showImagePicker({noDatat: true, mediaType:'photo'}, (response) => {
  //         console.log('Response = ', response);

  //         if (response.didCancel) {
  //           console.log('User cancelled image picker');
  //         } else if (response.error) {
  //           console.log('ImagePicker Error: ', response.error);
  //         } else if (response.customButton) {
  //           console.log('User tapped custom button: ', response.customButton);
  //         } else {

  //           // You can also display the image using data:
  //           // const source = { uri: 'data:image/jpeg;base64,' + response.data };

  //           this.setState({
  //             image:  response.uri,
  //           });
  //         }
  //       });
  // }

  // ImagePicker.showImagePicker(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       const source = { uri: response.uri };

  //       // You can also display the image using data:
  //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };

  //       this.setState({
  //         image: source,
  //       });
  //     }
  //   });

  // handlerChange = e => {
  //   console.log(e)
  // this.setState({
  //   [e.target.name]: [e.target.value],
  // });
  // };

  // handleChangeImage = e => {
  //   this.setState({image: e.target.files[0]});
  // };

  // handleChooseImage = () => {
  //     const options = {
  //         noData : true
  //     }
  //     ImagePicker.launchImageLibrary(options, response => {
  //         console.log("response", response);
  //     })
  // }

  handleAdd = () => {
    const dataFile = new FormData();
    dataFile.append('name', this.state.name);
    dataFile.append('price', this.state.price);

    dataFile.append('stock', this.state.stock);
    dataFile.append('image', {
      uri: this.state.fileImage.uri,
      type: 'image/jpeg',
      name: this.state.fileImage.fileName,
    });
    dataFile.append('id_categori', this.state.id_categori);

    axios
      .post('http://192.168.1.198:8080/api/v1/product/', dataFile, {
        headers: {'content-type': 'multipart/form-data'},
      })
      .then(() => {
        Alert.alert('add product success');
        this.props.navigation.navigate('Home');
      })
      .catch(() => {
        Alert.alert(Error);
      });
  };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontFamily: 'baskerville', fontSize: 25, margin: 25}}>
            Add Product
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{padding: 10, marginTop: 50}}>
            <TextInput
              style={styles.inp}
              placeholder="product name"
              onChangeText={name => this.setState({name})}></TextInput>
            <TextInput
              style={styles.inp}
              keyboardType={'number-pad'}
              placeholder="price"
              onChangeText={price => this.setState({price})}></TextInput>
            <TextInput
              style={styles.inp}
              keyboardType={'number-pad'}
              placeholder="Stock"></TextInput>
            <Picker
              selectedValue={this.state.id_categori}
              style={styles.inp}
              onValueChange={itemValue =>
                this.setState({id_categori: itemValue})
              }>
              <Picker.Item label="Category" value="0" />
              <Picker.Item label="Makanan" value="1" />
              <Picker.Item label="Minuman" value="2" />
            </Picker>
            <Button title="Select Image" onPress={this.handleChoosePhoto} />
            <Image
              source={{uri: this.state.image}}
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
                alignSelf: 'center',
                margin: 20,
              }}
            />

            <TouchableOpacity
              onPress={() => this.handleAdd()}
              style={{alignItems: 'center'}}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 15,
                    backgroundColor: 'blue',
                    padding: 10,
                    borderRadius: 5,
                    paddingLeft: 25,
                    paddingRight: 25,
                  }}>
                  Add Product
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inp: {
    // backgroundColor:"green",
    width: 300,
    borderRadius: 5,
    height: 35,
    padding: 7,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
});
