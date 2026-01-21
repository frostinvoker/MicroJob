import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { useState } from 'react';
import "./global.css";
import Screen1 from './pages/Screen1';
import Screen2 from './pages/Screen2';
import Screen3 from './pages/Screen3';
import Screen4 from './pages/Screen4';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import SignSuccess from './pages/signSuccess';
import ForgotPass from './pages/forgotPass';
import VerifyEmail from './pages/verifyEmail';
import PassChanged from './pages/passChanged';
import CreatePass from './pages/createPass';
import Dashboard from './pages/pages1/dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const slideAnim = new Animated.Value(0);

  const handleNext = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen(currentScreen + 1);
      slideAnim.setValue(0);
    });
  };

  const handleGoToSignUp = () => {
    setCurrentScreen(4); // SignUp is at index 4
  };

  const handleGoToSignIn = () => {
    setCurrentScreen(5); // SignIn is at index 5
  };

  const handleGoToSuccess = () => {
    setCurrentScreen(6); // SignSuccess is at index 6
  };

  const handleGoToForgot = () => {
    setCurrentScreen(7); // ForgotPass is at index 7
  };

  const handleGoToVerify = () => {
    setCurrentScreen(8); // VerifyEmail
  };

  const handleGoToCreatePass = () => {
    setCurrentScreen(9); // CreatePass
  };

  const handleGoToPassChanged = () => {
    setCurrentScreen(10); // PassChanged
  };

  const handleGoToDashboard = () => {
    setCurrentScreen(11); // Dashboard index
  };

  const handleBack = () => {
    setCurrentScreen(currentScreen - 1);
  };

  const handleLogout = () => {
    setCurrentScreen(5); // SignIn index
  };

  const screens = [
    <Screen1 key="screen1" onNext={handleNext} />,
    <Screen2 key="screen2" onNext={handleNext} />,
    <Screen3 key="screen3" onNext={handleNext} />,
    <Screen4 key="screen4" onNext={handleGoToSignUp} />,
    <SignUp key="signup" onBack={handleBack} onNavigateToSignIn={handleGoToSignIn} onNavigateToSuccess={handleGoToSuccess} />,
    <SignIn key="signin" onBack={handleBack} onNavigateToSignUp={handleGoToSignUp} onNavigateToForgot={handleGoToForgot} onLogin={handleGoToDashboard} />,
    <SignSuccess key="success" onBackToLogin={handleGoToSignIn} />,
    <ForgotPass key="forgot" onBack={handleGoToSignIn} onSendReset={handleGoToVerify} />,
    <VerifyEmail key="verify" onVerify={handleGoToCreatePass} onResend={() => {}} onBack={handleGoToForgot} />,
    <CreatePass key="createpass" onBackToLogin={handleGoToSignIn} onReset={handleGoToPassChanged} />,
    <PassChanged key="passchanged" onBackToLogin={handleGoToSignIn} />,
    <Dashboard key="dashboard" onLogout={handleLogout} />,
  ];

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  return (
    <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX }],
        }}
      >
        {screens[currentScreen]}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
