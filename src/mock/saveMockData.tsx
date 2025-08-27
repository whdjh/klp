import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock 데이터 생성 함수
const generateMockPosts = () => {
  const titles = [
    "리액트 네이티브 개발 팁",
    "Expo Router 사용법 정리",
    "TypeScript 에러 해결하기",
    "AsyncStorage 완전 정복",
    "모바일 앱 UI/UX 디자인",
    "React Native 성능 최적화",
    "Expo 앱 배포하기",
    "네이티브 모듈 연동 방법",
    "앱 스토어 출시 가이드",
    "React Hooks 활용법",
    "상태 관리 라이브러리 비교",
    "API 연동과 데이터 관리",
    "푸시 알림 구현하기",
    "앱 보안 강화하기",
    "디버깅 도구 활용하기",
    "크로스 플랫폼 개발 전략",
    "사용자 인증 시스템 구축",
    "데이터베이스 설계 패턴",
    "앱 성능 모니터링",
    "코드 리뷰 체크리스트"
  ];

  const contents = [
    "React Native 개발을 하면서 알아두면 유용한 팁들을 정리해봤습니다. 특히 성능 최적화와 관련된 내용들이 많이 도움이 될 것 같아요.",
    "Expo Router를 처음 사용해보면서 겪었던 시행착오들과 해결 방법들을 공유합니다. 특히 TypeScript와 함께 사용할 때 주의사항들이 있네요.",
    "TypeScript 에러들을 해결하면서 배운 것들을 정리했습니다. 타입 정의부터 에러 핸들링까지 다양한 케이스들을 다뤄봤어요.",
    "AsyncStorage 사용법부터 성능 최적화까지 완전 정복해보겠습니다. 실제 프로젝트에서 사용하면서 얻은 노하우들도 함께 공유해요.",
    "모바일 앱의 UI/UX 디자인할 때 고려해야 할 점들을 정리했습니다. 사용자 경험을 개선하는 다양한 방법들을 소개해드려요.",
    "React Native 앱의 성능을 최적화하는 방법들을 실제 사례와 함께 설명합니다. 메모리 관리부터 렌더링 최적화까지 다뤄볼게요.",
    "Expo로 개발한 앱을 실제로 배포하는 과정을 단계별로 설명합니다. App Store와 Play Store 배포 과정을 모두 다뤄봅시다.",
    "React Native에서 네이티브 모듈을 연동하는 방법을 알아봅시다. iOS와 Android 각각의 네이티브 기능을 활용하는 법을 설명해요.",
    "앱 스토어에 성공적으로 출시하기 위한 체크리스트를 만들어봤습니다. 심사 기준부터 메타데이터 작성까지 꼼꼼히 준비해봐요.",
    "React Hooks를 실제 프로젝트에서 어떻게 활용할 수 있는지 다양한 예제와 함께 설명합니다. 커스텀 Hook 만들기도 포함돼 있어요.",
    "상태 관리 라이브러리들을 비교 분석해봤습니다. Redux, Zustand, Context API 등 각각의 장단점을 실제 사용 경험을 바탕으로 정리했어요.",
    "REST API와 GraphQL을 활용한 데이터 관리 방법을 알아봅시다. 에러 핸들링과 캐싱 전략도 함께 다뤄볼게요.",
    "푸시 알림을 구현하는 과정을 단계별로 설명합니다. Firebase부터 로컬 알림까지 다양한 방법들을 소개해드려요.",
    "모바일 앱의 보안을 강화하는 방법들을 알아봅시다. 데이터 암호화부터 인증 보안까지 실무에서 적용할 수 있는 팁들을 공유해요.",
    "개발 과정에서 사용할 수 있는 다양한 디버깅 도구들을 소개합니다. Flipper, React DevTools 등 효율적인 디버깅 방법을 알아봐요.",
    "React Native로 크로스 플랫폼 개발을 할 때의 전략과 주의사항들을 정리했습니다. 플랫폼별 차이점을 어떻게 처리할지 고민해봐요.",
    "사용자 인증 시스템을 구축하는 방법을 알아봅시다. JWT 토큰 관리부터 소셜 로그인까지 실제 구현 과정을 보여드려요.",
    "효율적인 데이터베이스 설계 패턴들을 소개합니다. 관계형 DB와 NoSQL의 선택 기준부터 스키마 설계까지 다뤄볼게요.",
    "앱의 성능을 실시간으로 모니터링하는 방법들을 알아봅시다. 크래시 리포팅부터 성능 메트릭 수집까지 다양한 도구들을 소개해요.",
    "효과적인 코드 리뷰를 위한 체크리스트를 만들어봤습니다. 코드 품질 향상과 팀 협업을 위한 실용적인 가이드라인을 제시해요."
  ];

  return titles.map((title, index) => ({
    id: `post_${index + 1}`,
    title,
    content: contents[index],
    author: "익명",
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // 지난 30일 내 랜덤 날짜
    likes: Math.floor(Math.random() * 100), // 0-99 랜덤 좋아요 수
    views: Math.floor(Math.random() * 500) + 50 // 50-549 랜덤 조회수
  }));
};

// AsyncStorage에 mock 데이터 저장하는 함수
export const saveMockData = async () => {
  try {
    const mockPosts = generateMockPosts();
    await AsyncStorage.setItem("posts", JSON.stringify(mockPosts));
    console.log("Mock 데이터 20개가 저장되었습니다!");
    return mockPosts;
  } catch (error) {
    console.error("Mock 데이터 저장 실패:", error);
  }
};