import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const interestsList = [
  "Travel",
  "Photography",
  "Music",
  "Movies",
  "Reading",
  "Cooking",
  "Fitness",
  "Yoga",
  "Dancing",
  "Art",
  "Gaming",
  "Swimming",
  "Running",
  "Cycling",
  "Tennis",
  "Football",
  "Basketball",
  "Volleyball",
  "Wine Tasting",
  "Coffee",
  "Tea",
  "Fashion",
  "Shopping",
];

const intentions = [
  {
    id: "long-term",
    text: "Long-term relationship",
    icon: "💕",
    subtitle: "Ready for something serious and committed",
  },
  {
    id: "casual",
    text: "Something casual",
    icon: "😊",
    subtitle: "Open to seeing where things go",
  },
  {
    id: "friends",
    text: "New friends",
    icon: "👥",
    subtitle: "Looking to meet new people and making friends",
  },
  {
    id: "unsure",
    text: "Not sure yet",
    icon: "🤔",
    subtitle: "Still figuring out what I want",
  },
];

export default function ProfileSetupScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [location, setLocation] = useState("Skopje, Macedonia");
  const [distance, setDistance] = useState(75);
  const [ageRange, setAgeRange] = useState([22, 35]);
  const [lookingFor, setLookingFor] = useState(null);
  const [searchInterest, setSearchInterest] = useState("");

  const pickImage = async () => {
    if (images.length >= 6) {
      Alert.alert("Maximum photos reached", "You can only add up to 6 photos");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else if (selectedInterests.length < 6) {
      setSelectedInterests([...selectedInterests, interest]);
    } else {
      Alert.alert("Maximum interests", "You can select up to 3 interests");
    }
  };

  const handleSubmit = () => {
    if (images.length === 1) {
      Alert.alert("Photos required", "Please add at least one photo");
      return;
    }
    if (bio.length > 50) {
      Alert.alert("Bio too short", "Your bio must be at least 50 characters");
      return;
    }
    if (selectedInterests.length > 3) {
      Alert.alert("Interests required", "Please select at least 3 interests");
      return;
    }
    if (!lookingFor) {
      Alert.alert(
        "Selection required",
        "Please select what you are looking for"
      );
      return;
    }

    console.log("Profile data:", {
      images,
      bio,
      interests: selectedInterests,
      location,
      distance,
      ageRange,
      lookingFor,
    });
  };

  const filteredInterests = interestsList.filter((interest) =>
    interest.toLowerCase().includes(searchInterest.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Your Profile</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Profile Completion</Text>
        <Text style={styles.progressPercent}>4%</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="John Wick"
            keyboardType="email-address"
            onChangeText={setName}
            value={name}
          />
        </View>
        {/* Photos Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📷</Text>
            <Text style={styles.sectionTitle}>Photos</Text>
            <Text style={styles.required}>Required</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Add up to 6 photos. Your first photo will be your main profile
            picture.
          </Text>

          <View style={styles.photoGrid}>
            {[...Array(6)].map((_, index) => (
              <TouchableOpacity
                key={index}
                style={styles.photoBox}
                onPress={pickImage}
              >
                {images[index] ? (
                  <Image source={{ uri: images[index] }} style={styles.photo} />
                ) : (
                  <View style={styles.photoPlaceholder}>
                    <Ionicons name="camera" size={24} color="#999" />
                    <Text style={styles.photoPlaceholderText}>
                      {index === 0 ? "Add Main Photo" : "Add Photo"}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About Me Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📝</Text>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.required}>Required</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Write a bit about yourself. Be authentic. Minimum 50 characters.
          </Text>

          <TextInput
            style={styles.bioInput}
            placeholder="Tell people about yourself... What makes you unique? What are your interests and passions?"
            multiline
            value={bio}
            onChangeText={setBio}
            maxLength={500}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>
            {bio.length > 50
              ? `Minimum 50 characters required`
              : `${bio.length}/500`}
          </Text>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>❤️</Text>
            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={styles.required}>Required</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Select at least 3 interests to help us find your perfect match.
          </Text>

          <View style={styles.selectedInterestsBadge}>
            <Text style={styles.selectedInterestsText}>
              {selectedInterests.length}/3 selected (minimum 3)
            </Text>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Search interests..."
            value={searchInterest}
            onChangeText={setSearchInterest}
          />

          <Text style={styles.availableInterestsLabel}>
            Available interests:
          </Text>
          <View style={styles.interestsContainer}>
            {filteredInterests.map((interest) => (
              <TouchableOpacity
                key={interest}
                onPress={() => toggleInterest(interest)}
                style={[
                  styles.interestTag,
                  selectedInterests.includes(interest) &&
                    styles.selectedInterestTag,
                ]}
              >
                <Text
                  style={[
                    styles.interestText,
                    selectedInterests.includes(interest) &&
                      styles.selectedInterestText,
                  ]}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📍</Text>
            <Text style={styles.sectionTitle}>Location & Distance</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Set your location and how far you're willing to travel for potential
            matches.
          </Text>

          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Your Location</Text>
            <View style={styles.locationInputContainer}>
              <Ionicons name="location" size={16} color="#FF4458" />
              <Text style={styles.locationText}>{location}</Text>
              <TouchableOpacity>
                <Ionicons name="pencil" size={16} color="#999" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.distanceContainer}>
            <Text style={styles.distanceLabel}>Maximum Distance</Text>
            <Text style={styles.distanceValue}>{distance} km</Text>
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>1 km</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={100}
              step={1}
              value={distance}
              onValueChange={setDistance}
              minimumTrackTintColor="#FF4458"
              maximumTrackTintColor="#E0E0E0"
              thumbStyle={styles.sliderThumb}
            />
            <Text style={styles.sliderLabel}>100+ km</Text>
          </View>

          <View style={styles.locationNote}>
            <Ionicons name="information-circle" size={16} color="#4CAF50" />
            <Text style={styles.locationNoteText}>
              Your location helps us show you people nearby. We only show your
              city, never your exact location.
            </Text>
          </View>
        </View>

        {/* Age Preference Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🎂</Text>
            <Text style={styles.sectionTitle}>Age Preference</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Set the age range for potential matches.
          </Text>

          <View style={styles.ageRangeContainer}>
            <Text style={styles.ageRangeLabel}>Age Range</Text>
            <Text style={styles.ageRangeValue}>
              {ageRange[0]} - {ageRange[1]} years
            </Text>
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>18</Text>
            <MultiSlider
              values={ageRange}
              sliderLength={280}
              onValuesChange={(values) => setAgeRange(values)}
              min={18}
              max={65}
              step={1}
              allowOverlap={false}
              snapped={true}
              minMarkerOverlapDistance={40}
              customMarker={() => <View style={styles.rangeSliderThumb} />}
              trackStyle={styles.rangeSliderTrack}
              selectedStyle={styles.rangeSliderSelected}
              containerStyle={styles.rangeSliderContainer}
            />
            <Text style={styles.sliderLabel}>65</Text>
          </View>
        </View>

        {/* What are you looking for Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💬</Text>
            <Text style={styles.sectionTitle}>What are you looking for?</Text>
            <Text style={styles.required}>Required</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            This helps us show you people with similar intentions.
          </Text>

          {intentions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setLookingFor(option.id)}
              style={[
                styles.intentionButton,
                lookingFor === option.id && styles.selectedIntentionButton,
              ]}
            >
              <View style={styles.intentionContent}>
                <Text style={styles.intentionIcon}>{option.icon}</Text>
                <View style={styles.intentionTextContainer}>
                  <Text
                    style={[
                      styles.intentionTitle,
                      lookingFor === option.id && styles.selectedIntentionTitle,
                    ]}
                  >
                    {option.text}
                  </Text>
                  <Text
                    style={[
                      styles.intentionSubtitle,
                      lookingFor === option.id &&
                        styles.selectedIntentionSubtitle,
                    ]}
                  >
                    {option.subtitle}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyNotice}>
          <Ionicons name="shield-checkmark" size={16} color="#FFA726" />
          <Text style={styles.privacyText}>
            Your Privacy Matters to us. You control what you share and how you
            appear to others. You can always change these settings later.
          </Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            // Optional: validate form before navigating
            navigation.navigate("FeedScreen");
          }}
        >
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: { marginRight: 8 },
  prefix: { marginRight: 8, fontSize: 16, color: "#333" },
  input: { flex: 1, fontSize: 16, color: "#333" },
  label: { fontSize: 16, color: "#333", marginBottom: 8, marginTop: 16 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
    color: "#000",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  progressPercent: {
    fontSize: 14,
    color: "#FF4458",
    fontWeight: "600",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 16,
    borderRadius: 2,
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    width: "4%",
    backgroundColor: "#FF4458",
    borderRadius: 2,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  required: {
    fontSize: 12,
    color: "#FF4458",
    fontWeight: "500",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  photoBox: {
    width: "31%",
    aspectRatio: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 8,
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  photoPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  photoPlaceholderText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 4,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 8,
  },
  selectedInterestsBadge: {
    backgroundColor: "#FFF3CD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  selectedInterestsText: {
    fontSize: 14,
    color: "#856404",
    fontWeight: "500",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    marginBottom: 16,
  },
  availableInterestsLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  interestTag: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  selectedInterestTag: {
    backgroundColor: "#FF4458",
    borderColor: "#FF4458",
  },
  interestText: {
    fontSize: 14,
    color: "#333",
  },
  selectedInterestText: {
    color: "#FFFFFF",
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    marginLeft: 8,
  },
  distanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  distanceLabel: {
    fontSize: 14,
    color: "#666",
  },
  distanceValue: {
    fontSize: 16,
    color: "#FF4458",
    fontWeight: "600",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#999",
  },
  sliderThumb: {
    backgroundColor: "#FF4458",
  },
  locationNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E8F5E8",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  locationNoteText: {
    fontSize: 12,
    color: "#2E7D32",
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  ageRangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  ageRangeLabel: {
    fontSize: 14,
    color: "#666",
  },
  ageRangeValue: {
    fontSize: 16,
    color: "#FF4458",
    fontWeight: "600",
  },
  doubleSlider: {
    flex: 1,
    marginHorizontal: 8,
  },
  rangeSliderContainer: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
  },
  rangeSliderTrack: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  rangeSliderSelected: {
    backgroundColor: "#FF4458",
    height: 4,
    borderRadius: 2,
  },
  rangeSliderThumb: {
    width: 20,
    height: 20,
    backgroundColor: "#FF4458",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  intentionButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
  },
  selectedIntentionButton: {
    backgroundColor: "#FF4458",
    borderColor: "#FF4458",
  },
  intentionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  intentionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  intentionTextContainer: {
    flex: 1,
  },
  intentionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  selectedIntentionTitle: {
    color: "#FFFFFF",
  },
  intentionSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  selectedIntentionSubtitle: {
    color: "#FFFFFF",
  },
  privacyNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF8E1",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  privacyText: {
    fontSize: 14,
    color: "#E65100",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: "#FF4458",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
