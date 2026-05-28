import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, ScrollView, 
  TouchableOpacity, FlatList, StatusBar, Platform, Modal 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';

const TRAILER_PRINCIPAL = 'https://raw.githubusercontent.com/kauanpedrosa/mkrmax-app/main/videos/supergirl.mp4';

const MEUS_FAVORITOS = [
  { id: 'f1', image: 'https://veja.abril.com.br/wp-content/uploads/2024/02/MV5BYWQwY2VmNWQtZmY0Yy00NTEyLWE0ZDAtYWZlODRkYWEyNTI4XkEyXkFqcGdeQXVyMDM2NDM2MQ%40%40._V1_FMjpg_UX2160_.jpg?crop=1&resize=1212,909', titulo: 'Avatar: O Último Mestre do Ar', videoUrl: 'https://raw.githubusercontent.com/kauanpedrosa/mkrmax-app/main/videos/AvatarAang.mp4' },
  { id: 'f2', image: 'https://br.web.img3.acsta.net/c_310_420/img/e9/f1/e9f1efa99c6af0bbe48871b6d0a299f9.jpg', titulo: 'Michael Jackson', videoUrl: 'https://raw.githubusercontent.com/kauanpedrosa/mkrmax-app/main/videos/MichaelJackson.mp4' },
  { id: 'f3', image: 'https://referencianerd.com/wp-content/uploads/2019/12/elsa.jpg', titulo: 'Frozen 2', videoUrl: 'https://raw.githubusercontent.com/kauanpedrosa/mkrmax-app/main/videos/Frozen2.mp4' },
];

const FILMES_POPULARES = [
  { id: 'p1', image: 'https://www.papodecinema.com.br/wp-content/uploads/2021/11/20211116-homem-aranha-sem-volta-para-casa-papo-de-cinema-cartaz.webp', titulo: 'Homem-Aranha: Sem Volta Para Casa', videoUrl: TRAILER_PRINCIPAL },
  { id: 'p2', image: 'https://play-lh.googleusercontent.com/b0bqoD27ib25NwPutF8Kf740iiFQ53CKUz27VBQkCQtvSfhdWQtb8vwFxxn-SzI-5ZATXXkDwf2qPODkNQ', titulo: 'Batman: O Cavaleiro das Trevas', videoUrl: TRAILER_PRINCIPAL },
  { id: 'p3', image: 'https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/4632/ef9e971e0582d0e846485a24b78f1b73.jpg', titulo: 'Vingadores: Ultimato', videoUrl: TRAILER_PRINCIPAL },
  { id: 'p4', image: 'https://play-lh.googleusercontent.com/64SMx5o6rrX5HIGVkKt8aJaunQ-owWPlvqRv-MBTs4ZMF5yk3-X-nPj7GmSmuPqiAkg23HgOI8O9mNPgLw', titulo: 'Coringa', videoUrl: TRAILER_PRINCIPAL },
  { id: 'p5', image: 'https://br.web.img3.acsta.net/c_310_420/pictures/14/10/31/20/39/476171.jpg', titulo: 'Interestelar', videoUrl: TRAILER_PRINCIPAL },
];

