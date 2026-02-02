import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Navigation from '../../components/navigation';

export default function Jobs({ onBack, onViewDetails, onSaveJob, activeTab: externalActiveTab, onTabPress: externalOnTabPress }: { onBack?: () => void; onViewDetails?: (job: any) => void; onSaveJob?: (job: any) => void; activeTab?: string; onTabPress?: (tab: string) => void }) {
  const [activeTab, setActiveTab] = useState(externalActiveTab || 'Jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);

  const allJobs = [
    { id: 1, title: 'Mobile Developer Designer', company: 'Company Name', tags: ['UI/UX', 'Mobile', 'Figma'], time: '3 days ago', type: 'Remote', duration: 'Full Time', salary: '150k - 250k/year' },
    { id: 2, title: 'Mobile Developer Designer', company: 'Company Name', tags: ['UI/UX', 'Mobile', 'Figma'], time: '3 days ago', type: 'Remote', duration: 'Full Time', salary: '150k - 250k/year' },
    { id: 3, title: 'Frontend Developer', company: 'Tech Corp', tags: ['React', 'TypeScript', 'CSS'], time: '5 days ago', type: 'Remote', duration: 'Full Time', salary: '120k - 200k/year' },
    { id: 4, title: 'UI/UX Designer', company: 'Design Studio', tags: ['Figma', 'Sketch', 'Adobe XD'], time: '1 week ago', type: 'Hybrid', duration: 'Full Time', salary: '100k - 180k/year' },
    { id: 5, title: 'Backend Developer', company: 'Cloud Services Inc', tags: ['Node.js', 'MongoDB', 'AWS'], time: '2 weeks ago', type: 'Remote', duration: 'Contract', salary: '140k - 220k/year' },
  ];

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    externalOnTabPress?.(tab);
    if (tab === 'Home' && onBack) {
      onBack();
    }
  };

  const handleToggleSave = (jobId: number, job: any) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(savedJobIds.filter(id => id !== jobId));
    } else {
      setSavedJobIds([...savedJobIds, jobId]);
      onSaveJob?.(job);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, Jonas!</Text>
          <Text style={styles.headerTitle}>Find your drea.</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Job"
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filters */}
        <View style={styles.filtersRow}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownText}>Most Relevant</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </View>
        </View>

        <View style={styles.filterButtons}>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterIcon}>☰</Text>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Job Role</Text>
            <Text style={styles.filterDropIcon}>▼</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Work arrangement</Text>
            <Text style={styles.filterDropIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Jobs Count */}
        <Text style={styles.jobsCount}>{allJobs.length} Jobs Available</Text>

        {/* Jobs List */}
        <View style={styles.jobsList}>
          {allJobs.map((job) => (
            <TouchableOpacity 
              key={job.id} 
              style={styles.jobCard}
              onPress={() => onViewDetails?.(job)}
              activeOpacity={0.7}
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
                  onPress={(e) => {
                    e.stopPropagation?.();
                    handleToggleSave(job.id, job);
                  }}
                >
                  <Text style={styles.bookmarkIcon}>
                    {savedJobIds.includes(job.id) ? '🔖' : '📄'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.jobTags}>
                {job.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.jobFooter}>
                <View style={styles.jobMetaLeft}>
                  <Text style={styles.timeText}>{job.time}</Text>
                </View>
                <Text style={styles.viewDetails}>View details →</Text>
              </View>

              <View style={styles.jobBottomMeta}>
                <View style={styles.metaTags}>
                  <Text style={styles.metaText}>{job.type}</Text>
                  <Text style={styles.metaText}>{job.duration}</Text>
                </View>
                <Text style={styles.salary}>{job.salary}</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#1e3a5f',
  },
  greeting: { fontSize: 14, color: '#b0c4de', marginBottom: 4 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
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
  searchInput: { flex: 1, fontSize: 14, color: '#1f2937' },
  filtersRow: {
    marginTop: 4,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dropdownText: { fontSize: 14, color: '#3b82f6', fontWeight: '600' },
  dropdownIcon: { fontSize: 10, color: '#3b82f6' },
  filterButtons: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 6,
  },
  filterIcon: { fontSize: 14, color: '#6b7280' },
  filterText: { fontSize: 13, color: '#4b5563', fontWeight: '500' },
  filterDropIcon: { fontSize: 10, color: '#6b7280' },
  jobsCount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 8,
  },
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
  jobMetaLeft: {},
  timeText: { fontSize: 12, color: '#9ca3af' },
  viewDetails: { fontSize: 13, color: '#3b82f6', fontWeight: '600' },
  jobBottomMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  metaTags: { flexDirection: 'row', gap: 12 },
  metaText: { fontSize: 13, color: '#6b7280' },
  salary: { fontSize: 13, fontWeight: '700', color: '#1f2937' },
});
