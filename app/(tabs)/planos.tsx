import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, 
  Platform, StatusBar, ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter, Stack } from 'expo-router';

export default function Planos() {
  const [planoSelecionado, setPlanoSelecionado] = useState('premium');
  const router = useRouter();

  const handleContinuar = () => {
    router.push('/checkout'); 
  };

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  // Componente interno corrigido
  const Beneficio = ({ texto, destaque = false }: { texto: string, destaque?: boolean }) => (
    <View style={styles.benefitRow}>
      <Ionicons name="checkmark-circle" size={20} color={destaque ? "#00E5FF" : "#888"} />
      <Text style={[styles.benefitText, destaque && styles.benefitTextHighlight]}>
        {texto}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#020530', '#000000']} style={styles.background} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={voltar} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </View>

          <Text style={styles.title}>Escolha seu plano</Text>
          <Text style={styles.subtitle}>Cancele quando quiser, sem taxas.</Text>

          {/* PLANO PADRÃO */}
          <TouchableOpacity 
            activeOpacity={0.8}
            style={[styles.card, planoSelecionado === 'padrao' && styles.cardSelected]}
            onPress={() => setPlanoSelecionado('padrao')}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.planName}>Padrão</Text>
            </View>
            <Text style={styles.price}>
              R$ 19,90 <Text style={styles.month}>/mês</Text>
            </Text>
            <View style={styles.divider} />
            <Beneficio texto="Acesso a todo o catálogo" />
            <Beneficio texto="Qualidade de vídeo em HD (1080p)" />
            <Beneficio texto="Assista em 2 telas simultâneas" />
          </TouchableOpacity>

          {/* PLANO PREMIUM */}
          <TouchableOpacity 
            activeOpacity={0.9}
            style={[
              styles.card, 
              styles.cardPremium,
              planoSelecionado === 'premium' && styles.cardPremiumSelected
            ]}
            onPress={() => setPlanoSelecionado('premium')}
          >
            <View style={styles.badge}>
              <Text style={styles.badgeText}>ECONOMIZE 40%</Text>
            </View>
            <View style={styles.cardHeader}>
              <Text style={styles.planNamePremium}>Premium MKR Max</Text>
              <Ionicons name="star" size={18} color="#FFD700" />
            </View>
            <Text style={styles.oldPrice}>De R$ 49,90</Text>
            <Text style={styles.pricePremium}>
              R$ 29,90 <Text style={styles.monthPremium}>/mês</Text>
            </Text>
            <View style={styles.dividerPremium} />
            <Beneficio texto="Tudo do plano Padrão" destaque={true} />
            <Beneficio texto="Qualidade máxima 4K Ultra HD + HDR" destaque={true} />
            <Beneficio texto="Assista em até 4 telas simultâneas" destaque={true} />
            <Beneficio texto="Download para assistir offline" destaque={true} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinuar}>
            <Text style={styles.continueText}>CONTINUAR</Text>
            <Ionicons name="arrow-forward" size={20} color="#000" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  background: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0 
  },
  scrollContent: { 
    flexGrow: 1, 
  },
  content: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 20,
    width: '100%', 
    maxWidth: 420,       
    alignSelf: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
    marginLeft: -5,
  },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { color: '#888', fontSize: 14, marginBottom: 30, textAlign: 'center' },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#555',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  planName: { color: '#ccc', fontSize: 18, fontWeight: '600' },
  price: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  month: { fontSize: 16, color: '#888', fontWeight: 'normal' },
  divider: { height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', marginVertical: 15 },
  cardPremium: {
    backgroundColor: 'rgba(0, 229, 255, 0.05)', 
    borderColor: 'rgba(0, 229, 255, 0.3)',
    marginTop: 10, 
  },
  cardPremiumSelected: {
    borderColor: '#00E5FF', 
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
  },
  badge: {
    position: 'absolute',
    top: -15,
    alignSelf: 'center',
    backgroundColor: '#FF3B30', 
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    zIndex: 10,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  planNamePremium: { color: '#00E5FF', fontSize: 20, fontWeight: 'bold', marginRight: 8 },
  oldPrice: { color: '#888', fontSize: 14, textDecorationLine: 'line-through', marginBottom: -5 },
  pricePremium: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  monthPremium: { fontSize: 16, color: '#00E5FF', fontWeight: 'normal' },
  dividerPremium: { height: 1, backgroundColor: 'rgba(0, 229, 255, 0.2)', marginVertical: 15 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  benefitText: { color: '#aaa', fontSize: 14, marginLeft: 10, flex: 1 },
  benefitTextHighlight: { color: '#fff', fontWeight: '500' },
  continueButton: { 
    flexDirection: 'row',
    width: '100%', 
    height: 55, 
    backgroundColor: '#fff', 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20,
  },
  continueText: { color: '#000', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
});