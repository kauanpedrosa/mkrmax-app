import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  StatusBar, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter, Stack } from 'expo-router';
// --- IMPORTAÇÃO DO ARMAZENAMENTO SEGURO ---
import * as SecureStore from 'expo-secure-store';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  function irParaCadastro() {
    router.push('/cadastro');
  }

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert("Atenção ⚠️", "Por favor, preencha o e-mail e a palavra-passe.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://outburst-occupant-curse.ngrok-free.dev/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          senha: password 
        })
      });

      const data = await response.json();

      if (response.ok) {
        // --- SALVANDO O TOKEN NO DISPOSITIVO ---
        // 'userToken' é a chave que usaremos para buscar o token depois
        await SecureStore.setItemAsync('userToken', data.token);

        console.log("Login bem-sucedido e token armazenado!");
        router.replace('/planos'); 
      } else {
        Alert.alert("Erro de Login ❌", data.mensagem || "E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de Conexão 🌐", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      
      <LinearGradient colors={['#020530', '#000000']} style={styles.background} />

      <View style={styles.content}>
        <Image 
          source={require('../assets/images/logomkr.png')} 
          style={styles.logo} 
        />
        
        <Text style={styles.title}>Bem-vindo de volta</Text>

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

        <TouchableOpacity 
          style={[styles.loginButton, loading && { opacity: 0.8 }]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.loginText}>ENTRAR</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => Alert.alert("Suporte", "Função de recuperação em breve.")}>
          <Text style={styles.forgotText}>Esqueci a minha palavra-passe</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 30 }} onPress={irParaCadastro}>
          <Text style={styles.signupText}>
            Não tem uma conta? <Text style={styles.boldWhite}>Assine agora</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// Estilos mantidos conforme o original
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    width: '100%', 
    maxWidth: 420,       
    alignSelf: 'center', 
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginText: { color: '#000', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  forgotText: { color: '#ccc', fontSize: 14 },
  signupText: { color: '#ccc', fontSize: 14 },
  boldWhite: { fontWeight: 'bold', color: '#fff' }
});