import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

// Importa apenas o Login
import Login from './login';

// --- SPLASH SCREEN COM SOM E FADE OUT ---
const CustomSplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    // Função para carregar e tocar o som
    async function playSound() {
      try {
        const { sound: playbackObject } = await Audio.Sound.createAsync(
          require('../../assets/sounds/splashsound.mp3')
        );
        setSound(playbackObject);
        await playbackObject.playAsync();

        // --- O TRUQUE DO FADE OUT ---
        // Aos 3200ms (3.2s), começamos a baixar o volume para evitar o corte seco
        setTimeout(async () => {
          try {
            // Baixa para 50%
            await playbackObject.setVolumeAsync(0.5);
            
            // Depois de um tiquinho, baixa para 10%
            setTimeout(async () => {
              await playbackObject.setVolumeAsync(0.1);
            }, 300);
            
          } catch (e) {
            // Ignora erros se o som já tiver acabado
          }
        }, 3200);

      } catch (error) {
        console.log('Erro ao carregar som:', error);
      }
    }

    // 1. Inicia som e animação visual
    playSound();

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
    ]).start();

    // 2. Aguarda 4 segundos totais e finaliza
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);

    // 3. Limpeza ao sair da tela
    return () => {
      clearTimeout(timer);
      if (sound) {
        // Para o som e descarrega da memória
        sound.stopAsync().then(() => {
          sound.unloadAsync();
        });
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#020530', '#000000']} style={{ position: 'absolute', width: '100%', height: '100%' }} />
      
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <Image source={require('../../assets/images/logomkr.png')} style={{ width: 250, height: 250, resizeMode: 'contain' }} />
      </Animated.View>
    </View>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  if (!showLogin) {
    return <CustomSplashScreen onFinish={() => setShowLogin(true)} />;
  }

  return <Login />;
}