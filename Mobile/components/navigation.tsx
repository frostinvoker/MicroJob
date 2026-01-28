import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';

type NavItem = { label: string; icon: string; badge?: string | number; active?: boolean };
type Props = {
  visible: boolean;
  onClose: () => void;
  onLogout?: () => void; // add
};

export default function Navigation({ visible, onClose, onLogout }: Props) {
  if (!visible) return null;

  const mainItems: NavItem[] = [
    { label: 'Dashboard', icon: '🏠', active: true },
    { label: 'Find Talent', icon: '🔍' },
    { label: 'Browse Jobs', icon: '💼' },
    { label: 'Messages', icon: '💬', badge: 3 },
    { label: 'My Jobs', icon: '📁' },
    { label: 'Wallet', icon: '👛' },
  ];
  const bottomItems: NavItem[] = [
    { label: 'Settings', icon: '⚙️' },
    { label: 'Help & Support', icon: '❓' },
    { label: 'Logout', icon: '↩️' },
  ];

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.drawer}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}><Text style={styles.brandIconText}>💼</Text></View>
            <View>
              <Text style={styles.brandTitle}>MicroJob</Text>
              <Text style={styles.brandSub}>Professional Marketplace</Text>
            </View>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.avatar}><Text style={styles.avatarText}>JD</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>rqeqe@gmail.com</Text>
            </View>
            <View style={styles.statusDot} />
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>Balance</Text>
              <Text style={styles.statValue}>$2450.75</Text>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {mainItems.map(item => (
            <TouchableOpacity key={item.label} style={[styles.item, item.active && styles.itemActive]}>
              <Text style={[styles.itemIcon, item.active && styles.itemActiveText]}>{item.icon}</Text>
              <Text style={[styles.itemLabel, item.active && styles.itemActiveText]}>{item.label}</Text>
              {item.badge !== undefined && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}

          <View style={styles.bottomSpace} />

          {bottomItems.map(item => (
            <TouchableOpacity
              key={item.label}
              style={styles.item}
              onPress={item.label === 'Logout' ? onLogout : undefined}
            >
              <Text style={[styles.itemIcon, item.label === 'Logout' && { color: '#ef4444' }]}>{item.icon}</Text>
              <Text style={[styles.itemLabel, item.label === 'Logout' && { color: '#ef4444' }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const BLUE = '#0a2847';
const LIGHT = '#e5eaf3';

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', zIndex: 1000 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' },
  drawer: { width: '78%', maxWidth: 320, backgroundColor: BLUE, paddingTop: 28, paddingHorizontal: 14, paddingBottom: 20 },
  header: { gap: 14 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#133b7a', alignItems: 'center', justifyContent: 'center' },
  brandIconText: { color: '#fff', fontSize: 18 },
  brandTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  brandSub: { color: '#c4d1e6', fontSize: 11 },
  profileCard: { backgroundColor: '#11417b', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#2b75c9', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700' },
  profileName: { color: '#fff', fontSize: 15, fontWeight: '700' },
  profileEmail: { color: '#c4d1e6', fontSize: 12 },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#22c55e' },
  statsRow: { flexDirection: 'row', backgroundColor: '#11417b', borderRadius: 12, padding: 10, alignItems: 'center', justifyContent: 'space-between' },
  statCol: { alignItems: 'center', flex: 1 },
  star: { color: '#facc15', fontSize: 14, marginBottom: 2 },
  statValue: { color: '#fff', fontWeight: '700', fontSize: 14 },
  statLabel: { color: '#c4d1e6', fontSize: 11 },
  divider: { width: 1, height: '100%', backgroundColor: '#1c4f8d', marginHorizontal: 10 },
  list: { paddingTop: 10, paddingBottom: 40, gap: 6 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10 },
  itemIcon: { color: '#d8e4f7', fontSize: 16 },
  itemLabel: { color: '#d8e4f7', fontSize: 14, fontWeight: '600' },
  itemActive: { backgroundColor: '#2c6fbc' },
  itemActiveText: { color: '#fff' },
  badge: { marginLeft: 'auto', backgroundColor: '#ef4444', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  bottomSpace: { height: 12 },
});