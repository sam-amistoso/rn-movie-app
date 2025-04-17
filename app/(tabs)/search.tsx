import { FlatList, Image, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { images } from '@/constants/images';
import { useFetchMoviesQuery } from '@/services/movieApi';
import { MovieCard } from '@/components';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: moviesResp,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useFetchMoviesQuery(searchQuery, {
    refetchOnMountOrArgChange: true,
    skip: !searchQuery, // Skip the query if searchQuery is empty
  });

  const movies = useMemo(() => {
    return moviesResp && moviesResp?.results ? moviesResp?.results : [];
  }, [moviesResp]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />
      <FlatList
        className='px-5'
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
export default Search;
