import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveMockData } from "@/src/mock/saveMockData";


export default function Dashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);

  // TODO: 글 불러오기 API연결
  const loadPosts = async () => {
    try {
      const stored = await AsyncStorage.getItem("posts");
      let data = stored ? JSON.parse(stored) : [];
      // 데이터가 없으면 mock 데이터 생성

      if (data.length === 0) {
        data = await saveMockData();
      }

      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [])
  );

  return (
    <View className="flex-1 bg-black px-6 py-10">
      <Text className="text-white text-2xl font-bold mb-4">글 목록</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-zinc-800 p-4 rounded-xl mb-3"
            onPress={() => router.push(`/dashboard/${item.id}` as any)}
          >
            <Text className="text-white text-lg font-semibold">
              {item.title}
            </Text>
            <Text className="text-zinc-400 text-sm">작성자: 익명</Text>
          </TouchableOpacity>
        )}
      />

      {/* 글 작성 버튼 */}
      <TouchableOpacity
        onPress={() => router.push("/dashboard/write" as any)}
        className="bg-emerald-600 py-3 rounded-2xl mt-6"
      >
        <Text className="text-white text-center text-lg font-semibold">
          글 작성하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}
