import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';

export default function Screen3({ onNext }: { onNext: () => void }) {
  const DOT_SIZE = 8;
  const DOT_GAP = 8;
  const activeIndex = 2;
  const indicator = useRef(new Animated.Value(activeIndex)).current;
  const introAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(introAnim, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [introAnim]);

  const handleNext = () => {
    const nextIndex = Math.min(activeIndex + 1, 3);
    Animated.timing(indicator, {
      toValue: nextIndex,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onNext());
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      
      <Animated.View
        style={{
          alignItems: 'center',
          opacity: introAnim,
          transform: [
            {
              translateY: introAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 0],
              }),
            },
          ],
        }}
      >
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
      </Animated.View>
      
      {/* Dots */}
      <View style={styles.dotsContainer}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[styles.dot, styles.dotInactive]} />
        ))}
        <Animated.View
          style={[
            styles.dot,
            styles.dotActive,
            {
              transform: [
                {
                  translateX: indicator.interpolate({
                    inputRange: [0, 1, 2, 3],
                    outputRange: [0, DOT_SIZE + DOT_GAP, (DOT_SIZE + DOT_GAP) * 2, (DOT_SIZE + DOT_GAP) * 3],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      
      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
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
    position: 'relative',
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
  dotActive: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#fff',
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