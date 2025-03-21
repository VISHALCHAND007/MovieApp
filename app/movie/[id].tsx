import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-base">{label}</Text>
    <Text className="text-light-100 font-bold text-base mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="mx-5">
          {/* movie details */}
          <View className="flex-col items-start justify-center mt-5">
            <Text className="text-white font-bold text-2xl">
              {movie?.title}
            </Text>
            <View className="flex-row justify-center items-center gap-x-3.5 mt-2">
              <Text className="text-light-200 text-base">
                {movie?.release_date?.split("-")[0]}
              </Text>
              <Text className="text-light-200 text-base">•</Text>
              <Text className="text-light-200 text-base">{movie?.status}</Text>
              <Text className="text-light-200 text-base">•</Text>
              <Text className="text-light-200 text-base">
                {movie?.runtime} min
              </Text>
            </View>
          </View>
          {/* card rating */}
          <View className="max-w-[150] flex-row justify-center items-center bg-dark-100 px-2 py-2 rounded-md gap-x-1 mt-4">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-sm font-bold">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          {/* overview */}
          <MovieInfo label="Overview" value={movie?.overview} />

          {/* countries */}
          <MovieInfo
            label="Countries"
            value={
              movie?.production_countries
                ?.map((country) => country.name)
                .join(" • ") || "N/A"
            }
          />

          {/* budget / revenue */}
          <View className="flex-row justify-between w-[90%]">
            {movie?.budget && (
              <MovieInfo
                label="Budget"
                value={`$ ${movie?.budget / 1000000} Million`}
              />
            )}
            {movie?.revenue && (
              <MovieInfo
                label="Revenue"
                value={`$ ${Math.round(movie?.revenue) / 1000000} Million`}
              />
            )}
          </View>

          {/* generes */}
          <MovieInfo
            label="Generes"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />

          {/* production companies */}
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((comp) => comp.name)
                .join(" • ") || "N/A"
            }
          />
        </View>
      </ScrollView>
      {/* go back button */}
      <TouchableOpacity
        className="absolute bottom-7 left-0 right-0  mx-5 bg-accent flex flex-row py-3.5 rounded-lg
      items-center justify-center z-50"
        onPress={() => router.back()}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#000"
        />
        <Text className="text-[#000] font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
