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
import Jobs from './pages/pages1/Jobs';
import SavedJobs from './pages/pages1/SavedJobs';
import AppliedJobs from './pages/pages1/AppliedJobs';
import JobDetails from './pages/pages1/JobDetails';
import Profile from './pages/pages1/Profile';
import Settings from './pages/pages1/Settings';
import PersonalDetails from './pages/pages1/PersonalDetails';
import ChangePassword from './pages/pages1/ChangePassword';
import Notifications from './pages/pages1/Notifications';
import About from './pages/pages1/About';
import DeleteAccount from './pages/pages1/DeleteAccount';
import NotificationsInbox from './pages/pages1/NotificationsInbox';

type Job = {
  id: number;
  title: string;
  company: string;
  tags: string[];
  time: string;
  type: string;
  duration: string;
  salary: string;
  location?: string;
};

type SavedJob = {
  id: number;
  title: string;
  company: string;
  location: string;
  tags: string[];
  salary: string;
  logo?: string;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [appScreen, setAppScreen] = useState<'Dashboard' | 'Jobs' | 'SavedJobs' | 'AppliedJobs' | 'JobDetails' | 'Profile' | 'Settings' | 'PersonalDetails' | 'ChangePassword' | 'Notifications' | 'About' | 'DeleteAccount' | 'NotificationsInbox' | null>(null);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState('Home');
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
    setCurrentScreen(11);
    setAppScreen('Dashboard');
    setActiveTab('Home');
  };

  const handleBack = () => {
    if (appScreen) {
      setAppScreen('Dashboard');
    } else {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleLogout = () => {
    setCurrentScreen(5);
    setAppScreen(null);
  };

  // Dashboard navigation handlers
  const handleNavigateToJobs = () => {
    setAppScreen('Jobs');
    setActiveTab('Jobs');
  };

  const handleNavigateToSavedJobs = () => {
    setAppScreen('SavedJobs');
    setActiveTab('Saved');
  };

  const handleNavigateToJobDetails = (job: Job) => {
    setSelectedJob(job);
    setAppScreen('JobDetails');
  };

  const handleSaveJob = (job: Job) => {
    const exists = savedJobs.some(j => j.id === job.id);
    if (!exists) {
      const newSavedJob: SavedJob = {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location || 'Pangasinan, PH',
        tags: job.tags,
        salary: job.salary,
      };
      setSavedJobs([...savedJobs, newSavedJob]);
    }
  };

  const handleRemoveJob = (jobId: number) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Home') {
      setAppScreen('Dashboard');
    } else if (tab === 'Jobs') {
      setAppScreen('Jobs');
    } else if (tab === 'Saved') {
      setAppScreen('SavedJobs');
    } else if (tab === 'Profile') {
      setAppScreen('Profile');
    }
  };

  const screens = [
    <Screen1 onNext={handleNext} />,
    <Screen2 onNext={handleNext} />,
    <Screen3 onNext={handleNext} />,
    <Screen4 onNext={handleGoToSignUp} />,
    <SignUp onBack={handleBack} onNavigateToSignIn={handleGoToSignIn} onNavigateToSuccess={handleGoToSuccess} />,
    <SignIn onBack={handleBack} onNavigateToSignUp={handleGoToSignUp} onNavigateToForgot={handleGoToForgot} onLogin={handleGoToDashboard} />,
    <SignSuccess onBackToLogin={handleGoToSignIn} />,
    <ForgotPass onBack={handleGoToSignIn} onSendReset={handleGoToVerify} />,
    <VerifyEmail onVerify={handleGoToCreatePass} onResend={() => {}} onBack={handleGoToForgot} />,
    <CreatePass onBackToLogin={handleGoToSignIn} onReset={handleGoToPassChanged} />,
    <PassChanged onBackToLogin={handleGoToSignIn} />,
  ];

  // App screen renderer after login
  if (appScreen === 'JobDetails' && selectedJob) {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <JobDetails
          job={selectedJob}
          onBack={() => setAppScreen('Jobs')}
          onSaveJob={handleSaveJob}
          isSaved={savedJobs.some(j => j.id === selectedJob.id)}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </View>
    );
  }

  if (appScreen === 'SavedJobs') {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <SavedJobs
          savedJobs={savedJobs}
          onRemoveJob={handleRemoveJob}
          onViewDetails={(job: SavedJob) => {
            const jobData: Job = {
              id: job.id,
              title: job.title,
              company: job.company,
              tags: job.tags,
              time: '',
              type: '',
              duration: '',
              salary: job.salary,
              location: job.location,
            };
            handleNavigateToJobDetails(jobData);
          }}
          activeTab={activeTab}
          onTabPress={handleTabPress}
          onViewAppliedJobs={() => setAppScreen('AppliedJobs')}
        />
      </View>
    );
  }

  if (appScreen === 'AppliedJobs') {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <AppliedJobs
          onViewSavedJobs={() => setAppScreen('SavedJobs')}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </View>
    );
  }

  if (appScreen === 'Jobs') {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <Jobs
          onBack={() => {
            setAppScreen('Dashboard');
            setActiveTab('Home');
          }}
          onViewDetails={handleNavigateToJobDetails}
          onSaveJob={handleSaveJob}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </View>
    );
  }

  if (appScreen === 'DeleteAccount') {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <DeleteAccount
          onBack={() => setAppScreen('Settings')}
          onDeleteAccount={handleLogout}
        />
      </View>
    );
  }

  if (appScreen === 'About') {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <About
          onBack={() => setAppScreen('Settings')}
        />
      </View>
    );
  }

  if (appScreen === 'Notifications') {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <Notifications
          onBack={() => setAppScreen('Settings')}
        />
      </View>
    );
  }

  if (appScreen === 'ChangePassword') {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <ChangePassword
          onBack={() => setAppScreen('Settings')}
        />
      </View>
    );
  }

  if (appScreen === 'PersonalDetails') {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <PersonalDetails
          onBack={() => setAppScreen('Settings')}
        />
      </View>
    );
  }

  if (appScreen === 'NotificationsInbox') {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <NotificationsInbox
          onBack={() => setAppScreen('Dashboard')}
        />
      </View>
    );
  }

  if (appScreen === 'Settings') {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <Settings
          onBack={() => setAppScreen('Profile')}
          onLogout={handleLogout}
          onNavigatePersonalDetails={() => setAppScreen('PersonalDetails')}
          onNavigateChangePassword={() => setAppScreen('ChangePassword')}
          onNavigateNotifications={() => setAppScreen('Notifications')}
          onNavigateAbout={() => setAppScreen('About')}
          onNavigateDeleteAccount={() => setAppScreen('DeleteAccount')}
        />
      </View>
    );
  }

  if (appScreen === 'Profile') {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <Profile
          activeTab={activeTab}
          onTabPress={handleTabPress}
          onOpenSettings={() => setAppScreen('Settings')}
        />
      </View>
    );
  }

  if (appScreen === 'Dashboard' || currentScreen === 11) {
    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0a2847' }}>
        <Dashboard
          onLogout={handleLogout}
          onNavigateToJobs={handleNavigateToJobs}
          onViewJobDetails={handleNavigateToJobDetails}
          onSaveJob={handleSaveJob}
          savedJobIds={savedJobs.map(j => j.id)}
          activeTab={activeTab}
          onTabPress={handleTabPress}
          onOpenNotifications={() => setAppScreen('NotificationsInbox')}
        />
      </View>
    );
  }

  // Onboarding and auth screens with animation
  if (currentScreen < 11) {
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
