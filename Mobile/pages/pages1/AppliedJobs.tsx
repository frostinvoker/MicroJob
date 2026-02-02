import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Navigation from '../../components/navigation';

type AppliedJob = {
  id: number;
  title: string;
  company: string;
  status: 'submitted' | 'interview' | 'accepted' | 'rejected';
  hasDetails?: boolean;
};

export default function AppliedJobs({ 
  onViewSavedJobs,
  activeTab: externalActiveTab,
  onTabPress: externalOnTabPress
}: { 
  onViewSavedJobs?: () => void;
  activeTab?: string;
  onTabPress?: (tab: string) => void;
}) {
  const [activeTab, setActiveTab] = useState(externalActiveTab || 'Saved');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const appliedJobs: AppliedJob[] = [
    {
      id: 1,
      title: 'Mobile Developer Designer',
      company: 'Company Name',
      status: 'submitted',
      hasDetails: true,
    },
    {
      id: 2,
      title: 'Mobile Developer Designer',
      company: 'Company Name',
      status: 'interview',
      hasDetails: false,
    },
    {
      id: 3,
      title: 'Mobile Developer Designer',
      company: 'Company Name',
      status: 'rejected',
      hasDetails: false,
    },
  ];

  const filters = ['All', 'Submitted', 'Interview', 'Accepted', 'Rejected'];

  const filteredJobs = appliedJobs.filter(job => {
    if (selectedFilter === 'All') return true;
    return job.status === selectedFilter.toLowerCase();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return '#3b82f6';
      case 'interview':
        return '#f59e0b';
      case 'accepted':
        return '#10b981';
      case 'rejected':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    externalOnTabPress?.(tab);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Applied jobs</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={[styles.toggleBtn, styles.toggleBtnActive]}>
          <Text style={styles.toggleBtnTextActive}>Applied Job details</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleBtn, styles.toggleBtnInactive]}
          onPress={onViewSavedJobs}
        >
          <Text style={styles.toggleBtnTextInactive}>Save job</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.filterTabActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedFilter === filter && styles.filterTabTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filteredJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No applications</Text>
            <Text style={styles.emptyText}>You don't have any {selectedFilter.toLowerCase()} applications yet</Text>
          </View>
        ) : (
          <View style={styles.jobsList}>
            {filteredJobs.map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <View style={styles.jobCardHeader}>
                  <View style={styles.jobLogo}>
                    <Text style={styles.jobLogoIcon}>logo</Text>
                  </View>
                  <View style={styles.jobInfo}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.jobCompany}>{job.company}</Text>
                  </View>
                </View>

                <View style={styles.jobDetails}>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(job.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>{getStatusLabel(job.status)}</Text>
                  </View>
                  {job.hasDetails && (
                    <TouchableOpacity style={styles.detailsLink}>
                      <Text style={styles.detailsText}>Application Details</Text>
                      <Text style={styles.detailsArrow}>›</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
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
    paddingBottom: 16,
    backgroundColor: '#1e3a5f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 28, color: '#fff', fontWeight: '700' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  placeholder: { width: 40 },
  toggleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#fff',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  toggleBtnActive: {
    backgroundColor: '#1e3a5f',
    borderColor: '#1e3a5f',
  },
  toggleBtnInactive: {
    backgroundColor: '#f5f7fa',
    borderColor: '#d1d5db',
  },
  toggleBtnTextActive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  toggleBtnTextInactive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 6,
    backgroundColor: '#fff',
  },
  filterTab: {
    paddingHorizontal: 10,
    paddingVertical: 1.5,
    borderRadius: 4,
    backgroundColor: '#f3f4f6',
  },
  filterTabActive: {
    backgroundColor: '#1e3a5f',
  },
  filterTabText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6b7280',
  },
  filterTabTextActive: {
    color: '#fff',
  },
  scroll: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 90 },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1f2937', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#6b7280' },
  jobsList: { gap: 12 },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  jobCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  jobLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobLogoIcon: {
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '600',
  },
  jobInfo: { flex: 1 },
  jobTitle: { fontSize: 15, fontWeight: '700', color: '#1f2937', marginBottom: 2 },
  jobCompany: { fontSize: 13, color: '#6b7280' },
  jobDetails: {
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  detailsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsText: {
    fontSize: 13,
    color: '#3b82f6',
    fontWeight: '600',
  },
  detailsArrow: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '700',
  },
});
