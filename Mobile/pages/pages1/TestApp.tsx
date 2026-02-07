import React, { useState } from 'react';
import { View } from 'react-native';
import Dashboard from './dashboard';
import Jobs from './Jobs';
import SavedJobs from './SavedJobs';
import JobDetails from './JobDetails';

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

export default function AppExample() {
  const [currentScreen, setCurrentScreen] = useState<'Dashboard' | 'Jobs' | 'SavedJobs' | 'JobDetails'>('Dashboard');
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Home');

  const handleNavigateToJobs = () => {
    console.log('Navigating to Jobs page...');
    setCurrentScreen('Jobs');
  };

  const handleBackToDashboard = () => {
    console.log('Navigating back to Dashboard...');
    setCurrentScreen('Dashboard');
  };

  const handleSaveJob = (job: Job) => {
    console.log('Saving job:', job);
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
    console.log('Removing job:', jobId);
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  const handleViewDetails = (job: Job | SavedJob) => {
    console.log('Viewing job details:', job);
    // Convert SavedJob to Job if needed
    const jobData = job as any;
    setSelectedJob(jobData);
    setCurrentScreen('JobDetails');
  };

  const handleNavigateToSavedJobs = () => {
    console.log('Navigating to Saved Jobs...');
    setCurrentScreen('SavedJobs');
  };

  if (currentScreen === 'JobDetails' && selectedJob) {
    return (
      <JobDetails
        job={selectedJob}
        onBack={() => setCurrentScreen('Jobs')}
        onSaveJob={handleSaveJob}
        isSaved={savedJobs.some(j => j.id === selectedJob.id)}
        activeTab={activeTab}
        onTabPress={(tab) => {
          setActiveTab(tab);
          if (tab === 'Home') {
            setCurrentScreen('Dashboard');
          } else if (tab === 'Jobs') {
            setCurrentScreen('Jobs');
          } else if (tab === 'Saved') {
            setCurrentScreen('SavedJobs');
          }
        }}
      />
    );
  }

  if (currentScreen === 'SavedJobs') {
    return (
      <SavedJobs
        savedJobs={savedJobs}
        onRemoveJob={handleRemoveJob}
        onViewDetails={(job: SavedJob) => handleViewDetails(job)}
        activeTab={activeTab}
        onTabPress={(tab) => {
          setActiveTab(tab);
          if (tab === 'Home') {
            setCurrentScreen('Dashboard');
          } else if (tab === 'Jobs') {
            setCurrentScreen('Jobs');
          }
        }}
      />
    );
  }

  if (currentScreen === 'Jobs') {
    return (
      <Jobs 
        onBack={handleBackToDashboard}
        onViewDetails={handleViewDetails}
        onSaveJob={handleSaveJob}
      />
    );
  }

  return (
    <Dashboard 
      onNavigateToJobs={handleNavigateToJobs}
      onLogout={() => {
        console.log('Logout clicked');
      }}
      activeTab={activeTab}
      onTabPress={(tab) => {
        setActiveTab(tab);
        setCurrentScreen('Dashboard');
        if (tab === 'Saved') {
          setCurrentScreen('SavedJobs');
        } else if (tab === 'Jobs') {
          setCurrentScreen('Jobs');
        }
      }}
    />
  );
}
