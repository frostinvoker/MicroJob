import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Props = {
  onBackToLogin?: () => void;
};

export default function PassChanged({ onBackToLogin }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.iconWrap}>
        <View style={styles.icon}>
          <Text style={styles.check}>✓</Text>
        </View>
      </View>

      <Text style={styles.title}>Password changed</Text>
      <Text style={styles.subtitle}>Your password has been changed{'\n'}successfully</Text>

      <TouchableOpacity style={styles.button} onPress={onBackToLogin}>
        <Text style={styles.buttonText}>Back to login</Text>
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
    paddingHorizontal: 24,
  },
  iconWrap: {
    marginBottom: 24,
  },
  icon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    fontSize: 46,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#b7c0cc',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 18,
  },
  button: {
    width: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});