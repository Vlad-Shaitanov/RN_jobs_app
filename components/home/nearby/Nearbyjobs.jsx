import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useRouter, Link } from "expo-router";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import { useMockBaseData } from "../../../hooks/useMockBaseData";

const Nearbyjobs = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
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
          data.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
