import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, ScrollView, 
  TouchableOpacity, FlatList, StatusBar, Platform, Modal 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
// --- IMPORTAÇÃO COMPATÍVEL COM EXPO-VIDEO ---
import { useVideoPlayer, VideoView } from 'expo-video';

const MEUS_FAVORITOS = [
  { id: '1', image: 'https://veja.abril.com.br/wp-content/uploads/2024/02/MV5BYWQwY2VmNWQtZmY0Yy00NTEyLWE0ZDAtYWZlODRkYWEyNTI4XkEyXkFqcGdeQXVyMDM2NDM2MQ%40%40._V1_FMjpg_UX2160_.jpg?crop=1&resize=1212,909', titulo: 'Avatar: O Último Mestre do Ar' },
  { id: '2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkdn42TTR5kq0ezEmZ57zmyrfzFWppipfIPA&s', titulo: 'The Backrooms: Um Não-Lugar' },
  { id: '3', image: 'https://br.web.img3.acsta.net/c_310_420/img/e9/f1/e9f1efa99c6af0bbe48871b6d0a299f9.jpg', titulo: 'Michael Jackson' },
  { id: '4', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400', titulo: 'Guerra Neon' },
];

export default function Home() {
  const router = useRouter();
  const [isWatching, setIsWatching] = useState(false);

  // Link do vídeo exemplo (substitua pelo link stream real da sua API futuramente)
  const videoSource = 'https://raw.githubusercontent.com/kauanpedrosa/mkrmax-app/main/trailer.mp4';

  // Configuração do Player de vídeo nativo do Expo
  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = false;
  });

  const handlePlayVideo = () => {
    setIsWatching(true);
    player.play();
  };

  const handleCloseVideo = () => {
    player.pause();
    setIsWatching(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient colors={['#020530', '#000000']} style={styles.background} />

      {/* CONTAINER PRINCIPAL DA TELA COM MAX-WIDTH PARA PC */}
      <View style={styles.responsiveWrapper}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* HEADER FLUTUANTE */}
          <View style={styles.header}>
            <Text style={styles.logoText}>MKR MAX</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="search" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/planos')}>
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>M</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* HERO BANNER - ADAPTADO PARA WEB E MOBILE */}
          <View style={styles.heroContainer}>
            <Image 
              source={{ uri: 'https://abcdoabc.com.br/_image?href=https%3A%2F%2Fcdn-imgs.s3.sa-east-1.amazonaws.com%2Fwp-content%2Fuploads%2F2025%2F12%2Fsupergirl.jpg&w=525&h=350&f=webp' }} 
              style={styles.heroImage} 
            />
            <LinearGradient 
              colors={['transparent', 'rgba(0,0,0,0.6)', '#000']} 
              style={styles.heroGradient} 
            />
            <View style={styles.heroContent}>
              <Text style={styles.heroTag}>▶ DESTAQUE MKR MAX</Text>
              <Text style={styles.heroTitle}>SUPERGIRL O FILME</Text>
              <View style={styles.heroButtons}>
                
                {/* BOTÃO ASSISTIR QUE REPRODUZ O VÍDEO */}
                <TouchableOpacity style={styles.playButton} onPress={handlePlayVideo}>
                  <Ionicons name="play" size={20} color="#000" />
                  <Text style={styles.playText}>Assistir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listButton}>
                  <Ionicons name="add" size={24} color="#fff" />
                  <Text style={styles.listText}>Minha Lista</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* CATÁLOGO: MEUS FAVORITOS */}
          <View style={styles.categoriesContainer}>
            <Text style={styles.categoryTitle}>Meus Favoritos</Text>
            <FlatList
              horizontal
              data={MEUS_FAVORITOS}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: Platform.OS === 'web' ? 0 : 20 }}
              renderItem={({ item }: { item: any }) => (
                <TouchableOpacity style={styles.movieCard}>
                  <Image source={{ uri: item.image }} style={styles.cardImage} />
                  <LinearGradient 
                    colors={['transparent', 'rgba(0,0,0,0.9)']} 
                    style={styles.cardGradient} 
                  />
                  <Text style={styles.cardTitle}>{item.titulo}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* BOTTOM TAB BAR RESPONSIVA */}
        <View style={styles.bottomTab}>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="home" size={24} color="#00E5FF" />
            <Text style={[styles.tabText, { color: '#00E5FF' }]}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="heart-outline" size={24} color="#888" />
            <Text style={styles.tabText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="download-outline" size={24} color="#888" />
            <Text style={styles.tabText}>Downloads</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* MODAL DO PLAYER DE VÍDEO EM TELA CHEIA */}
      <Modal 
        visible={isWatching} 
        onRequestClose={handleCloseVideo} 
        animationType="fade"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <VideoView 
            style={styles.fullScreenVideo} 
            player={player}  
            nativeControls 
          />
          {/* Botão flutuante para fechar o player */}
          <TouchableOpacity style={styles.closeVideoButton} onPress={handleCloseVideo}>
            <Ionicons name="close-circle" size={44} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  
  // ALINHAMENTO DO CONTEÚDO PARA EVITAR DEFORMAÇÃO NO PC
  responsiveWrapper: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 1000 : '100%',
    alignSelf: 'center',
    flex: 1,
    position: 'relative',
    paddingHorizontal: Platform.OS === 'web' ? 20 : 0,
  },
  
  header: { 
    position: 'absolute', 
    top: Platform.OS === 'ios' ? 50 : Platform.OS === 'web' ? 20 : 35, 
    left: Platform.OS === 'web' ? 20 : 0,
    right: Platform.OS === 'web' ? 20 : 0,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    zIndex: 10 
  },
  logoText: { color: '#00E5FF', fontWeight: '900', fontSize: 24, fontStyle: 'italic' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 20 },
  avatarPlaceholder: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#00E5FF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  
  // AJUSTE DE RESPONSIVIDADE NO HERO CONTAINER
  heroContainer: { 
    width: '100%', 
    height: Platform.OS === 'web' ? 500 : 550, 
    position: 'relative',
    borderRadius: Platform.OS === 'web' ? 16 : 0,
    overflow: 'hidden',
    marginTop: Platform.OS === 'web' ? 10 : 0,
  },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 300 },
  heroContent: { position: 'absolute', bottom: 30, width: '100%', alignItems: 'center', paddingHorizontal: 20 },
  heroTag: { color: '#00E5FF', fontSize: 12, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 },
  heroTitle: { color: '#fff', fontSize: 38, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  heroButtons: { flexDirection: 'row', justifyContent: 'center', width: '100%' },
  playButton: { flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginRight: 15 },
  playText: { color: '#000', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  listButton: { flexDirection: 'row', backgroundColor: 'rgba(50,50,50,0.6)', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  listText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  
  categoriesContainer: { marginTop: Platform.OS === 'web' ? 35 : 20 },
  categoryTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15, paddingLeft: Platform.OS === 'web' ? 0 : 20 },
  movieCard: { marginRight: 15, width: 140, height: 210, position: 'relative', borderRadius: 8, overflow: 'hidden' },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100 },
  cardTitle: { position: 'absolute', bottom: 10, left: 10, right: 10, color: '#fff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  
  // TAB BAR TRAVADA NO CENTRO PARA NÃO ESPALHAR NO PC
  bottomTab: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(0,0,0,0.95)', 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(255,255,255,0.1)', 
    height: Platform.OS === 'ios' ? 85 : 70, 
    position: 'absolute', 
    bottom: 0, 
    left: Platform.OS === 'web' ? 20 : 0,
    right: Platform.OS === 'web' ? 20 : 0,
    justifyContent: 'space-around', 
    alignItems: 'center', 
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    borderBottomLeftRadius: Platform.OS === 'web' ? 16 : 0,
    borderBottomRightRadius: Platform.OS === 'web' ? 16 : 0,
  },
  tabItem: { alignItems: 'center', justifyContent: 'center', height: '100%' },
  tabText: { color: '#888', fontSize: 11, marginTop: 4, fontWeight: '600' },

  // ESTILOS DO MODAL DE VÍDEO
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenVideo: {
    width: '100%',
    height: '100%',
    maxWidth: Platform.OS === 'web' ? 1200 : '100%',
    aspectRatio: Platform.OS === 'web' ? 16 / 9 : undefined,
  },
  closeVideoButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 :Platform.OS === 'web' ? 25 : 35,
    right: 25,
    zIndex: 999,
  },
});