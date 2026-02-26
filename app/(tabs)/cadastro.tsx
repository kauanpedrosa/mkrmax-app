import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView, Platform, StatusBar,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View
} from 'react-native';

export default function Cadastro() {
  // Estados da Etapa 1 (Dados do usuário)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailconfirmation, setEmailConfirm] = useState('');
  
  // Controle de Etapas (1 = Cadastro, 2 = Código OTP)
  const [etapa, setEtapa] = useState(1);

  // Estados e Referências da Etapa 2 (Código OTP)
  const [codigo, setCodigo] = useState(['', '', '', '']);
  const inputsRef = useRef<any>([]);

  // NOVO ESTADO: Guarda o código real que vamos gerar e mandar pro EmailJS
  const [codigoGerado, setCodigoGerado] = useState(''); 

  const router = useRouter();

  // --- LÓGICA DA ETAPA 1 (CRIAR CONTA E MANDAR EMAIL) ---
  const handleCadastro = async () => { // <-- Adicionado 'async' aqui
    if (email.trim() === '') {
      Alert.alert("Atenção ⚠️", "Por favor, preencha o e-mail.");
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
    
    // --- NOVA LÓGICA DE ENVIO (EMAILJS) ---
    // 1. Gera um número aleatório de 4 dígitos (ex: 7392)
    const codigoAleatorio = Math.floor(1000 + Math.random() * 9000).toString();
    setCodigoGerado(codigoAleatorio); // Salva na memória para comparar depois

    try {
      // 2. Manda o e-mail via EmailJS
      const resposta = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_k2smm8s',       // <--- COLOQUE SUA CHAVE AQUI
          template_id: 'template_gy7gkjh',     // <--- COLOQUE SUA CHAVE AQUI
          user_id: 'aMw93SIEswb9QRf11',          // <--- COLOQUE SUA CHAVE AQUI
          template_params: {
            to_email: email,             // Manda pro e-mail que o cara digitou
            otp_code: codigoAleatorio,   // Manda o código gerado
          }
        })
      });

      if (resposta.ok) {
        // Se o email foi, avança para os quadradinhos
        setEtapa(2);
      } else {
        const erroDoServidor = await resposta.text();
        console.log("🚨 MOTIVO DO ERRO 400:", erroDoServidor);
        Alert.alert("Erro 400", "Abra o terminal do VS Code para ver o que faltou!");
        Alert.alert("Erro", "Falha ao enviar o e-mail. Verifique as chaves do EmailJS.");
      }
    } catch (error) {
      Alert.alert("Erro", "Sem conexão com a internet.");
    }
  };

  // --- LÓGICA DA ETAPA 2 (CÓDIGO OTP) ---
  const handleChangeText = (texto: string, index: number) => {
    const novoCodigo = [...codigo];
    novoCodigo[index] = texto;
    setCodigo(novoCodigo);

    // Pula pro próximo quadrado
    if (texto.length === 1 && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Volta pro anterior se apagar
    if (e.nativeEvent.key === 'Backspace' && codigo[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // --- NOVA LÓGICA DE VERIFICAÇÃO ---
  const handleVerificarCodigo = () => {
    const codigoDigitado = codigo.join(''); // Junta o array ['1','2','3','4']
    
    // Compara o que ele digitou com o que geramos lá em cima
    if (codigoDigitado === codigoGerado) {
      Alert.alert("Sucesso", "E-mail verificado!");
      router.push('/login');
    } else {
      Alert.alert("Erro", "Código inválido. Verifique o seu e-mail.");
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

        {etapa === 1 ? (
          <>
            <Text style={styles.title}>Cadastre-se para poder assinar um plano</Text>

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

            <TouchableOpacity style={styles.loginButton} onPress={handleCadastro}>
              <Text style={styles.cadastroText}>CRIAR CONTA</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Verifique seu E-mail</Text>
            <Text style={styles.subtitle}>Enviamos um código de 4 dígitos para {email}</Text>

            <View style={styles.otpContainer}>
              {codigo.map((digito, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputsRef.current[index] = ref; }} // <-- Correção do TypeScript aplicada aqui
                  style={[
                    styles.otpInput,
                    digito !== '' && styles.otpInputPreenchido 
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digito}
                  onChangeText={(texto) => handleChangeText(texto, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleVerificarCodigo}>
              <Text style={styles.cadastroText}>VERIFICAR CÓDIGO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setEtapa(1)}>
              <Text style={styles.forgotText}>Mudar de e-mail</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

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
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { color: '#ccc', fontSize: 14, textAlign: 'center', marginBottom: 30 },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', 
    width: '100%', height: 55, marginBottom: 15, paddingHorizontal: 15 
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#fff', fontSize: 16 },
  loginButton: { 
    width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 25, 
    justifyContent: 'center', alignItems: 'center', marginTop: 10,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, shadowRadius: 3.84,
  },
  cadastroText: { color: '#000', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  forgotText: { color: '#ccc', fontSize: 14 },
  
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 280, 
    alignSelf: 'center',
    marginBottom: 30,
  },
  otpInput: {
    width: 60,
    height: 65,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otpInputPreenchido: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#fff', 
    elevation: 5,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});