export default function Home() {
  const router = useRouter();
  const [isWatching, setIsWatching] = useState(false);

  // ESTADO DOS FAVORITOS
  const [listaFavoritos, setListaFavoritos] = useState<any[]>([]);

  // Configuração do Player de vídeo nativo do Expo (inicia com o trailer padrão)
  const player = useVideoPlayer(TRAILER_PRINCIPAL, (p) => {
    p.loop = false;
  });

  const handlePlayVideo = (urlEspecifica?: string) => {
    if (urlEspecifica) {
      player.replace(urlEspecifica);
    } else {
      player.replace(TRAILER_PRINCIPAL);
    }
    
    setIsWatching(true);
    player.play();
  };

  const handleCloseVideo = () => {
    player.pause();
    setIsWatching(false);
  };

  const toggleFavorito = (filme: any) => {
    const jaE_Favorito = listaFavoritos.some(item => item.id === filme.id);
    if (jaE_Favorito) {
      setListaFavoritos(listaFavoritos.filter(item => item.id !== filme.id));
    } else {
      setListaFavoritos([...listaFavoritos, filme]);
    }
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
                
                {/* BOTÃO ASSISTIR QUE REPRODUZ O TRAILER PRINCIPAL */}
                <TouchableOpacity style={styles.playButton} onPress={() => handlePlayVideo(TRAILER_PRINCIPAL)}>
                  <Ionicons name="play" size={20} color="#000" />
                  <Text style={styles.playText}>Trailer</Text>
                </TouchableOpacity>

                {/* BOTÃO MINHA LISTA DINÂMICO NO BANNER */}
                <TouchableOpacity 
                  style={styles.listButton}
                  onPress={() => toggleFavorito({ id: 'hero1', titulo: 'Supergirl', image: 'https://abcdoabc.com.br/_image?href=https%3A%2F%2Fcdn-imgs.s3.sa-east-1.amazonaws.com%2Fwp-content%2Fuploads%2F2025%2F12%2Fsupergirl.jpg&w=525&h=350&f=webp', videoUrl: TRAILER_PRINCIPAL })}
                >
                  <Ionicons 
                    name={listaFavoritos.some(item => item.id === 'hero1') ? "checkmark" : "add"} 
                    size={24} 
                    color={listaFavoritos.some(item => item.id === 'hero1') ? "#00E5FF" : "#fff"} 
                  />
                  <Text style={[styles.listText, listaFavoritos.some(item => item.id === 'hero1') && { color: '#00E5FF' }]}>
                    {listaFavoritos.some(item => item.id === 'hero1') ? "Salvo" : "Minha Lista"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* LISTA DINÂMICA DE FAVORITOS (Só aparece se tiver filme salvo) */}
          {listaFavoritos.length > 0 && (
            <View style={[styles.categoriesContainer, { marginTop: 30 }]}>
              <Text style={[styles.categoryTitle, { color: '#00E5FF' }]}>Minha Lista Favorita ★</Text>
              <FlatList
                horizontal
                data={listaFavoritos}
                keyExtractor={(item) => 'fav-' + item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: Platform.OS === 'web' ? 0 : 20 }}
                renderItem={({ item }: { item: any }) => (
                  // Clicar no card roda o vídeo salvo
                  <TouchableOpacity style={styles.movieCard} onPress={() => handlePlayVideo(item.videoUrl)}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.cardGradient} />
                    <Text style={styles.cardTitle}>{item.titulo}</Text>
                    
                    {/* Botão de remover dos favoritos */}
                    <TouchableOpacity style={styles.favoriteHeartIcon} onPress={() => toggleFavorito(item)}>
                      <Ionicons name="heart" size={20} color="#00E5FF" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* CATÁLOGO: MEUS FAVORITOS (CONTINUAR ASSISTINDO) */}
          <View style={styles.categoriesContainer}>
            <Text style={styles.categoryTitle}>Continuar Assistindo</Text>
            <FlatList
              horizontal
              data={MEUS_FAVORITOS}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: Platform.OS === 'web' ? 0 : 20 }}
              renderItem={({ item }: { item: any }) => (
                // Clicar no card roda o vídeo dinâmico
                <TouchableOpacity style={styles.movieCard} onPress={() => handlePlayVideo(item.videoUrl)}>
                  <Image source={{ uri: item.image }} style={styles.cardImage} />
                  <LinearGradient 
                    colors={['transparent', 'rgba(0,0,0,0.9)']} 
                    style={styles.cardGradient} 
                  />
                  <Text style={styles.cardTitle}>{item.titulo}</Text>

                  {/* Ícone de Coração flutuante */}
                  <TouchableOpacity style={styles.favoriteHeartIcon} onPress={() => toggleFavorito(item)}>
                    <Ionicons 
                      name={listaFavoritos.some(fav => fav.id === item.id) ? "heart" : "heart-outline"} 
                      size={20} 
                      color={listaFavoritos.some(fav => fav.id === item.id) ? "#00E5FF" : "#fff"} 
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* NOVA SEÇÃO ADICIONADA: RECOMENDADOS / POPULARES */}
          <View style={[styles.categoriesContainer, { marginTop: 30 }]}>
            <Text style={styles.categoryTitle}>Filmes Populares</Text>
            <FlatList
              horizontal
              data={FILMES_POPULARES}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: Platform.OS === 'web' ? 0 : 20 }}
              renderItem={({ item }: { item: any }) => (
                // Clicar no card roda o vídeo dinâmico
                <TouchableOpacity style={styles.movieCard} onPress={() => handlePlayVideo(item.videoUrl)}>
                  <Image source={{ uri: item.image }} style={styles.cardImage} />
                  <LinearGradient 
                    colors={['transparent', 'rgba(0,0,0,0.9)']} 
                    style={styles.cardGradient} 
                  />
                  <Text style={styles.cardTitle}>{item.titulo}</Text>

                  {/* Ícone de Coração flutuante */}
                  <TouchableOpacity style={styles.favoriteHeartIcon} onPress={() => toggleFavorito(item)}>
                    <Ionicons 
                      name={listaFavoritos.some(fav => fav.id === item.id) ? "heart" : "heart-outline"} 
                      size={20} 
                      color={listaFavoritos.some(fav => fav.id === item.id) ? "#00E5FF" : "#fff"} 
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Espaçador no final para o conteúdo não sumir atrás da TabBar */}
          <View style={{ height: 140 }} />
        </ScrollView>

        {/* BOTTOM TAB BAR RESPONSIVA E DINÂMICA */}
        <View style={styles.bottomTab}>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="home" size={24} color="#00E5FF" />
            <Text style={[styles.tabText, { color: '#00E5FF' }]}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            {/* Muda o visual se tiver favoritos na lista */}
            <Ionicons name={listaFavoritos.length > 0 ? "heart" : "heart-outline"} size={24} color={listaFavoritos.length > 0 ? "#00E5FF" : "#888"} />
            <Text style={[styles.tabText, listaFavoritos.length > 0 && { color: '#00E5FF' }]}>Favoritos</Text>
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
            allowsFullscreen={true} 
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
  
  // ESTILO DO CORAÇÃOZINHO NO CARD
  favoriteHeartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 6,
    borderRadius: 15,
  },

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