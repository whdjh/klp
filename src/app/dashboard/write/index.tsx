import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function Write() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  // TODO: 글 작성 API연결
  const onNext = async () => {
    if (!title || !content) {
      return;
    }

    try {
      const stored = await AsyncStorage.getItem("posts");
      const posts = stored ? JSON.parse(stored) : [];

      const newPost = {
        id: Date.now().toString(),
        title,
        content,
        imageUri,
      };

      const updated = [...posts, newPost];
      await AsyncStorage.setItem("posts", JSON.stringify(updated));

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  // 이미지 선택
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.error("이미지 선택 오류:", err);
    }
  };

  return (
    <View className="flex-1 bg-black px-6 py-10">
      <Text className="text-white text-2xl font-bold mb-4">글 작성</Text>

      <TextInput
        className="bg-zinc-800 text-white px-4 py-2 rounded-xl mb-4"
        placeholder="제목"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="bg-zinc-800 text-white px-4 py-2 rounded-xl mb-4"
        placeholder="내용"
        placeholderTextColor="#888"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity
        onPress={pickImage}
        className="bg-zinc-700 py-3 rounded-xl mb-4"
      >
        <Text className="text-white text-center font-semibold">이미지 선택</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          className="w-full h-64 mb-4 rounded-xl"
          resizeMode="contain"
        />
      )}

      <Text className="text-zinc-400 mb-6">작성자: 익명</Text>

      <TouchableOpacity
        onPress={onNext}
        className="bg-emerald-600 py-3 rounded-2xl"
      >
        <Text className="text-white text-center text-lg font-semibold">
          글 등록하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}
