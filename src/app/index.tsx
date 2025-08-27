import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const router = useRouter()

  const goToSignin = () => {
    router.push('/signin' as any);
  }

  const goToSignup = () => {
    router.push('/signup' as any);
  }

  return (
    <View className="flex-1 justify-center items-center bg-black px-6">
      <Text className="text-3xl font-bold mb-6 text-center text-white">
        케이엘피 커뮤니티 앱에 오신걸 환영합니다!
      </Text>
      <View className='flex flex-row gap-3'>
        <TouchableOpacity
          onPress={goToSignin}
          className="bg-zinc-700 px-6 py-3 rounded-2xl"
        >
          <Text className="text-white text-lg font-semibold text-center">로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToSignup}
          className="bg-zinc-700 px-6 py-3 rounded-2xl"
        >
          <Text className="text-white text-lg font-semibold text-center">회원가입</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}
