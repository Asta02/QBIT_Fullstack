import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

const fruits = [
  { fruitId: 1, fruitName: 'Apel', fruitType: 'IMPORT', stock: 10 },
  { fruitId: 2, fruitName: 'Kurma', fruitType: 'IMPORT', stock: 20 },
  { fruitId: 3, fruitName: 'apel', fruitType: 'IMPORT', stock: 50 },
  { fruitId: 4, fruitName: 'Manggis', fruitType: 'LOCAL', stock: 100 },
  { fruitId: 5, fruitName: 'Jeruk Bali', fruitType: 'LOCAL', stock: 10 },
  { fruitId: 6, fruitName: 'KURMA', fruitType: 'IMPORT', stock: 20 },
  { fruitId: 7, fruitName: 'Salak', fruitType: 'LOCAL', stock: 150 }
];

const comments = [
  { commentId: 1, commentContent: 'Hai', replies: [
    { commentId: 11, commentContent: 'Hai juga', replies: [
      { commentId: 111, commentContent: 'Haai juga hai jugaa' },
      { commentId: 112, commentContent: 'Haai juga hai jugaa' }
    ]},
    { commentId: 12, commentContent: 'Hai juga', replies: [
      { commentId: 121, commentContent: 'Haai juga hai jugaa' }
    ]},
  ]},
  { commentId: 2, commentContent: 'Halooo' }
];

const countComments = (comments) => {
  let count = 0;
  const countReplies = (replies) => {
    replies.forEach(reply => {
      count++;
      if (reply.replies) countReplies(reply.replies);
    });
  };
  countReplies(comments);
  return count;
};

const Case1 = () => {
  const fruitNames = [...new Set(fruits.map(fruit => fruit.fruitName))];
  const containers = fruits.reduce((acc, fruit) => {
    if (!acc[fruit.fruitType]) acc[fruit.fruitType] = [];
    acc[fruit.fruitType].push(fruit.fruitName);
    return acc;
  }, {});
  const totalStock = fruits.reduce((acc, fruit) => {
    acc[fruit.fruitType] = (acc[fruit.fruitType] || 0) + fruit.stock;
    return acc;
  }, {});

  return (
    <ScrollView style={[styles.pageContainer, { paddingVertical: 40 }]}>
      <Text style={styles.heading}>Case 1: Fruit Inventory</Text>
      <Text style={styles.subHeading}>1. Fruit names:</Text>
      <Text>{fruitNames.join(', ')}</Text>

      <Text style={styles.subHeading}>2. Containers needed:</Text>
      {Object.keys(containers).map(type => (
        <Text key={type}>- {type}: {containers[type].join(', ')}</Text>
      ))}

      <Text style={styles.subHeading}>3. Total stock per container:</Text>
      {Object.keys(totalStock).map(type => (
        <Text key={type}>- {type} stock: {totalStock[type]}</Text>
      ))}

    <Text style={styles.subHeading}>4. Apakah ada komentar terkait kasus di atas?</Text>
    <View style={styles1.listContainer}>
        <Text style={styles1.listItem}>- <Text style={styles.bold}>Duplikasi Entri:</Text> Terdapat duplikasi pada data buah dalam array <Text style={styles.code}>fruits</Text>. Contohnya, buah "Apel" muncul dua kali dengan nilai stok yang berbeda (10 dan 50), dan "Kurma" juga tercatat dua kali dengan kapitalisasi yang berbeda. Seharusnya, setiap buah memiliki <Text style={styles.code}>fruitId</Text> yang unik, namun ditemukan beberapa item dengan <Text style={styles.code}>fruitId</Text> yang sama, khususnya <Text style={styles.code}>fruitId: 5</Text>. Hal ini menunjukkan adanya kesalahan dalam penginputan data.</Text>

        <Text style={styles1.listItem}>- <Text style={styles.bold}>Sensitivitas Huruf Kapital:</Text> Nama buah seperti "Apel" dan "apel" dianggap sebagai dua buah yang berbeda karena perbedaan huruf kapital. Ini dapat menyebabkan kebingungan dan inkonsistensi dalam pengelolaan data. Sebaiknya, untuk menghindari masalah ini, nama buah distandarkan dengan format huruf kapital yang konsisten (misalnya, semua huruf besar atau semua huruf kecil).</Text>

        <Text style={styles1.listItem}>- <Text style={styles.bold}>Manajemen Stok:</Text> Penghitungan total stok sudah cukup jelas, tetapi akan lebih akurat jika setiap buah memiliki <Text style={styles.code}>fruitId</Text> yang unik dan tidak ada duplikasi. Sebaiknya, buah dengan <Text style={styles.code}>fruitId</Text> yang sama digabungkan untuk menghindari kesalahan dalam pencatatan stok dan memberikan gambaran yang lebih tepat mengenai jumlah stok yang tersedia.</Text>

        <Text style={styles1.listItem}>- <Text style={styles.bold}>Kesalahan pada ID Buah:</Text> Terdapat duplikasi pada <Text style={styles.code}>fruitId</Text> untuk kedua entri "Kurma" yang memiliki <Text style={styles.code}>fruitId: 5</Text>. Setiap buah seharusnya memiliki <Text style={styles.code}>fruitId</Text> yang unik untuk membedakan satu buah dengan yang lainnya. Masalah ini perlu segera diperbaiki agar data menjadi lebih konsisten dan teratur.</Text>
    </View>

    </ScrollView>
  );
};

