import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

import styles from "./popularjobs.style";
import { SIZES, COLORS } from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import { useMockBaseData } from "../../../hooks/useMockBaseData";

const Popularjobs = () => {
  const router = useRouter();

  // Реальный запрос к бэку
  //   const { data, error, isLoading } = useFetch("search", {
  //     query: "React developer",
  //     num_pages: 1,
  //   });

  // Заглушка для экономии запросов к апи(лимит 200/мес)
  const { data, error, isLoading } = useMockBaseData("search", {
    query: "React developer",
    num_pages: 1,
  });

  const handleCardPress = (item) => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong!</Text>
        ) : (
          <FlatList
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard item={item} handleCardPress={handleCardPress} />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
