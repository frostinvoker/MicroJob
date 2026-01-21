import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Props = {
  onBack?: () => void;
  onSendReset?: (email: string) => void;
};

export default function ForgotPass({ onBack, onSendReset }: Props) {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.card}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Icon */}
        <View style={styles.iconWrapper}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>✉️</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          No worries! Enter your email and we’ll send{'\n'}you reset instructions
        </Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>✉️</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#9aa0a6"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={() => onSendReset?.(email)}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CARD_MAX_WIDTH = 360;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2847',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
  },
  backIcon: {
    fontSize: 22,
    color: '#111',
  },
  iconWrapper: {
    marginTop: 16,
    marginBottom: 24,
    shadowColor: '#d88cf7',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  icon: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: '#0a2847',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 34,
    color: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  inputIcon: {
    fontSize: 16,
    color: '#8c8c8c',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#111',
  },
  button: {
    width: '100%',
    backgroundColor: '#0a2847',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});