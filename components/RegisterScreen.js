import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [gender, setGender] = useState("male");

  const strength = useMemo(() => {
    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password))
      return "Strong";
    if (password.length >= 6) return "Medium";
    if (password.length === 0) return "nothing";
    return "Weak";
  }, [password]);

  const passwordsMatch = password === confirm && confirm.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons name="heart" size={80} color="#ff5f6d" />
          <Text style={styles.title}>DateMe</Text>
          <Text style={styles.subtitle}>
            Join The Macedonia Dating Platform DateMe and find your perfect match
          </Text>
        </View>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        {/* Phone */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.prefix}>+389</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="12345678"
            keyboardType="phone-pad"
            onChangeText={setPhone}
            value={phone}
          />
        </View>

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.strength}>
          Strength:{" "}
          <Text style={styles[strength.toLowerCase()]}>{strength}</Text>
        </Text>

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={!showConfirm}
            onChangeText={setConfirm}
            value={confirm}
          />
          <TouchableOpacity onPress={() => setShowConfirm((prev) => !prev)}>
            <Ionicons
              name={showConfirm ? "eye" : "eye-off"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {!passwordsMatch && confirm.length > 0 && (
          <Text style={styles.error}>Passwords do not match</Text>
        )}

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderWrapper}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "male" && styles.genderSelected,
            ]}
            onPress={() => setGender("male")}
          >
            <Ionicons
              name="male"
              size={24}
              color={gender === "male" ? "#ff5f6d" : "#666"}
            />
            <Text
              style={[
                styles.genderText,
                gender === "male" && styles.genderTextSelected,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "female" && styles.genderSelected,
            ]}
            onPress={() => setGender("female")}
          >
            <Ionicons
              name="female"
              size={24}
              color={gender === "female" ? "#ff5f6d" : "#666"}
            />
            <Text
              style={[
                styles.genderText,
                gender === "female" && styles.genderTextSelected,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            // Optional: validate form before navigating
            navigation.navigate("ProfileSetup");
          }}
        >
          <Text style={styles.submitButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20, alignItems: "stretch" },
  header: { alignItems: "center", marginBottom: 30, marginTop: 30 },
  title: { fontSize: 28, fontWeight: "bold", marginTop: 10, color: "#333" },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 4 },

  label: { fontSize: 16, color: "#333", marginBottom: 8, marginTop: 16 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  icon: { marginRight: 8 },
  prefix: { marginRight: 8, fontSize: 16, color: "#333" },
  input: { flex: 1, fontSize: 16, color: "#333" },

  strength: { marginTop: 4, fontSize: 12, color: "#666" },
  weak: { color: "#d9534f" },
  medium: { color: "#f0ad4e" },
  strong: { color: "#5cb85c" },
  error: { marginTop: 4, fontSize: 12, color: "#d9534f" },

  genderWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  genderButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  genderSelected: { backgroundColor: "#ffe5e8", borderColor: "#ff5f6d" },
  genderText: { marginLeft: 6, fontSize: 16, color: "#666" },
  genderTextSelected: { color: "#ff5f6d" },

  submitButton: {
    marginTop: 30,
    backgroundColor: "#ff5f6d",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
