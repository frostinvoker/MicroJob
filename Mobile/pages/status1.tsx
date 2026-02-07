import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Status1({ onNext, onSkip }: { onNext: (status: string) => void; onSkip: () => void }) {
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const handleNext = () => {
    if (selectedStatus) {
      onNext(selectedStatus);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon} />
          <Text style={styles.logoText}>MicroJob</Text>
        </View>
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Are you currently looking{'\n'}for new opportunities
      </Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {/* Option 1 */}
        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedStatus === 'actively-looking' && styles.optionCardSelected,
          ]}
          onPress={() => setSelectedStatus('actively-looking')}
        >
          <Text style={styles.optionTitle}>Yes, Actively Looking</Text>
          <Text style={styles.optionDescription}>
            Receive exclusive job invites and get contracted by employers
          </Text>
        </TouchableOpacity>

        {/* Option 2 */}
        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedStatus === 'open-to-offers' && styles.optionCardSelected,
          ]}
          onPress={() => setSelectedStatus('open-to-offers')}
        >
          <Text style={styles.optionTitle}>I'm Open Job for seeking</Text>
          <Text style={styles.optionDescription}>
            Choose this to occasionally receive exclusive job invites.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, !selectedStatus && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={!selectedStatus}
      >
        <Text style={styles.nextButtonText}>Next</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  skipText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    lineHeight: 32,
  },
  optionsContainer: {
    flex: 1,
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: '#4a90e2',
    backgroundColor: '#f0f7ff',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
