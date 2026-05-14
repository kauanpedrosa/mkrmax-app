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
    View,
    ActivityIndicator
} from 'react-native';

// --- FUNÇÃO PARA SALVAR NO BANCO DE DADOS ---
async function Cadastro_db(nome: string, email: string, senha: string) {
    try {
        const resposta_cadastro = await fetch('https://outburst-occupant-curse.ngrok-free.dev/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
            })
        });
        return resposta_cadastro.ok;
    } catch (error) {
        console.error("Erro ao salvar no banco:", error);
        return false;
    }
}

export default function Cadastro() {
    // Estados da Etapa 1
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailconfirmation, setEmailConfirm] = useState('');

    // Controle de Etapas e Loading
    const [etapa, setEtapa] = useState(1);
    const [loading, setLoading] = useState(false);

    // Estados da Etapa 2 (OTP)
    const [codigo, setCodigo] = useState(['', '', '', '']);
    const [codigoGerado, setCodigoGerado] = useState('');
    const inputsRef = useRef<any>([]);

    const router = useRouter();

    // --- ENVIO DE E-MAIL (ETAPA 1) ---
    const handleCadastro = async () => {
        if (!name || !email || !password) {
            Alert.alert("Atenção ⚠️", "Preencha todos os campos.");
            return;
        }
        if (email.trim() !== emailconfirmation.trim()) {
            Alert.alert("Atenção ⚠️", "Os e-mails não coincidem.");
            return;
        }

        setLoading(true);
        const codigoAleatorio = Math.floor(1000 + Math.random() * 9000).toString();
        setCodigoGerado(codigoAleatorio);

        try {
            const resposta = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service_id: 'service_k2smm8s',
                    template_id: 'template_gy7gkjh',
                    user_id: 'aMw93SIEswb9QRf11',
                    template_params: {
                        to_email: email,
                        otp_code: codigoAleatorio,
                    }
                })
            });

            if (resposta.ok) {
                setEtapa(2);
            } else {
                Alert.alert("Erro", "Falha ao enviar e-mail de verificação.");
            }
        } catch (error) {
            Alert.alert("Erro", "Sem conexão com a internet.");
        } finally {
            setLoading(false);
        }
    };

    // --- VERIFICAÇÃO E SALVAMENTO (ETAPA 2) ---
    const handleVerificarCodigo = async () => {
        const codigoDigitado = codigo.join('');

        if (codigoDigitado === codigoGerado) {
            setLoading(true);
            const sucesso = await Cadastro_db(name, email, password);
            setLoading(false);

            if (sucesso) {
                Alert.alert("Sucesso 🎉", "Conta criada com sucesso!");
                router.push('/login');
            } else {
                Alert.alert("Erro ❌", "Erro ao salvar dados no servidor.");
            }
        } else {
            Alert.alert("Erro", "Código inválido.");
        }
    };

    // Lógica dos quadradinhos de código
    const handleChangeText = (texto: string, index: number) => {
        const novoCodigo = [...codigo];
        novoCodigo[index] = texto;
        setCodigo(novoCodigo);
        if (texto.length === 1 && index < 3) inputsRef.current[index + 1]?.focus();
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && codigo[index] === '' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={['#020530', '#000000']} style={styles.background} />

            <View style={styles.content}>
                <Image source={require('../../assets/images/logomkr.png')} style={styles.logo} />

                {etapa === 1 ? (
                    <>
                        <Text style={styles.title}>Crie sua conta</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={20} color="#ccc" style={styles.icon} />
                            <TextInput placeholder="Nome" placeholderTextColor="#888" style={styles.input} value={name} onChangeText={setName} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.icon} />
                            <TextInput placeholder="E-mail" placeholderTextColor="#888" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.icon} />
                            <TextInput placeholder="Confirme o E-mail" placeholderTextColor="#888" style={styles.input} value={emailconfirmation} onChangeText={setEmailConfirm} keyboardType="email-address" autoCapitalize="none" />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.icon} />
                            <TextInput placeholder="Palavra-passe" placeholderTextColor="#888" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={loading}>
                            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>CRIAR CONTA</Text>}
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>Verifique seu E-mail</Text>
                        <Text style={styles.subtitle}>Código enviado para {email}</Text>
                        <View style={styles.otpContainer}>
                            {codigo.map((digito, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => { inputsRef.current[index] = ref; }}
                                    style={[styles.otpInput, digito !== '' && styles.otpInputActive]}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    value={digito}
                                    onChangeText={(t) => handleChangeText(t, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                />
                            ))}
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleVerificarCodigo} disabled={loading}>
                            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>VERIFICAR</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setEtapa(1)} style={{ marginTop: 20 }}>
                            <Text style={styles.linkText}>Mudar e-mail</Text>
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
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, width: '100%', maxWidth: 420, alignSelf: 'center' },
    logo: { width: 150, height: 100, resizeMode: 'contain', marginBottom: 20 },
    title: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { color: '#ccc', textAlign: 'center', marginBottom: 30 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, width: '100%', height: 55, marginBottom: 15, paddingHorizontal: 15 },
    icon: { marginRight: 10 },
    input: { flex: 1, color: '#fff' },
    button: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    buttonText: { fontWeight: 'bold' },
    otpContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: 280, marginBottom: 30 },
    otpInput: { width: 60, height: 65, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, color: '#fff', fontSize: 28, textAlign: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
    otpInputActive: { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' },
    linkText: { color: '#ccc', fontSize: 14 }
});