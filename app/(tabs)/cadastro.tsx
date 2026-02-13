import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView, Platform, StatusBar,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View
} from 'react-native';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailconfirmation, setEmailConfirm] = useState('')

  const router = useRouter()

  // --- LÓGICA DE CADASTRO ---
  const handleCadastro = () => {
    // 1. Verifica se os campos estão vazios
    if (email.trim() === '') {
    Alert.alert("Atenção ⚠️, Por favor, preencha o e-mail.")
    return;
    }

    if (emailconfirmation.trim() === '') {
    Alert.alert("Atenção ⚠️", "Por favor, preencha a confirmação do e-mail.");
    return;
    }

    if (email.trim() !== emailconfirmation.trim()) {
    Alert.alert("Atenção ⚠️", "Os e-mails não coincidem. Verifique a digitação.");
    return;
    }

    if (password.trim() === '') {
    Alert.alert("Atenção ⚠️", "Por favor, preencha a palavra-passe.");
    return;
    }

    else{
        router.push('/checkout');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#020530', '#000000']} style={styles.background} />

      <View style={styles.content}>
        <Image source={require('../../assets/images/logomkr.png')} style={styles.logo} />
        <Text style={styles.title}>Cadastre-se para poder assinar um plano</Text>

        {/* E-MAIL */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.icon} />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

         {/* CONFIRMAÇÃO DE EMAIL */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.icon} />
          <TextInput
            placeholder="Confirme seu Email"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={emailconfirmation}
            onChangeText={setEmailConfirm}
          />
        </View>

        {/* PALAVRA-PASSE */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.icon} />
          <TextInput
            placeholder="Palavra-passe"
            placeholderTextColor="#888"
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* BOTÃO CRIAR CONTA */}
        <TouchableOpacity style={styles.loginButton} onPress={handleCadastro}>
          <Text style={styles.cadastroText}>CRIAR CONTA</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' // Garante fundo preto se o gradiente demorar
  },
  background: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    // --- TOQUE DE MESTRE PARA WEB ---
    width: '100%', 
    maxWidth: 420,       // No PC, o login não passa de 420px
    alignSelf: 'center', // Centraliza o bloco na tela do computador
  },
  logo: { width: 150, height: 100, resizeMode: 'contain', marginBottom: 20 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
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
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#fff', fontSize: 16 },
  loginButton: { 
    width: '100%', 
    height: 50, 
    backgroundColor: '#fff', 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10,
    // Efeito sutil de elevação (funciona melhor em dispositivos móveis)
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cadastroText: { color: '#000', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  forgotText: { color: '#ccc', fontSize: 14 },
  signupText: { color: '#ccc', fontSize: 14 },
});