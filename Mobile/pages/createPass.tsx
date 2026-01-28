import { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Props = {
  onBackToLogin?: () => void;
  onReset?: (password: string, confirm: string) => void;
};

export default function CreatePass({ onBackToLogin, onReset }: Props) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const rules = useMemo(() => ({
    len: password.length >= 8,
    upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }), [password]);

  const score = Object.values(rules).filter(Boolean).length;
  const strength =
    score === 4 ? { label: 'Strong', color: '#00b67a', bar: [1, 1, 1, 1] } :
    score === 3 ? { label: 'Good', color: '#3abf6b', bar: [1, 1, 1, 0.4] } :
    score === 2 ? { label: 'Fair', color: '#f1b300', bar: [1, 1, 0.2, 0] } :
    password.length > 0 ? { label: 'Weak', color: '#f15c5c', bar: [1, 0.2, 0, 0] } :
    { label: '', color: '#d9d9d9', bar: [0, 0, 0, 0] };

  const passwordsMatch = password.length > 0 && confirm.length > 0 && password === confirm;

  const handleReset = () => {
    if (onReset) onReset(password, confirm);
  };

  const ruleItem = (ok: boolean, text: string) => (
    <View style={styles.ruleRow}>
      <Text style={[styles.ruleIcon, { color: ok ? '#00b67a' : '#d90429' }]}>
        {ok ? '✓' : '○'}
      </Text>
      <Text style={[styles.ruleText, { color: ok ? '#00b67a' : '#444' }]}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>💼</Text>
          </View>
        </View>

        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>Your new password must be different{'\n'}from previous ones</Text>

        {/* New Password */}
        <View style={styles.inputRow}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            placeholderTextColor="#9aa0a6"
            secureTextEntry={!showPass}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Text style={styles.eyeIcon}>👁️</Text>
          </TouchableOpacity>
        </View>

        {/* Strength */}
        <View style={styles.strengthRow}>
          <Text style={styles.strengthLabel}>Password Strength</Text>
          <Text style={[styles.strengthValue, { color: strength.color }]}>{strength.label}</Text>
        </View>
        <View style={styles.strengthBars}>
          {strength.bar.map((v, i) => (
            <View
              key={i}
              style={[
                styles.strengthBar,
                { opacity: v, backgroundColor: strength.color },
              ]}
            />
          ))}
        </View>

        {/* Confirm Password */}
        <View style={[styles.inputRow, !passwordsMatch && confirm ? styles.inputError : null]}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            placeholderTextColor="#9aa0a6"
            secureTextEntry={!showConfirm}
            value={confirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Text style={styles.eyeIcon}>👁️</Text>
          </TouchableOpacity>
        </View>

        {/* Rules */}
        <View style={styles.rulesList}>
          {ruleItem(rules.len, 'At least 8 characters')}
          {ruleItem(rules.upperLower, 'Uppercase & lowercase letters')}
          {ruleItem(rules.number, 'At least one number')}
          {ruleItem(rules.special, 'Special character (!@#$%^&*)')}
        </View>

        {/* Match warning */}
        {!passwordsMatch && confirm.length > 0 && (
          <View style={styles.warnRow}>
            <Text style={styles.warnDot}>•</Text>
            <Text style={styles.warnText}>Passwords do not match</Text>
          </View>
        )}

        {/* Reset Button */}
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={onBackToLogin} style={styles.backLinkWrap}>
          <Text style={styles.backLink}>Back to Login</Text>
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
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  iconWrap: {
    marginBottom: 18,
    shadowColor: '#d88cf7',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
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
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 18,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
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
  eyeIcon: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 4,
  },
  button: {
    width: '100%',
    backgroundColor: '#0a2847',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  backLinkWrap: {
    paddingVertical: 4,
  },
  backLink: {
    fontSize: 13,
    color: '#0a5ac7',
    fontWeight: '700',
  },
  strengthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  strengthLabel: {
    fontSize: 12,
    color: '#777',
  },
  strengthValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 6,
    width: '100%',
    marginBottom: 12,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#d9d9d9',
    opacity: 0.3,
  },
  rulesList: {
    width: '100%',
    marginBottom: 10,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ruleIcon: {
    fontSize: 13,
    marginRight: 8,
  },
  ruleText: {
    fontSize: 13,
  },
  warnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffe8c7',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  warnDot: {
    color: '#ff9f1c',
    marginRight: 6,
  },
  warnText: {
    color: '#c95a00',
    fontSize: 13,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#f15c5c',
  },
});