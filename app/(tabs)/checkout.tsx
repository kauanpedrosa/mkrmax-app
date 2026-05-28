import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  KeyboardAvoidingView, Platform, StatusBar, Alert, ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter, Stack } from 'expo-router';

export default function Checkout() {
  const [nome, setNome] = useState('');
  const [cartao, setCartao] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const router = useRouter();

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  const handleCheckout = () => {
    if (nome.trim() === '' || cartao.trim() === '' || validade.trim() === '' || cvv.trim() === '') {
      Alert.alert("Atenção ⚠️", "Por favor, preencha todos os dados de pagamento.");
      return;
    }
    
    Alert.alert(
      "Sucesso 🎉", 
      "Pagamento Aprovado! Bem-vindo ao MKR Max Premium.",
      [
        {
          text: "Bora assistir! 🍿",
          onPress: () => {
            router.replace('/Home'); 
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
            <Text style={styles.title}>Finalizar Assinatura</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Plano Premium MKR Max</Text>
            <Text style={styles.summaryPrice}>R$ 29,90 <Text style={styles.summaryMonth}>/mês</Text></Text>
            <Text style={styles.summaryDesc}>Cancele a qualquer momento.</Text>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Nome impresso no cartão"
              placeholderTextColor="#888"
              style={styles.input}
              autoCapitalize="words"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="card-outline" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Número do cartão"
              placeholderTextColor="#888"
              style={styles.input}
              keyboardType="number-pad"
              maxLength={19}
              value={cartao}
              onChangeText={setCartao}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Ionicons name="calendar-outline" size={20} color="#ccc" style={styles.icon} />
              <TextInput
                placeholder="MM/AA"
                placeholderTextColor="#888"
                style={styles.input}
                keyboardType="number-pad"
                maxLength={5}
                value={validade}
                onChangeText={setValidade}
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
              <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.icon} />
              <TextInput
                placeholder="CVV"
                placeholderTextColor="#888"
                style={styles.input}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry={true}
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Ionicons name="shield-checkmark" size={20} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.checkoutText}>CONFIRMAR PAGAMENTO</Text>
          </TouchableOpacity>

          {/* CORREÇÃO AQUI: Ícone fora do Text ou View em volta */}
          <View style={styles.secureContainer}>
            <Ionicons name="lock-closed" size={14} color="#888" /> 
            <Text style={styles.secureText}>Pagamento 100% seguro e criptografado.</Text>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  scrollContent: { flexGrow: 1 },
  content: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 20,
    width: '100%', 
    maxWidth: 420,       
    alignSelf: 'center', 
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  backButton: { padding: 5 },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  summaryCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  summaryTitle: { color: '#ccc', fontSize: 16, marginBottom: 8 },
  summaryPrice: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 5 },
  summaryMonth: { fontSize: 16, fontWeight: 'normal', color: '#888' },
  summaryDesc: { color: '#666', fontSize: 12 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.2)', 
    width: '100%', 
    height: 55, 
    marginBottom: 15, 
    paddingHorizontal: 15 
  },
  row: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#fff', fontSize: 16 },
  checkoutButton: { 
    flexDirection: 'row',
    width: '100%', 
    height: 55, 
    backgroundColor: '#fff', 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 15,
  },
  checkoutText: { color: '#000', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  secureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  secureText: { color: '#888', fontSize: 12, marginLeft: 5, textAlign: 'center' },
});