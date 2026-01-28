import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Navigation from '../../components/navigation';

export default function Dashboard({ onLogout }: { onLogout?: () => void }) {
  const [navOpen, setNavOpen] = useState(false);
  const activeJobs = [
    { title: 'Design Modern Logo', company: 'Tech Solutions Inc.', budget: '$350', deadline: '3 days left' },
    { title: 'Build Responsive', company: 'Fashion Brand Co.', budget: '$2500', deadline: '5 days left' },
    { title: 'Social Media', company: 'Startup Ventures', budget: '$800', deadline: '2 days left' },
  ];

  return (
    <View style={styles.container}>
      <Navigation visible={navOpen} onClose={() => setNavOpen(false)} onLogout={onLogout} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}><Text style={styles.logoText}>💼</Text></View>
          <View>
            <Text style={styles.brand}>Micro BJ</Text>
            <Text style={styles.brandSub}>Professional Marketplace</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuBtn} onPress={() => setNavOpen(true)}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Welcome card */}
        <View style={styles.welcomeCard}>
          <View style={styles.activeTag}><Text style={styles.activeDot}>●</Text><Text style={styles.activeText}>Active Now</Text></View>
          <Text style={styles.welcomeTitle}>Welcome back,{'\n'}John!</Text>
          <Text style={styles.welcomeBody}>Track your performance, manage your work, and grow your business</Text>
          <View style={styles.welcomeActions}>
            <TouchableOpacity style={[styles.wBtn, styles.wBtnPrimary]}><Text style={styles.wBtnPrimaryText}>Browse Jobs</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.wBtn, styles.wBtnGhost]}><Text style={styles.wBtnGhostText}>View Wallet</Text></TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statValue}>$5600.75</Text>
            <Text style={styles.statLabel}>Total Earnings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📂</Text>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Active Jobs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Quick Actions</Text></View>
        <View style={styles.quickRow}>
          {[
            { label: 'Browse Jobs', icon: '🔍' },
            { label: 'Apply Jobs', icon: '📨' },
            { label: 'Wallet', icon: '💳' },
            { label: 'Messages', icon: '💬' },
          ].map(a => (
            <TouchableOpacity key={a.label} style={styles.quickCard}>
              <Text style={styles.quickIcon}>{a.icon}</Text>
              <Text style={styles.quickLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Active jobs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Jobs</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>
        <View style={styles.jobsList}>
          {activeJobs.map(job => (
            <View key={job.title} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <View style={styles.badge}><Text style={styles.badgeText}>In Progress</Text></View>
              </View>
              <Text style={styles.jobCompany}>{job.company}</Text>
              <View style={styles.jobMeta}>
                <View><Text style={styles.metaLabel}>Budget</Text><Text style={styles.metaValue}>{job.budget}</Text></View>
                <View><Text style={styles.metaLabel}>Deadline</Text><Text style={styles.metaValue}>{job.deadline}</Text></View>
              </View>
              <TouchableOpacity style={styles.viewLink}><Text style={styles.viewLinkText}>View →</Text></TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.tabBar}>
        {[
          { label: 'Home', icon: '🏠', active: true },
          { label: 'Jobs', icon: '🗂️' },
          { label: 'Find', icon: '🔎' },
          { label: 'Messages', icon: '✉️' },
          { label: 'Profile', icon: '👤' },
        ].map(tab => (
          <TouchableOpacity key={tab.label} style={styles.tabItem}>
            <Text style={[styles.tabIcon, tab.active && styles.tabActive]}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, tab.active && styles.tabActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const CARD = '#f5f7fb';
const BLUE = '#0a3c7d';
const LIGHT = '#eef1f6';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 16, paddingVertical: 12, paddingTop: 48, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a2847' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoIcon: { width: 36, height: 36, borderRadius: 8, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#fff', fontSize: 18 },
  brand: { fontSize: 18, fontWeight: '800', color: '#fff' },
  brandSub: { fontSize: 11, color: '#b0c4de' },
  menuBtn: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#1a4c8f', alignItems: 'center', justifyContent: 'center' },
  menuText: { fontSize: 18, color: '#fff' },
  scroll: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 90, gap: 14 },
  welcomeCard: { backgroundColor: BLUE, borderRadius: 14, padding: 16, gap: 8 },
  activeTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1f7a3d', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', gap: 6 },
  activeDot: { color: '#8fffb2', fontSize: 12 },
  activeText: { color: '#d7ffe5', fontSize: 12 },
  welcomeTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  welcomeBody: { color: '#dbe7ff', fontSize: 13, lineHeight: 18 },
  welcomeActions: { flexDirection: 'row', gap: 10, marginTop: 6 },
  wBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  wBtnPrimary: { backgroundColor: '#2e6fe8' },
  wBtnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  wBtnGhost: { backgroundColor: '#e8eefc' },
  wBtnGhostText: { color: '#1f3d7a', fontWeight: '700', fontSize: 13 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: '48%', backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: LIGHT, gap: 6 },
  statIcon: { fontSize: 18 },
  statValue: { fontSize: 16, fontWeight: '700', color: '#111' },
  statLabel: { fontSize: 12, color: '#6b7280' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  seeAll: { fontSize: 12, color: '#2563eb', fontWeight: '700' },
  quickRow: { flexDirection: 'row', gap: 10 },
  quickCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: LIGHT, gap: 6 },
  quickIcon: { fontSize: 18 },
  quickLabel: { fontSize: 12, color: '#111', textAlign: 'center' },
  jobsList: { gap: 10 },
  jobCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: LIGHT, gap: 6 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  jobTitle: { fontSize: 14, fontWeight: '700', color: '#111' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, backgroundColor: '#e0f7e9' },
  badgeText: { color: '#0ea35a', fontSize: 11, fontWeight: '700' },
  jobCompany: { fontSize: 12, color: '#6b7280' },
  jobMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  metaLabel: { fontSize: 11, color: '#6b7280' },
  metaValue: { fontSize: 12, fontWeight: '700', color: '#111' },
  viewLink: { alignSelf: 'flex-end', marginTop: 4 },
  viewLinkText: { color: '#2563eb', fontSize: 12, fontWeight: '700' },
  tabBar: { height: 64, flexDirection: 'row', borderTopWidth: 1, borderTopColor: LIGHT, backgroundColor: '#fff' },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabIcon: { fontSize: 16, color: '#6b7280' },
  tabLabel: { fontSize: 11, color: '#6b7280' },
  tabActive: { color: BLUE, fontWeight: '700' },
});