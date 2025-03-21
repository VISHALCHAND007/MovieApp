import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const bookmarks = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image className="size-10" source={icons.save} tintColor="#fff" />
        <Text className="text-gray-500 text-base font-bold">Bookmarks</Text>
      </View>
    </View>
  );
};

export default bookmarks;

const styles = StyleSheet.create({});
