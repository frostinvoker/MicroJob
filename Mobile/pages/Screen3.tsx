import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Screen3({ onNext }: { onNext: () => void }) {
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      
      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>💳</Text>
        </View>
      </View>
      
      {/* Title */}
      <Text style={styles.title}>Secure E-Wallet</Text>
      <Text style={styles.title}>System</Text>
      
      {/* Subtitle */}
      <Text style={styles.subtitle}>Get paid securely and</Text>
      <Text style={styles.subtitle}>instantly within the app.</Text>
      
      {/* Dots */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.dotInactive]}></View>
        <View style={[styles.dot, styles.dotInactive]}></View>
        <View style={styles.dot}></View>
        <View style={[styles.dot, styles.dotInactive]}></View>
      </View>
      
      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2847',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 40,
  },
  icon: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#0066cc',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#b0b0b0',
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 40,
    marginTop: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  dotInactive: {
    backgroundColor: '#4a6fa5',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 28,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});