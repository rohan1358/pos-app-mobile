import React, {Component} from 'react';
import {
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControlBase,
  Button,
} from 'react-native';
import {
  Content,
  ListItem,
  Left,
  Thumbnail,
  Right,
  Picker,
  Label,
} from 'native-base';
import Edit from '../screen/Add';
import {ScrollView} from 'react-native-gesture-handler';
// import ListItemComp from '../components/ListItem'
import axios from 'axios';
import {View} from 'native-base';
import _ from 'lodash';
import {Card, Header} from 'react-native-elements';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Product: [],
      search: '',
      sort: '',
      idP: 0,
      cartItems: [],
    };
    console.log(this.state.search);
    console.log(this.state.sort);
    this.Search = _.debounce(this.Search, -0);
    console.log(this.state.Product.id);
  }
  componentDidUpdate() {
    console.log(this.state.sort);
  }

  // Sort
  handleChangeSort = e => {
    this.setState({sort: e});
    this.list();
    // console.warn(this.state.sort)
  };
  list = () => {
    this.setState(state => {
      if (state.sort === 'price') {
        state.Product.sort((a, b) => (a.price > b.price ? 1 : -1));
      } else if (state.sort === 'name') {
        state.Product.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else if (state.sort === 'id_categori') {
        state.Product.sort((a, b) => (a.id_categori > b.id_categori ? 1 : -1));
      } else {
        state.product.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
    });
  };

  //   deleteProduct = () => {
  //     axios.delete('http://192.168.1.198:8080/api/v1/product/'+ this.state.Product.id);
  //     console.log(this.state.Product.id)
  //     this.deleteProduct()
  // }

  //   deleteConfirm =() => {
  //     confirmAlert({
  //         title: "toko",
  //         message: `Are you sure you want to delete ${this.state.product.name}`,
  //         buttons:[
  //             {
  //                 label:'oke',
  //                 onClick:() => this.deleteProduct()
  //             },
  //             {
  //                 label:"no",
  //                 onClick:() => {}
  //             }
  //         ]
  //     })
  // }

  onSearch = key => {
    this.setState({
      search: key,
    });
    this.Search(key);
  };

  Search = async key => {
    if (key && key.length > 0) {
      try {
        const response = await axios.get(
          `http://192.168.1.198:8080/api/v1/product/search/${key}`,
        );
        this.setState({
          Product: response.data,
        });
      } catch (err) {
        console.log(err);
        return Alert.alert(
          'Error',
          'Error connection to server error',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
      }
    } else {
      this.getTv();
    }
  };
  componentDidMount() {
    this.getTv();
  }
  getTv = async () => {
    await axios.get('http://192.168.1.198:8080/api/v1/product/').then(res => {
      // console.warn(res.data.result.id)
      this.setState({
        Product: res.data.result,
      });
    });
  };

  listItemComp({item}) {
    // const {  name, image } = props.data;
    return (
      <View>
        <View>
          <Card
            image={{
              uri: `${item.image.replace('localhost', '192.168.1.198')}`,
            }}>
            <Text
              onPress={() => this.props.navigation.navigate('Detail')}
              style={{
                marginBottom: 10,
                marginTop: 20,
                fontSize: 25,
                fontWeight: 'bold',
                fontFamily: 'georgia',
              }}>
              {item.name}
            </Text>
            <Text style={styles.price} h4>
              Rp.{item.price}
            </Text>
            <Text h6 style={styles.description}>
              Added : {item.creat.slice(0, 10)}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{marginRight: 90}}>
                <Button type="clear" title="Add To Cart" />
              </View>
              <View style={{alignSelf: 'flex-end', backgroundColor: 'blue'}}>
                <Button
                  color="red"
                  title="delete"
                  onPress={() => this.deleteProduct(item.id)}
                />
              </View>
            </View>
          </Card>
        </View>
      </View>
      // <ScrollView style={{minHeight:80}}>
      //     <Content>
      //         <ListItem>
      //         <Left>
      //         {item.image ? (
      //             <Thumbnail style={styles.img} source={{uri: `${item.image.replace('localhost', '192.168.1.198')}`}} />
      //         ) : (
      //             <Text>No Image</Text>
      //         )}
      //         <Text style={{marginLeft: 10}} onPress={() => {this.props.navigation.navigate('Detail');}}>{item.name}</Text>
      //         <Text style={{marginLeft: 10}} onPress={() => {this.props.navigation.navigate('Detail');}}>{item.id}</Text>
      //         </Left>
      //         <Right>
      //         <TouchableOpacity
      //           onPress={() => {
      //             this.props.navigation.navigate('Add');
      //           }}>
      //           <View style={styles.button}>
      //             <Text style={styles.fontLogin}>Add</Text>
      //           </View>
      //         </TouchableOpacity>
      //         <TouchableOpacity
      //           onPress={()=>this.deleteProduct(item.id)}>
      //           <View style={styles.button}>
      //             <Text style={styles.fontLogin}>Delete</Text>
      //           </View>
      //         </TouchableOpacity>

      /* <TouchableOpacity
              onPress={() => {
                this.deleteProduct()
              }}>
              <View style={styles.button}>
                <Text style={styles.fontLogin}>Add</Text>
              </View>
            </TouchableOpacity> */
      //         </Right>
      //         </ListItem>
      //     </Content>
      // </ScrollView>
    );
  }

  // delete product
  deleteProduct(item) {
    axios.delete('http://192.168.1.198:8080/api/v1/product/' + item);
    alert('Success Delete Product');

    this.props.navigation.navigate('Home');
  }
  deleteConfirm() {
    Alert.alert(
      'Toko',
      {text: `Are you sure you want to delete ${this.state.product.name}`},
      [
        {
          text: 'Ask me later',
          onPress: () => this.deleteProduct(),
        },
        {
          text: 'Cancel',
          onPress: () => this.props.navigation.navigate('Home'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    confirmAlert({
      title: 'toko',
      message: `Are you sure you want to delete ${this.state.product.name}`,
      buttons: [
        {
          label: 'oke',
          onClick: () => this.deleteProduct(),
        },
        {
          label: 'no',
          onClick: () => {},
        },
      ],
    });
  }
  // --------------------------------------------------------------------------------- //

  render() {
    const Filter = () => {
      return (
        <View style={{flex: 1}}>
          <Picker
            selectedValue={this.state.sort}
            style={{height: 35}}
            onValueChange={value => this.handleChangeSort(value)}>
            <Picker.Item label="price" value="price" />
            <Picker.Item label="name" value="name" />
            <Picker.Item label="category" value="id_categori" />
          </Picker>
        </View>
      );
    };
    const {Product} = this.state;
    // console.warn(this.props.route.params.data);
    // console.warn('hello');

    return (
      <View style={{marginBottom: 50}}>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flex: 2,
              borderWidth: 0.5,
              borderColor: 'black',
              height: 35,
              border: 2,
              borderColor: 'blue',
              borderRadius: 10,
            }}>
            <TextInput
              style={{padding: 5, paddingLeft: 7, borderColor: 'blue'}}
              placeholder="Search"
              onChangeText={e => {
                this.onSearch(e);
              }}
            />
          </View>
          <View style={{justifyContent: 'center', height: 35, padding: 10}}>
            <Label>Sort :</Label>
          </View>
          <Filter onChange={this.handleChangeSort} />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={{alignItems: 'center', height: 35}}>
            <View>
              <Image
                style={{width: 30, height: 30}}
                source={require('../assets/image/lg.png')}></Image>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={Product}
          renderItem={
            (this.listItemComp.bind(this), this.listItemComp.bind(this))
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    marginRight: 10,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
});
