import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Dimensions, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

const { width } = Dimensions.get('window');

const CATEGORIAS = [
  {
    id: '1',
    titulo: 'Continuar Assistindo',
    dados: [
      { id: 'a', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400', progresso: 0.7 },
      { id: 'b', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400', progresso: 0.3 },
    ]
  },
  {
    id: '2',
    titulo: 'Originais MKR Max',
    dados: [
      { id: 'c', image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400' },
      { id: 'd', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400' },
      { id: 'e', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400' },
    ]
  }
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#020530', '#000000']} style={styles.background} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={{color: '#00E5FF', fontWeight: 'bold', fontSize: 20}}>MKR MAX</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/planos')}>
              <View style={styles.avatarPlaceholder}><Text style={styles.avatarText}>M</Text></View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroContainer}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800' }} style={styles.heroImage} />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)', '#000']} style={styles.heroGradient} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTag}>#1 NO MKR MAX HOJE</Text>
            <Text style={styles.heroTitle}>A Era dos Criadores</Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity style={styles.playButton}>
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

        <View style={styles.categoriesContainer}>
          {CATEGORIAS.map((categoria) => (
            <View key={categoria.id} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{categoria.titulo}</Text>
              <FlatList
                horizontal
                data={categoria.dados}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }: { item: any }) => (
                  <TouchableOpacity style={styles.movieCard}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                    {item.progresso !== undefined ? (
                      <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${item.progresso * 100}%` }]} />
                      </View>
                    ) : null}
                  </TouchableOpacity>
                )}
              />
            </View>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#00E5FF" />
          <Text style={[styles.tabText, { color: '#00E5FF' }]}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="play-circle-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Em breve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="download-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Downloads</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, height: 100, zIndex: 10 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 20 },
  avatarPlaceholder: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#00E5FF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  heroContainer: { width: width, height: 500 },
  heroImage: { width: '100%', height: '100%' },
  heroGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 250 },
  heroContent: { position: 'absolute', bottom: 20, width: '100%', alignItems: 'center', paddingHorizontal: 20 },
  heroTag: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginBottom: 10 },
  heroTitle: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  heroButtons: { flexDirection: 'row', justifyContent: 'center' },
  playButton: { flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 25, paddingVertical: 10, borderRadius: 5, alignItems: 'center', marginRight: 10 },
  playText: { color: '#000', fontWeight: 'bold', marginLeft: 5 },
  listButton: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 25, paddingVertical: 10, borderRadius: 5, alignItems: 'center' },
  listText: { color: '#fff', fontWeight: 'bold', marginLeft: 5 },
  categoriesContainer: { marginTop: 10 },
  categorySection: { marginBottom: 25, paddingLeft: 20 },
  categoryTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  movieCard: { marginRight: 15, width: 120 },
  cardImage: { width: 120, height: 180, borderRadius: 8 },
  progressBarContainer: { height: 3, backgroundColor: '#444', width: '100%', marginTop: 5, borderRadius: 2, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#00E5FF' },
  bottomTab: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.95)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', height: 70, position: 'absolute', bottom: 0, width: '100%', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10 },
  tabItem: { alignItems: 'center' },
  tabText: { color: '#888', fontSize: 10, marginTop: 4 },
});