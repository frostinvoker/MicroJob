import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';

export default function Status2({ onBack, onNext, onSkip }: { onBack: () => void; onNext: (profileData: any) => void; onSkip: () => void }) {
  const [professionalProfile, setProfessionalProfile] = useState('');
  const [profileSummary, setProfileSummary] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [location, setLocation] = useState('');

  const maxSummaryLength = 100;

  const handleNext = () => {
    onNext({
      professionalProfile,
      profileSummary,
      workExperience,
      location,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon} />
          <Text style={styles.logoText}>MicroJob</Text>
        </View>
        <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip →</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Professional Profile</Text>

      {/* Form */}
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        {/* Professional Profile */}
        <Text style={styles.label}>Professional Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g UI/UX Designer, Project Manager"
          placeholderTextColor="#999"
          value={professionalProfile}
          onChangeText={setProfessionalProfile}
        />

        {/* Profile Summary */}
        <Text style={styles.label}>Profile Summary</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Summary"
            placeholderTextColor="#999"
            value={profileSummary}
            onChangeText={(text) => {
              if (text.length <= maxSummaryLength) {
                setProfileSummary(text);
              }
            }}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{profileSummary.length}/{maxSummaryLength}</Text>
        </View>

        {/* Work Experience */}
        <Text style={styles.label}>Work Experience</Text>
        <TextInput
          style={styles.input}
          placeholder="Work Experience"
          placeholderTextColor="#999"
          value={workExperience}
          onChangeText={setWorkExperience}
        />

        {/* Location */}
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#999"
          value={location}
          onChangeText={setLocation}
        />
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2847',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  skipButton: {
    paddingVertical: 5,
  },
  skipText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 14,
    color: '#000',
  },
  textAreaContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    position: 'relative',
  },
  textArea: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    paddingBottom: 35,
    fontSize: 14,
    color: '#000',
    minHeight: 120,
  },
  charCount: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    fontSize: 12,
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  backButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
