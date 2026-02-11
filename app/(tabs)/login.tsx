import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, 
  KeyboardAvoidingView, Platform, StatusBar, Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- LÓGICA DE LOGIN ---
  const handleLogin = () => {
    // 1. Verifica se os campos estão vazios
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert("Atenção ⚠️", "Por favor, preencha o e-mail e a palavra-passe.");
      return;
    }

    // 2. VALIDAÇÃO (Simulação)
    // Aqui podes testar: E-mail 'admin' e Senha '123'
    if (email === 'admin' && password === '123') {
      Alert.alert(
        "Login Efetuado! ✅",
        "As credenciais estão corretas. Acesso permitido.",
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        "Erro de Acesso ❌",
        "E-mail ou palavra-passe incorretos.\n(Dica: Tenta 'admin' e '123')"
      );
    }
  };

  // --- BOTÕES SECUNDÁRIOS ---
  const handleNotImplemented = (recurso: string) => {
    Alert.alert("Em Desenvolvimento 🚧", `A funcionalidade "${recurso}" será implementada brevemente.`);
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
        <Text style={styles.title}>Bem-vindo de volta</Text>

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

        {/* BOTÃO ENTRAR */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>ENTRAR</Text>
        </TouchableOpacity>

        {/* ESQUECI A SENHA */}
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => handleNotImplemented('Recuperar Senha')}>
          <Text style={styles.forgotText}>Esqueci a minha palavra-passe</Text>
        </TouchableOpacity>

        {/* REGISTO */}
        <TouchableOpacity style={{ marginTop: 30 }} onPress={() => handleNotImplemented('Criar Conta')}>
          <Text style={styles.signupText}>
            Não tem uma conta? <Text style={{fontWeight: 'bold', color: '#fff'}}>Assine agora</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 150, height: 100, resizeMode: 'contain', marginBottom: 20 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', width: '100%', height: 50, marginBottom: 15, paddingHorizontal: 15 },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#fff', fontSize: 16 },
  loginButton: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  loginText: { color: '#000', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  forgotText: { color: '#ccc', fontSize: 14 },
  signupText: { color: '#ccc', fontSize: 14 },
});