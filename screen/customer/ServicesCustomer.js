import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import Video from "react-native-video";

const ServicesCustomer = ({ navigation }) => {
  const [servicesData, setServicesData] = useState({
    services: [],
    cornServices: [],
  });
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const collections = [
    { key: "services", collection: "SERVICES" },
    { key: "cornServices", collection: "CORNPOP" },
  ];

  // Fetch data from Firestore
  const fetchData = async () => {
    try {
      const fetchedData = {};
      for (const { key, collection } of collections) {
        const snapshot = await firestore().collection(collection).get();
        fetchedData[key] = snapshot.docs
          .map(doc => {
            const data = doc.data();
            return data && doc.id ? { id: doc.id, ...data } : null; // Chỉ thêm các mục hợp lệ
          })
          .filter(item => item); // Loại bỏ null/undefined
      }
      setServicesData(fetchedData);
      setFilteredServices(fetchedData.services);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter services based on search query
  useEffect(() => {
    setFilteredServices(
      servicesData.services.filter(
        service =>
          service &&
          service.serviceName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, servicesData.services]);

  // Render item for FlatList
const renderServiceItem = ({ item, navigateTo }) => {
  const { serviceName, price, image } = item;
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate(navigateTo, { item })} // Điều hướng chính xác
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.thumbnail} />
      ) : (
        <View style={styles.placeholderThumbnail}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.movieTitle}>{serviceName}</Text>
        <Text style={styles.price}>{price} VND</Text>
      </View>
    </TouchableOpacity>
  );
};


  return (
    <ScrollView style={styles.container}>
      {/* Video */}
      <Video
        source={require("../../image/AssetMovie.mp4")}
        style={styles.video}
        resizeMode="cover"
        repeat
        paused={false}
      />

      {/* Search Bar */}
      <TextInput
        label="Search Service By Name"
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={setSearchQuery}
        mode="outlined"
      />

      {/* Day Buttons */}
      <ScrollView
horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysWrapper}
      >
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dayButton}
            onPress={() =>
              navigation.navigate("FilterByDate", { selectedDay: day })
            }
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Services */}
      <Text style={styles.headerText}>Featured Services 2024</Text>
      <FlatList
        data={filteredServices}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          renderServiceItem({ item, navigateTo: "detailmovie" })
        }
        horizontal
        contentContainerStyle={styles.listContentHorizontal}
        showsHorizontalScrollIndicator={false}
      />

     {/* CornPop Services */}
     <Text style={styles.headerText}>Service CornPop Online</Text>
     <FlatList
        data={servicesData.cornServices}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          renderServiceItem({ item, navigateTo: "corndetail" })
        }
        horizontal
        contentContainerStyle={styles.listContentHorizontal}
        showsHorizontalScrollIndicator={false}
      />



      {/* Upcoming Services */}
      <Text style={styles.headerText}>Upcoming Services</Text>
      <FlatList
        data={filteredServices}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          renderServiceItem({ item, navigateTo: "detailmovie" })
        }
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  video: { width: "100%", height: 200, marginTop: 70, marginBottom: 30 },
  searchBar: { margin: 10 },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#444", margin: 10 },
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  thumbnail: { width: 100, height: 100, borderRadius: 8, marginBottom: 10 },
  placeholderThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { fontSize: 12, color: "#999" },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  price: { fontSize: 14, color: "#666", marginTop: 4 },
listContentHorizontal: { paddingBottom: 20, paddingHorizontal: 10 },
  listContent: { paddingBottom: 20, paddingHorizontal: 10 },
  daysWrapper: { marginHorizontal: 10, marginVertical: 20 },
  dayButton: {
    backgroundColor: "#6200EE",
    borderRadius: 8,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dayText: { fontSize: 14, color: "#fff", fontWeight: "bold" },
});

export default ServicesCustomer;