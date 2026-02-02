import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Navigation from '../../components/navigation';

export default function Dashboard({ onLogout, onNavigateToJobs, onViewJobDetails, onSaveJob, savedJobIds = [], activeTab: externalActiveTab, onTabPress: externalOnTabPress, onOpenNotifications }: { onLogout?: () => void; onNavigateToJobs?: () => void; onViewJobDetails?: (job: any) => void; onSaveJob?: (job: any) => void; savedJobIds?: number[]; activeTab?: string; onTabPress?: (tab: string) => void; onOpenNotifications?: () => void }) {
  const [activeTab, setActiveTab] = useState(externalActiveTab || 'Home');
  
  const activeJobs = [
    { id: 1, title: 'Design Modern Logo', company: 'Tech Solutions Inc.', budget: '$350', deadline: '3 days left', tags: ['UI/UX', 'Mobile', 'Figma'], type: 'Remote', duration: 'Full Time', salary: '150k - 250k/year', time: '3 days ago' },
    { id: 2, title: 'Build Responsive', company: 'Fashion Brand Co.', budget: '$2500', deadline: '5 days left', tags: ['React', 'TypeScript', 'CSS'], type: 'Remote', duration: 'Full Time', salary: '120k - 200k/year', time: '5 days ago' },
    { id: 3, title: 'Social Media', company: 'Startup Ventures', budget: '$800', deadline: '2 days left', tags: ['Content', 'Marketing', 'Design'], type: 'Hybrid', duration: 'Part Time', salary: '80k - 150k/year', time: '2 days ago' },
  ];

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    externalOnTabPress?.(tab);
    if (tab === 'Jobs' && onNavigateToJobs) {
      onNavigateToJobs();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, Jonas!</Text>
          <Text style={styles.headerTitle}>Find your Dream job</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon} onPress={onOpenNotifications}>
          <Text style={styles.bellIcon}>🔔</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search Job</Text>
        </View>

        {/* Upload Resume Card */}
        <View style={styles.uploadCard}>
          <Text style={styles.uploadTitle}>Upload your resume</Text>
          <Text style={styles.uploadSubtitle}>Get matched with top companies automatically</Text>
          <TouchableOpacity style={styles.checkButton}>
            <Text style={styles.checkButtonText}>Check Applied</Text>
          </TouchableOpacity>
        </View>

        {/* Job Category */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Job Category</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>
        <View style={styles.categoryRow}>
          <View style={[styles.categoryCard, { backgroundColor: '#1e3a5f' }]}>
            <Text style={styles.categoryIcon}>💼</Text>
            <Text style={styles.categoryCount}>3.5k</Text>
            <Text style={styles.categoryLabel}>Jobs</Text>
          </View>
          <View style={[styles.categoryCard, { backgroundColor: '#2563eb' }]}>
            <Text style={styles.categoryIcon}>💻</Text>
            <Text style={styles.categoryCount}>2.3k</Text>
            <Text style={styles.categoryLabel}>Design</Text>
          </View>
          <View style={[styles.categoryCard, { backgroundColor: '#0a1929' }]}>
            <Text style={styles.categoryIcon}>📱</Text>
            <Text style={styles.categoryCount}>1.8k</Text>
            <Text style={styles.categoryLabel}>Tech</Text>
          </View>
        </View>

        {/* Recent Jobs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Jobs</Text>
          <TouchableOpacity onPress={() => {
            console.log('See all clicked');
            onNavigateToJobs?.();
          }}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.jobsList}>
          {activeJobs.map(job => (
            <TouchableOpacity 
              key={job.id} 
              style={styles.jobCard}
              onPress={() => onViewJobDetails?.(job)}
            >
              <View style={styles.jobCardHeader}>
                <View style={styles.jobLogo}>
                  <Text style={styles.jobLogoText}>logo</Text>
                </View>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.jobCompany}>{job.company}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.bookmarkBtn}
                  onPress={() => onSaveJob?.(job)}
                >
                  <Text style={styles.bookmarkIcon}>
                    {savedJobIds.includes(job.id) ? '🔖' : '📄'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.jobTags}>
                <View style={styles.tag}><Text style={styles.tagText}>{job.tags[0]}</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>{job.tags[1]}</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>{job.tags[2]}</Text></View>
              </View>
              <View style={styles.jobFooter}>
                <View style={styles.jobMetaRow}>
                  <Text style={styles.jobMetaText}>{job.type}</Text>
                  <Text style={styles.jobMetaText}>{job.duration}</Text>
                </View>
                <Text style={styles.jobSalary}>{job.salary}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom nav */}
      <Navigation activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const CARD = '#f5f7fb';
const BLUE = '#0a3c7d';
const LIGHT = '#eef1f6';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: { 
    paddingHorizontal: 20, 
    paddingTop: 50, 
    paddingBottom: 20, 
    backgroundColor: '#1e3a5f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: { fontSize: 14, color: '#b0c4de', marginBottom: 4 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  notificationIcon: {
    position: 'relative',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  scroll: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 90, gap: 16 },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    paddingVertical: 14,
    gap: 10,
  },
  searchIcon: { fontSize: 18 },
  searchPlaceholder: { fontSize: 14, color: '#9ca3af' },
  uploadCard: { 
    backgroundColor: '#3b5a85', 
    borderRadius: 16, 
    padding: 20, 
    gap: 8,
  },
  uploadTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  uploadSubtitle: { fontSize: 13, color: '#d1dce6', lineHeight: 18 },
  checkButton: { 
    backgroundColor: '#1e3a5f', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  checkButtonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1f2937' },
  seeAll: { fontSize: 14, color: '#6b7280', fontWeight: '500' },
  categoryRow: { flexDirection: 'row', gap: 12 },
  categoryCard: { 
    flex: 1, 
    borderRadius: 14, 
    padding: 16, 
    gap: 8,
  },
  categoryIcon: { fontSize: 24 },
  categoryCount: { fontSize: 20, fontWeight: '800', color: '#fff' },
  categoryLabel: { fontSize: 13, color: '#e5e7eb', fontWeight: '500' },
  jobsList: { gap: 14 },
  jobCard: { 
    backgroundColor: '#fff', 
    borderRadius: 14, 
    padding: 16, 
    gap: 12,
  },
  jobCardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12,
  },
  jobLogo: { 
    width: 48, 
    height: 48, 
    borderRadius: 10, 
    backgroundColor: '#f3f4f6', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  jobLogoText: { fontSize: 11, color: '#9ca3af', fontWeight: '600' },
  jobInfo: { flex: 1 },
  jobTitle: { fontSize: 15, fontWeight: '700', color: '#1f2937', marginBottom: 2 },
  jobCompany: { fontSize: 13, color: '#6b7280' },
  bookmarkBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkIcon: { fontSize: 18 },
  jobTags: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag: { 
    backgroundColor: '#f3f4f6', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 6,
  },
  tagText: { fontSize: 12, color: '#4b5563', fontWeight: '500' },
  jobFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  jobMetaRow: { flexDirection: 'row', gap: 12 },
  jobMetaText: { fontSize: 13, color: '#6b7280' },
  jobSalary: { fontSize: 13, fontWeight: '700', color: '#1f2937' },
});