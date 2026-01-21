import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar } from 'react-native';

type Props = {
  email?: string;
  onVerify?: (code: string) => void;
  onResend?: () => void;
  onBack?: () => void; // NEW
};

export default function VerifyEmail({ email = 'elijah@gmail.com', onVerify, onResend, onBack }: Props) {
  const [code, setCode] = useState(Array(6).fill(''));
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (val: string, idx: number) => {
    const digit = val.slice(-1);
    const next = [...code];
    next[idx] = digit;
    setCode(next);
    if (digit && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleVerify = () => onVerify?.(code.join(''));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.card}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.iconWrap}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>✉️</Text>
          </View>
        </View>

        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>We’ve sent a 6-digit code to</Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.codeRow}>
          {code.map((c, i) => (
            <TextInput
              key={i}
              ref={r => {
                if (r) inputs.current[i] = r;
              }}
              style={styles.codeBox}
              value={c}
              onChangeText={v => handleChange(v, i)}
              keyboardType="number-pad"
              maxLength={1}
              returnKeyType="next"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify Code</Text>
        </TouchableOpacity>

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn’t receive the code? </Text>
          <TouchableOpacity onPress={onResend}>
            <Text style={styles.resendLink}>Resend Code (0:30)</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 20,
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
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  email: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  codeBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    fontSize: 18,
    color: '#111',
  },
  button: {
    width: '100%',
    backgroundColor: '#0a2847',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 13,
    color: '#666',
  },
  resendLink: {
    fontSize: 13,
    color: '#0a5ac7',
    fontWeight: '700',
  },
  backBtn: {
    position: 'absolute',
    top: 12,
    left: 12,
    padding: 8,
    zIndex: 1,
  },
  backIcon: {
    fontSize: 20,
    color: '#111',
  },
});