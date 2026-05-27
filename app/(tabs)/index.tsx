import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Animated, StatusBar, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAudioPlayer } from 'expo-audio'; 

import Login from '../login';

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);
  
  // ==========================================================
  // CORREÇÃO AQUI: Passando o arquivo corretamente como objeto
  // ==========================================================
  const player = useAudioPlayer({
  assetId: require('../../assets/sounds/splashsound.mp3')
  });
  // Animações do Splash
  const fadeAnim = useRef(new Animated.Value(0)).current;   // Entrada do logo
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Escala do logo
  const exitAnim = useRef(new Animated.Value(1)).current;    // Saída da tela inteira (Fade Out)

  useEffect(() => {
    // 1. Tocar o som usando a nova API
    try {
      // No PC (Web), os navegadores bloqueiam som automático sem clique. 
      // Essa checagem evita que o app quebre no navegador.
      if (Platform.OS !== 'web') {
        player.play();
        
        // Muta o som aos 3.8 segundos
        setTimeout(() => {
          player.volume = 0;
        }, 3800);
      }
    } catch (e) { 
      console.log("Erro ao tocar o som da splash:", e); 
    }

    // 2. Animação de Entrada do Logo
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
    ]).start();

    // 3. Iniciar Transição de Saída aos 3.5 segundos
    setTimeout(() => {
      Animated.timing(exitAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => setSplashFinished(true));
    }, 3500);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" />

      {/* O LOGIN FICA SEMPRE POR BAIXO */}
      <Login />

      {/* O SPLASH FICA POR CIMA E DESAPARECE COM O exitAnim */}
      {!splashFinished && (
        <Animated.View 
          style={[
            StyleSheet.absoluteFill, 
            { opacity: exitAnim, zIndex: 10 }
          ]}
        >
          <LinearGradient 
            colors={['#020530', '#000000']} 
            style={styles.container} 
          >
            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
              <Image 
                source={require('../../assets/images/logomkr.png')} 
                style={{ width: 200, height: 200, resizeMode: 'contain' }} 
              />
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});