const Case2 = () => {
  return (
    <ScrollView style={[styles.pageContainer, { paddingVertical: 40 }]}>
      <Text style={styles.heading}>Case 2: Total Comments</Text>
      <Text>Total comments, including replies: {countComments(comments)}</Text>
    </ScrollView>
  );
};


const Case3 = () => {
  return (
    <ScrollView style={[styles.pageContainer, { paddingVertical: 30 }]}>
      <Text style={styles.heading}>Case 3: UMKM Introduction</Text>

      {/* Logo with improved styling */}
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Business Name Section */}
      <Text style={styles.businessName}>UMKM Fresh Mart</Text>

      {/* Introduction Section */}
      <Text style={styles.introductionText}>
        Welcome to our UMKM! We specialize in locally sourced goods that promote sustainability.
        Our mission is to create a positive impact on the community while providing quality, 
        eco-friendly products that meet your needs.
      </Text>

      {/* Call-to-action or additional information */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaText}>
          Join us in supporting sustainable practices by exploring our products today!
        </Text>
      </View>

      {/* Items List Section */}
      <View style={styles.itemsContainer}>
        <Text style={styles.itemsHeading}>Our Products</Text>

        {/* Item 1 */}
        <TouchableOpacity style={styles.itemCard}>
          <Icon name="apple" size={30} color="#27AE60" style={styles.itemIcon} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>Fresh Organic Apples</Text>
            <Text style={styles.itemDescription}>Locally grown, pesticide-free apples, perfect for healthy snacking.</Text>
          </View>
        </TouchableOpacity>

        {/* Item 2 */}
        <TouchableOpacity style={styles.itemCard}>
          <Icon name="shopping-bag" size={30} color="#FF6347" style={styles.itemIcon} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>Eco-Friendly Tote Bags</Text>
            <Text style={styles.itemDescription}>Durable and reusable bags made from sustainable materials.</Text>
          </View>
        </TouchableOpacity>

        {/* Item 3 (Updated with gift icon) */}
        <TouchableOpacity style={styles.itemCard}>
          <Icon name="gift" size={30} color="#8E44AD" style={styles.itemIcon} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>Handmade Soaps</Text>
            <Text style={styles.itemDescription}>Natural soaps made with organic ingredients for gentle care.</Text>
          </View>
        </TouchableOpacity>

        {/* Item 4 (Updated with glass icon) */}
        <TouchableOpacity style={styles.itemCard}>
          <Icon name="glass" size={30} color="#F39C12" style={styles.itemIcon} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>Local Honey</Text>
            <Text style={styles.itemDescription}>Pure, raw honey sourced from local beekeepers.</Text>
          </View>
        </TouchableOpacity>

        {/* Item 5 */}
        <TouchableOpacity style={styles.itemCard}>
          <Icon name="cutlery" size={30} color="#2C3E50" style={styles.itemIcon} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>Sustainable Wooden Utensils</Text>
            <Text style={styles.itemDescription}>Handcrafted utensils made from eco-friendly wood.</Text>
          </View>
        </TouchableOpacity>
        <View style={{paddingVertical:30}}>
        </View>
      </View>
    </ScrollView>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Case1"
        screenOptions={({ route }) => ({
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Case1') {
              iconName = focused ? 'apple' : 'apple';
            } else if (route.name === 'Case2') {
              iconName = focused ? 'comment' : 'comment-outline';
            } else if (route.name === 'Case3') {
              iconName = focused ? 'store' : 'store-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Case1" component={Case1} />
        <Tab.Screen name="Case2" component={Case2} />
        <Tab.Screen name="Case3" component={Case3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles1 = StyleSheet.create({
  container: {
    padding: 20,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
  code: {
    fontFamily: 'monospace',
    color: 'grey',
  },
});

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#F4F4F9', // Light background color for the page
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginVertical: 8,
  },
  logo: {
    width: '80%',
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  businessName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#34495E',
    textAlign: 'center',
    marginVertical: 10,
  },
  introductionText: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 24,
    textAlign: 'justify',
    marginVertical: 15,
  },
  ctaContainer: {
    backgroundColor: '#27AE60', // Green background for call-to-action
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  itemsContainer: {
    marginTop: 30,
  },
  itemsHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 15,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 15, // Space between icon and text
  },
  itemTextContainer: {
    flex: 1, // Takes the remaining space for text
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  itemDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
});

export default App;
