import { useMemo } from 'react';
import { ActivityIndicator, Animated, FlatList, Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { MovieCard, SearchBar, TrendingCard } from '@/components';
import { useFetchMoviesQuery } from '@/services/movieApi';
import { getTrendingMovies } from '@/services/appwrite_db';
import useFetch from '@/hooks/useFetch';
import { getErrorMessage } from '@/utilities';
import ScrollView = Animated.ScrollView;

export default function Index() {
  const router = useRouter();
  const {
    data: moviesResp,
    isLoading: moviesLoading,
    error,
  } = useFetchMoviesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const movies = useMemo(() => {
    return moviesResp && moviesResp?.results ? moviesResp?.results : [];
  }, [moviesResp]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className={'absolute w-full z-0'} />
      <ScrollView
        className={'flex-1 px-5'}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}>
        <Image source={icons.logo} className={'w-12 h-10 mt-20 mb-5 mx-auto'} />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator size={'large'} color={'#0000ff'} className={'mt-10 self-center'} />
        ) : error ? (
          <Text>Error: {getErrorMessage(error || trendingError)}</Text>
        ) : (
          <View className={'flex-1 mt-5'}>
            <SearchBar placeholder={'Search a movie'} onPress={() => router.push('/search')} />
            {trendingMovies && (
              <View className='mt-10'>
                <Text className='text-lg text-white font-bold mb-3'>Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className='mb-4 mt-3'
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className='w-4' />}
                />
              </View>
            )}
            <>
              <Text className={'text-lg text-white font-bold mt-5 mb-3'}>Latest movies</Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className={'mt-2 pb-32'}
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
