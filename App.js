import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet, StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import { theme } from './src/constants';
import { LanguageProvider, useLanguage } from './src/i18n/LanguageContext';
import Toast       from './src/components/Toast';
import BottomNav   from './src/components/BottomNav';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen  from './src/screens/HomeScreen';
import CardsScreen from './src/screens/CardsScreen';
import StoreScreen from './src/screens/StoreScreen';
import MoreScreen  from './src/screens/MoreScreen';
import ChatScreen  from './src/screens/ChatScreen';
import ZakatScreen from './src/screens/ZakatScreen';
import AdminScreen from './src/screens/AdminScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import TransactionHistoryScreen from './src/screens/TransactionHistoryScreen';
import BeneficiariesScreen from './src/screens/BeneficiariesScreen';
import ScheduledPaymentsScreen from './src/screens/ScheduledPaymentsScreen';
import RequestMoneyScreen from './src/screens/RequestMoneyScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BudgetScreen from './src/screens/BudgetScreen';
import SupportScreen from './src/screens/SupportScreen';
import QRScreen from './src/screens/QRScreen';
import SplitBillScreen from './src/screens/SplitBillScreen';
import { setAuthToken, restoreAuthToken } from './src/services/api';
import { notifApi } from './src/services/api';

// ─── Root App ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <Inner />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

