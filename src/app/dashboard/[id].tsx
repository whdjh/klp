import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    const postId = Array.isArray(id) ? id[0] : id;

    const loadPost = async () => {
      try {
        const stored = await AsyncStorage.getItem("posts");
        const posts = stored ? JSON.parse(stored) : [];
        const found = posts.find((p: any) => p.id === postId);

        if (!found) {
          Alert.alert(
            "글을 찾을 수 없습니다",
            "존재하지 않는 글이거나 삭제된 글입니다.",
            [{ text: "확인", onPress: () => router.back() }]
          );
          return;
        }

        setPost(found);
      } catch (err) {
        console.error(err);
        Alert.alert("오류", "글을 불러올 수 없습니다.",
          [{ text: "확인", onPress: () => router.back() }]
        );
      }
    };

    loadPost();
  }, [id, router]);

  if (!post) {
    return null;
  }

  return (
    <View className="flex-1 bg-black px-6 py-10">
      <TouchableOpacity
        onPress={() => router.back()}
        className="mb-4 self-start"
      >
        <Text className="text-emerald-500 text-lg">← 뒤로가기</Text>
      </TouchableOpacity>

      <Text className="text-white text-2xl font-bold mb-4">{post.title}</Text>
      <Text className="text-zinc-400 mb-2">작성자: 익명</Text>
      <Text className="text-white text-base">{post.content}</Text>
    </View>
  );
}