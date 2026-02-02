import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Navigation from '../../components/navigation';

type JobDetailsProps = {
  job: any;
  onBack?: () => void;
  onSaveJob?: (job: any) => void;
  isSaved?: boolean;
  activeTab?: string;
  onTabPress?: (tab: string) => void;
};

export default function JobDetails({ job, onBack, onSaveJob, isSaved = false, activeTab = 'Jobs', onTabPress }: JobDetailsProps) {
  const [saved, setSaved] = useState(isSaved);

  const handleTabPress = (tab: string) => {
    onTabPress?.(tab);
  };

  const handleSave = () => {
    setSaved(!saved);
    onSaveJob?.(job);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Company Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>🎵</Text>
          </View>
        </View>

        {/* Job Title */}
        <Text style={styles.jobTitle}>Senior Janitor</Text>
        <Text style={styles.jobMeta}>Senior • Remote</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📍</Text>
            <Text style={styles.statLabel}>LOCATION</Text>
            <Text style={styles.statValue}>Remote</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⏰</Text>
            <Text style={styles.statLabel}>TIME</Text>
            <Text style={styles.statValue}>Full - Time</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statLabel}>SALARY</Text>
            <Text style={styles.statValue}>150k to 250k</Text>
          </View>
        </View>

        {/* Posted Info */}
        <Text style={styles.postedInfo}>
          This job post is managed by <Text style={styles.highlight}>Jonas Enriques</Text> Posted: 3 days ago
        </Text>

        {/* Skills */}
        <Text style={styles.sectionTitle}>Must have skills</Text>
        <View style={styles.skillsGrid}>
          {['UI/UX', 'Mobile', 'UI/UX', 'Mobile', 'Figma', 'Figma', 'Figma'].map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          We are looking for an experienced UX Designer to join our team. You will be responsible for creating intuitive and engaging user experiences for our millions of users worldwide.
        </Text>

        {/* Requirements */}
        <Text style={styles.sectionTitle}>Requirements</Text>
        <View style={styles.requirementsList}>
          <Text style={styles.requirementItem}>• 5+ years of experience in product design</Text>
          <Text style={styles.requirementItem}>• Proficiency in Figma, Sketch, and Adobe Suite</Text>
          <Text style={styles.requirementItem}>• Strong portfolio showcasing mobile app designs</Text>
          <Text style={styles.requirementItem}>• Experience working in agile environments</Text>
        </View>

        {/* About Company */}
        <Text style={styles.sectionTitle}>About Spotify</Text>
        <Text style={styles.description}>
          ewqqwqdsadasdasdaslorererloreerloreewqqw qedsadasdasdaslorererloreerloreewqqwqeds adasdasdaslorererlore
        </Text>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionBtn, styles.saveBtn, saved && styles.savedBtn]} 
            onPress={handleSave}
          >
            <Text style={[styles.actionBtnText, styles.saveBtnText, saved && styles.savedBtnText]}>
              {saved ? 'Saved ✓' : 'Saved job'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.applyBtn]}>
            <Text style={styles.actionBtnText}>Apply now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom nav */}
      <Navigation activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e3a5f' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 24, color: '#fff' },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: { fontSize: 40 },
  jobTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  jobMeta: {
    fontSize: 14,
    color: '#b0c4de',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: { fontSize: 20, marginBottom: 8 },
  statLabel: { fontSize: 10, color: '#6b7280', marginBottom: 4, fontWeight: '600' },
  statValue: { fontSize: 12, color: '#1f2937', fontWeight: '700', textAlign: 'center' },
  postedInfo: {
    fontSize: 12,
    color: '#d1dce6',
    marginBottom: 24,
    lineHeight: 18,
  },
  highlight: { fontWeight: '700', color: '#fff' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    marginTop: 8,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  skillTag: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  skillText: { fontSize: 13, color: '#1f2937', fontWeight: '600' },
  description: {
    fontSize: 14,
    color: '#d1dce6',
    lineHeight: 22,
    marginBottom: 24,
  },
  requirementsList: {
    marginBottom: 24,
  },
  requirementItem: {
    fontSize: 14,
    color: '#d1dce6',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
  },
  savedBtn: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  applyBtn: {
    backgroundColor: '#4a90e2',
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
  saveBtnText: {
    color: '#fff',
  },
  savedBtnText: {
    color: '#fff',
  },
});