function Inner() {
  const insets = useSafeAreaInsets();

  // Auth state
  const [isLoggedIn,   setIsLoggedIn]   = useState(false);
  const [userData,     setUserData]     = useState(null);
  const [isRestoring,  setIsRestoring]  = useState(true);

  // Global state
  const [isDark,       setIsDark]       = useState(true);
  const [showBalance,  setShowBalance]  = useState(true);
  const [toast,        setToast]        = useState({ msg: '', vis: false, type: 'info' });
  const [unreadCount,  setUnreadCount]  = useState(0);

  const toastTimer = useRef(null);
  const navRef = useNavigationContainerRef();
  const t = isDark ? theme.dark : theme.light;
  const { strings } = useLanguage();

  // Poll unread notification count every 30s
  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchCount = () => notifApi.getUnreadCount().then(r => setUnreadCount(r.count)).catch(() => {});
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // Always show login screen on app start (security requirement)
  useEffect(() => {
    // Restore theme and other preferences but NOT session — user must log in each time
    setIsRestoring(false);
  }, []);

  // #7 — Persist theme across restarts
  useEffect(() => {
    AsyncStorage.getItem('novapay_theme').then((saved) => {
      if (saved !== null) setIsDark(saved === 'dark');
    });
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    AsyncStorage.setItem('novapay_theme', next ? 'dark' : 'light');
  };

  const showToast = useCallback((msg, type = 'info') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg: '', vis: false, type: 'info' });
    setTimeout(() => setToast({ msg, vis: true, type }), 50);
  }, []);

  const dismissToast = useCallback(() => {
    setToast((prev) => ({ ...prev, vis: false }));
  }, []);

  // Common screen props
  const screenProps = { t, isDark, showToast, strings };

  // QR scan result passed to HomeScreen to open TransferFlow pre-filled
  const [scannedQRUser, setScannedQRUser] = React.useState(null);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setUserData(null);
    await setAuthToken(null);
    await AsyncStorage.removeItem('novapay_user');
  };

  if (isRestoring) {
    return (
      <View style={{ flex: 1, backgroundColor: '#080B14', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#00E5FF', fontSize: 28, fontWeight: '900', letterSpacing: -0.5 }}>NovaPay</Text>
        <Text style={{ color: '#7A8FAF', fontSize: 13, marginTop: 8 }}>{strings.app.loading}</Text>
      </View>
    );
  }

  // ── Login Screen ─────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#080B14" />
        <View style={{ height: insets.top, backgroundColor: '#080B14' }} />
        <LoginScreen
          t={t}
          isDark={isDark}
          showToast={showToast}
          onLogin={async (data) => {
            setUserData(data.user);
            await setAuthToken(data.token);
            await AsyncStorage.setItem('novapay_user', JSON.stringify(data.user));
            setIsLoggedIn(true);
          }}
        />
        <Toast message={toast.msg} visible={toast.vis} type={toast.type} onDismiss={dismissToast} />
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={t.bg}
        translucent={false}
      />

      {/* Safe area top padding */}
      <View style={{ height: insets.top, backgroundColor: t.bg }} />

      {/* ── Top Bar ─────────────────────────────────────────────── */}
      <View style={[styles.themeRow, { borderBottomColor: t.border }]}>
        <Text style={[styles.appName, { color: t.accent }]}>{strings.app.name}</Text>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <TouchableOpacity
            style={[styles.themeBtn, {
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              borderColor: t.border,
            }]}
            onPress={toggleTheme}
            activeOpacity={0.75}
          >
            <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={14} color={t.textSub} />
            <Text style={[styles.themeBtnText, { color: t.textSub }]}>{isDark ? strings.app.light : strings.app.dark}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeBtn, {
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              borderColor: t.border, paddingHorizontal: 10,
            }]}
            onPress={() => navRef.current?.navigate('notifications')}
            activeOpacity={0.75}
            id="notifBell"
          >
            <Ionicons name="notifications-outline" size={16} color={t.textSub} />
            {unreadCount > 0 && (
              <View style={styles.bellBadge}>
                <Text style={styles.bellBadgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ── React Navigation Content ───────────────────────────────────── */}
      <View style={{ flex: 1, backgroundColor: t.bg }}>
        <NavigationContainer ref={navRef} theme={{
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: t.bg }
        }}>
          <Tab.Navigator
            initialRouteName={userData?.role === 'admin' ? 'admin' : 'home'}
            screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
            tabBar={(props) => {
              const currentRoute = props.state.routeNames[props.state.index];
              return (
                <BottomNav 
                  t={t} 
                  activeTab={currentRoute} 
                  setActiveTab={(r) => props.navigation.navigate(r)} 
                  isDark={isDark} 
                  role={userData?.role} 
                />
              );
            }}
          >
            <Tab.Screen name="home">{p => <HomeScreen {...p} {...screenProps} showBalance={showBalance} setShowBalance={setShowBalance} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} scannedQRUser={scannedQRUser} clearScannedQRUser={() => setScannedQRUser(null)} />}</Tab.Screen>
            <Tab.Screen name="cards">{p => <CardsScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="chat">{p => <ChatScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="zakat">{p => <ZakatScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="store">{p => <StoreScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="more">{p => <MoreScreen {...p} {...screenProps} user={userData} handleLogout={handleLogout} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="admin">{p => <AdminScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="insights">{p => <InsightsScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="notifications">{p => <NotificationsScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="history">{p => <TransactionHistoryScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="beneficiaries">{p => <BeneficiariesScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="scheduled">{p => <ScheduledPaymentsScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="requests">{p => <RequestMoneyScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="rewards">{p => <RewardsScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="profile">{p => <ProfileScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="budget">{p => <BudgetScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="support">{p => <SupportScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
            <Tab.Screen name="qr">{p => <QRScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} onScanResult={(u) => { setScannedQRUser(u); p.navigation.navigate('home'); }} />}</Tab.Screen>
            <Tab.Screen name="splitbill">{p => <SplitBillScreen {...p} {...screenProps} user={userData} setActiveTab={(r) => p.navigation.navigate(r)} />}</Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </View>

      {/* Safe area bottom padding */}
      <View style={{ height: insets.bottom, backgroundColor: t.navBg }} />

      {/* ── Toast ──────────────────────────────────────────────────── */}
      <Toast message={toast.msg} visible={toast.vis} type={toast.type} onDismiss={dismissToast} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  themeRow: {
    flexDirection:     'row',
    justifyContent:    'space-between',
    alignItems:        'center',
    paddingHorizontal: 22,
    paddingVertical:   11,
    borderBottomWidth: 1,
  },
  appName: {
    fontSize:      22,
    fontWeight:    '900',
    letterSpacing: -0.5,
  },
  aiBadge: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            5,
    paddingVertical:   6,
    paddingHorizontal: 10,
    borderRadius:   16,
    borderWidth:    1,
  },
  aiBadgeText: {
    fontSize:   11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  themeBtn: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               5,
    paddingVertical:   7,
    paddingHorizontal: 12,
    borderRadius:      50,
    borderWidth:       1,
  },
  themeBtnText: {
    fontSize:   12,
    fontWeight: '600',
  },
  bellBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4D6A',
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  bellBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
  },
});
