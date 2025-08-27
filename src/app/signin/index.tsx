import { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Signin() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const isAllFilled = id !== '' && password !== ''

  // 로그인 API연결
  const onNext = () => {
    console.log('로그인 시도:', { id, password })
    // TODO: 실제 로그인 로직 추가
  }

  return (
    <View className="flex-1 bg-black justify-center">
      <ScrollView
        className="flex-1 px-6 py-10"
        showsVerticalScrollIndicator={false}
      >
        {/* input */}
        <View className="mb-4">
          <View className="flex-col gap-5">
            <View className="flex-1">
              <Text className="text-white text-sm mb-1">아이디</Text>
              <TextInput
                className="bg-zinc-800 text-white px-4 py-2 rounded-xl"
                value={id}
                onChangeText={setId}
                placeholder="아이디 입력"
                placeholderTextColor="#888"
              />
            </View>
            <View className="flex-1">
              <Text className="text-white text-sm mb-1">비밀번호</Text>
              <TextInput
                className="bg-zinc-800 text-white px-4 py-2 rounded-xl"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호 입력"
                placeholderTextColor="#888"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          disabled={!isAllFilled}
          onPress={onNext}
          className={`py-3 rounded-2xl ${isAllFilled ? 'bg-emerald-600' : 'bg-zinc-600'
            }`}
        >
          <Text className="text-white text-center text-lg font-semibold">
            로그인
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
