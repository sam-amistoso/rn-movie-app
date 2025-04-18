import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { images } from '@/constants/images';
import { useFetchMoviesQuery } from '@/services/movieApi';
import { updateSearchCount } from '@/services/appwrite';
import { MovieCard, SearchBar } from '@/components';
import { icons } from '@/constants/icons';
import { getErrorMessage } from '@/utilities';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  const {
    data: moviesResp,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchMoviesQuery(debouncedSearchQuery, {
    refetchOnMountOrArgChange: true,
    skip: !debouncedSearchQuery, // Skip the query if searchQuery is empty
  });
  const loading = isLoading || isFetching;

  const movies = useMemo(() => {
    const moviesData = moviesResp && moviesResp?.results ? moviesResp?.results : [];
    return searchQuery.trim()?.length === 0 ? [] : moviesData;
  }, [moviesResp, searchQuery]);

  useEffect(() => {
    const handleTimeOut = setTimeout(() => {
      if (searchQuery.trim()) {
        setDebouncedSearchQuery(searchQuery);
      } else {
        setDebouncedSearchQuery('');
      }
    }, 500);
    return () => {
      clearTimeout(handleTimeOut);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery.trim().length > 0 && movies?.length! > 0 && movies?.[0]) {
      updateSearchCount(debouncedSearchQuery, movies[0]).catch((error) => console.error(error));
    }
  }, [debouncedSearchQuery, movies]);

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
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            <View className='my-5'>
              <SearchBar
                placeholder='Search for a movie'
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && <ActivityIndicator size='large' color='#0000ff' className='my-3' />}
            {isError && (
              <Text className='text-red-500 px-5 my-3'>Error:{getErrorMessage(error)}</Text>
            )}

            {!loading && !isError && searchQuery.trim() && movies?.length! > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search Results for <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !isError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? 'No movies found' : 'Start typing to search for movies'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};
export default Search;
