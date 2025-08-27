import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Alert, ScrollView, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [post, setPost] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

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
        loadComments(postId);
      } catch (err) {
        console.error(err);
        Alert.alert("오류", "글을 불러올 수 없습니다.",
          [{ text: "확인", onPress: () => router.back() }]
        );
      }
    };

    loadPost();
  }, [id, router]);

  const loadComments = async (postId: string) => {
    try {
      const stored = await AsyncStorage.getItem(`comments_${postId}`);
      const commentsData = stored ? JSON.parse(stored) : [];
      setComments(commentsData);
    } catch (err) {
      console.error("댓글 로딩 오류:", err);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) {
      Alert.alert("알림", "댓글 내용을 입력해주세요.");
      return;
    }

    const postId = Array.isArray(id) ? id[0] : id;
    const comment = {
      id: `comment_${Date.now()}`,
      content: newComment.trim(),
      author: "익명",
      createdAt: new Date().toISOString()
    };

    try {
      const updatedComments = [...comments, comment];
      await AsyncStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
      setComments(updatedComments);
      setNewComment("");
      Alert.alert("성공", "댓글이 작성되었습니다.");
    } catch (err) {
      console.error("댓글 저장 오류:", err);
      Alert.alert("오류", "댓글 작성에 실패했습니다.");
    }
  };

  if (!post) {
    return null;
  }

  return (
    <View className="flex-1 bg-black">
      <ScrollView className="flex-1 px-6 py-10">
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mb-4 self-start"
        >
          <Text className="text-emerald-500 text-lg">← 뒤로가기</Text>
        </TouchableOpacity>

        {/* 글 내용 */}
        <Text className="text-white text-2xl font-bold mb-4">{post.title}</Text>
        <Text className="text-zinc-400 mb-2">작성자: 익명</Text>
        <Text className="text-white text-base mb-8">{post.content}</Text>

        {/* 댓글 섹션 */}
        <View className="border-t border-zinc-700 pt-6">
          <Text className="text-white text-lg font-semibold mb-4">
            댓글 ({comments.length})
          </Text>

          {/* 댓글 목록 */}
          {comments.map((comment) => (
            <View key={comment.id} className="bg-zinc-800 p-4 rounded-xl mb-3">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-zinc-400 text-sm">{comment.author}</Text>
              </View>
              <Text className="text-white">{comment.content}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 댓글 작성 */}
      <View className="px-6 pb-6 border-zinc-700 bg-black">
        <TextInput
          className="bg-zinc-800 text-white p-4 rounded-xl mb-3 min-h-[50px]"
          placeholder="댓글을 입력하세요..."
          placeholderTextColor="#71717a"
          value={newComment}
          onChangeText={setNewComment}
          multiline
          textAlignVertical="top"
        />
        <TouchableOpacity
          onPress={addComment}
          className="bg-emerald-600 py-3 rounded-xl"
        >
          <Text className="text-white text-center font-semibold">댓글 작성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}