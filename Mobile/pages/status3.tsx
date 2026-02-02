import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useState } from 'react';

export default function Status3({ onGetStarted }: { onGetStarted: (data: any) => void }) {
  const [cvFile, setCvFile] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleGetStarted = () => {
    if (!cvFile.trim()) {
      Alert.alert('Error', 'Please upload your CV');
      return;
    }

    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to the terms and conditions');
      return;
    }

    onGetStarted({
      cvFile,
      portfolioUrl,
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
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Upload your CV to get Analyzed{'\n'}and receive job offers.
      </Text>

      {/* CV Upload */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>CV</Text>
        <TextInput
          style={styles.input}
          placeholder="Upload your CV in PDF"
          placeholderTextColor="#999"
          value={cvFile}
          onChangeText={setCvFile}
        />

        {/* Portfolio URL */}
        <Text style={styles.label}>Portfolio (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="URL links"
          placeholderTextColor="#999"
          value={portfolioUrl}
          onChangeText={setPortfolioUrl}
          keyboardType="url"
          autoCapitalize="none"
        />

        {/* Terms Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxContainer} 
          onPress={() => setAgreedToTerms(!agreedToTerms)}
        >
          <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
            {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>
            I agree to the terms and conditions and privacy{'\n'}policy of the application.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={[styles.getStartedButton, !agreedToTerms && styles.getStartedButtonDisabled]}
        onPress={handleGetStarted}
      >
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
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
    marginBottom: 40,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    lineHeight: 32,
  },
  formContainer: {
    flex: 1,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 12,
    color: '#fff',
    flex: 1,
    lineHeight: 18,
  },
  getStartedButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  getStartedButtonDisabled: {
    opacity: 0.5,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
