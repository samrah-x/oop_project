import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  
  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8901",
    gender: "Male",
    location: "New York, NY",
    memberSince: "January 2023",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  interface InfoItemProps {
    label: string;
    value?: string;
    hasChevron?: boolean;
  }

  const renderInfoItem = ({ label, value, hasChevron = false }: InfoItemProps) => (
    <View style={styles.infoItem}>
      <View style={styles.infoItemLeft}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
      {hasChevron && (
        <TouchableOpacity onPress={() => router.push("/profile-details")}>
          <Ionicons name="chevron-forward" size={22} color="#0A2463" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#0A2463" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        {/* Profile Banner */}
        <LinearGradient
          colors={['#0A2463', '#3E92CC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.profileBanner}
        >
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileSubtitle}>
              <Ionicons name="location" size={14} color="#fff" /> {profileData.location}
            </Text>
            <Text style={styles.memberSince}>Member since {profileData.memberSince}</Text>
          </View>
        </LinearGradient>

        {/* Information Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            {renderInfoItem({ label: "Name", value: profileData.name })}
            {renderInfoItem({ label: "Email", value: profileData.email })}
            {renderInfoItem({ label: "Phone", value: profileData.phone })}
            {renderInfoItem({ label: "Gender", value: profileData.gender })}
            {renderInfoItem({ label: "Location", value: profileData.location })}
            {renderInfoItem({ label: "Change Password", value: "", hasChevron: true })}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => router.push("/profile-details")}
          >
            <Ionicons name="create-outline" size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={18} color="#0A2463" style={styles.buttonIcon} />
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
  },
  headerRightPlaceholder: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A2463",
  },
  profileBanner: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 25,
    shadowColor: "#0A2463",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImageContainer: {
    position: "relative",
    marginRight: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0A2463",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 4,
    opacity: 0.9,
  },
  memberSince: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A2463",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  infoSection: {
    marginBottom: 25,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 5,
    shadowColor: "#0A2463",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F5FA",
  },
  infoItemLeft: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#768CA0",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0A2463",
  },
  actionSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 15,
  },
  editButton: {
    backgroundColor: "#0A2463",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#0A2463",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E7EF",
  },
  buttonIcon: {
    marginRight: 10,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButtonText: {
    color: "#0A2463",
    fontWeight: "bold",
    fontSize: 16,
  },
});
