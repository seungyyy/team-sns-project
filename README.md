# 청귤마켓 SNS - Teme project

**멋쟁이 사자처럼 프론트 엔드 스쿨에서 진행한 팀프로젝트**

- 2022년 1월 3일 ~ 2022년 1월 18일

<br>

## 청귤마켓 서비스

자신의 스토어에서 판매하고 있는 상품을 등록하여 홍보할 수 있는 SNS입니다.
상품을 등록하지 않아도 자신의 일상을 글과 사진을 작성하여 공유할 수 있습니다.
다른 사용자를 팔로우하면 유저가 올린 게시물을 홈 피드에서 소식을 확인할 수도 있습니다. <br>

<br>

<img src="https://user-images.githubusercontent.com/54584337/151692003-f469d799-e4ab-42e1-b810-1c50c56eeb02.png" alt="청귤마켓 시안">


<br>
<br>

## Link

**🍊 [ChunguylMaket_link](http://chungyul.shop/)** <br>
**🎥 [ChunguylMaket_youtube_link](https://youtu.be/mvG_-Mhu-jM)** <br>
**📁 [figma_link](https://www.figma.com/file/UBfYgfoHk9AcrADQ986AVW?embed_host=notion&kind=&node-id=0%3A1&viewer=1)** <br>
**📱 [figma_mobile_presentation_link](https://www.figma.com/proto/UBfYgfoHk9AcrADQ986AVW/%EB%A9%8B%EC%82%AC-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%8A%A4%EC%BF%A8_%EC%B2%AD%EA%B7%A4%EB%A7%88%EC%BC%93?node-id=0%3A1)** <br>
**📑 [ChunguylMaket_Project_Notion_link](https://www.notion.so/Project-fffb4d698df34504b1f1802ba926462c)**

<br>
<br>
<br>

## Team Member

| Name   | 🙋‍♀️ 이승연                   | 🌱 조혜미                  | 🙋‍♂️ 유순상                    |
| ------ | --------------------------- | -------------------------- | ---------------------------- |
| Github | https://github.com/seungyyy | https://github.com/JoHyemi | https://github.com/yooss2006 |

<br>
<br>

## Stack

### Frontend

- HTML
- CSS
- JAVASCRIPT

### Backend

- 제공된 api 사용

### etc

- 피그마 수정(로고 변경), 모바일프레젠테이션 제작 (이승연)
- 썸네일 이미지, 유튜브 영상 제작 (이승연)

<br>
<br>

## 페이지 UI, 기능 구현 &nbsp;&nbsp;&nbsp;[🔗 페이지별 기능\_link](https://github.com/seungyyy/team-sns-project/wiki/Pages-Feature)

| Name   | Page                                                   |
| ------ | ------------------------------------------------------ |
| 이승연 | splash, 로그인, 회원가입, 검색, 프로필 수정, 상품 등록 |
| 조혜미 | 게시물 댓글페이지, 게시글 상세, 채팅목록, 채팅방       |
| 유순상 | 홈화면, 팔로워 팔로잉 목록, myProfile, otherProfile    |

<br>

## 페이지별 기능정리

<br>

### 이승연

### - 로그인

    - 입력시 버튼 활성화 / 로그인 유효성 검사
    - 입력창 focus 선 색 변경
    - 경고 문구

### - 회원가입 

    - 입력창에서 포커스를 잃으면 바로 유효성 검사
    - 유효하지 않거나 이미 가입 여부, 비밀번호 6자미만 경고 문구
    - 다음 버튼 활성화 시 프로필 설정 폼 화면 전환
    - 프로필 설정에 필요한 프로필 사진, 사용자 이름(2~10자 이내), 계정 ID, 소개를 입력받음
    - 프로필 사진 등록하지 않을 경우 기본 이미지 등록
    - 계정 ID 중복 불가
    - 프로필 설정 유효성 검사 
  
### - 프로필 수정

    - 유효성 검사가 통과일 경우만 `저장` 버튼이 활성화
    - 계정 ID 중복여부(본인 계정은 제외) 

### - 검색 

    - 사용자 이름 검색 페이지 기능 구현
    - 유저 선택시 유저 프로필로 이동
    - 검색어와 같은 단어에는 초록색 글씨가 표시

### - 상품 등록

    - 상품 이미지, 상품명, 가격, 판매링크를 입력받을 수 있으며, 모든 입력이 완료되면 저장 버튼이 활성화
    - 상품명은 2~15자 이내로 입력 
    - 가격은 숫자만 입력
    - 판매링크 유효성 검사

<br>

### 유순상

### - 홈 feed

    - 팔로우한 사용자의 게시글만 조회
    - 팔로우한 사용자가 없는 경우,  "유저를 검색해 팔로우 해보세요!" 문구와 함께 검색하기 버튼이 표시
    - 게시글 하단에 하트 모양에 좋아요 버튼 기능 구현
    - 게시글 이미지 두개 이상이면 슬라이드 기능
    - 유저 클릭시 유저 프로필로 이동

### - 사용자 프로필

    - 사용자 이름, 계정Id 소개, 팔로워 및 팔로잉 수, 판매상품 ,업로드 게시글 확인가능
    - 팔로우 기능 구현
    - 팔로워 및 팔로잉 수 클릭 시 사용자 목록 표시
    - 판매 중인 상품 섹션은 등록된 상품 없을 경우  표시 없음
    - 게시글 섹션 목록형(기본형) 앨범형 구현

### - 팔로워, 팔로잉 목록

    - 목록은 사용자 프로필 사진, 이름, 계정id , 팔로우 버튼 구성
    - 내가 팔로우 한 사용자 경우 취소버튼, 하지 않은 경우 팔로우 기능 구현

### - nav menu 기능

    - 아이콘 클릭시 해당 페이지로 이동하며 클릭한 아이콘 초록 색으로 색상 변환, 다른 아이콘은 회색으로 색상 변환

<br>

### 조혜미

### - splash

    - 유저가 로그인을 한 상태면 home 이동
    - 로그인을 하지 않은 상태면 login 이동

### - 게시글

    - 하단 메뉴바  게시글 작성 클릭시 표시
    - 글 입력 사진 업로드 === 버튼 활성화
    - 사진 버튼 업로드 가능 최대 3장까지 업로드
    - 말풍성 아이콘 클릭 댓글 확인 입력 페이지 구현
    - 입력창 텍스트 입력 시 게시 버튼 활성화
    - 게시글 하단에 하트 모양에 좋아요 버튼 기능 구현


### - 채팅 목록

    - 마크업
    - 채팅목록 클릭 시 채팅방 이동

### 채팅방

    - 마크업
    - 채팅 입력 시 화면에 보이고 현재 시간 표시
    - 입력창 텍스트 입력 시 전송 버튼 활성화
    - 상단 더보기 클릭 시 채팅방 나가기

<br>
<br>
<br>

## 문제점과 해결

- **개인마다 코딩스타일이 다른점**
  - 코딩 컨벤션 맞추기
    - HTML, CSS - kebab-case
    - Java Script - camelCase
    - class 네이밍 맞추기
    - 스타일 시트 블록 마다 한칸씩
    - 섹션이나 파트 마다 주석 코멘트
    - cont—hide 클래스를 줘 화면에서 사라지게 했음 (이벤트 동작 시 )
  - 주기적인 회의
    - 매일 점심시간에 모여 회의를 진행했음
    - 문제점을 빠르게 찾고 수정이 용이했다.
- **협업을 위한 깃 사용의 어려움**

  - 이승연 - 깃 사용법 학습 및 공유
  - github의 issues와 projects 기능 사용

- **API 사용의 어려움**
  - 최원범 멘토님께 도움을 요청해 비동기 요청 학습
- **페이지마다 CSS 작성 → CSS를 하나로 합쳐야 했음**
  - CSS를 하나로 합치며 클래스 겹침 문제 발생
    - 유순상 - 전체적으로 페이지를 검토하며 header 부분과 nav부분을 하나로 획일화, 클래스명 수정하여 클래스명 겹침 해결
  - 남은정 멘토님께 코드리뷰를 부탁드림
    - 고정 px, 모바일기준 손가락 크기 고려 등의 피드백
- **https로 배포시 fetch가 안 되는 문제**

  - 제공되었던 API가 http로 되어있었기 때문에, github 배포시 Mixed content 문제 발생
    - meta 태그를 추가해도 해결이 안 됨
    - 도메인 주소를 사서 custom domain 설정

- **ios input focus 시 자동 zoom-in**
  - `<input>`의 폰트 크기가 16px 보다 작으면 focus 시 자동으로 줌인되는 문제 발생
  - 16px보다 작은 폰트 크기에서의 눈이 나쁜 사용자에게는 불편하기 때문에 생긴 기능
  - 사용자가 사용하기 편리하게 16px이상으로 조정
    <br>
    <br>
    <br>

## 프로젝트 소감

- **이승연**

  서버 api를 제공받아서 하는 팀프로젝트여서 굉장히 설렜던 프로젝트입니다. 부족한데 과연 해낼 수 있을까라는 마음도 있었지만 완료까지 해서 배포를 하니 정말 뿌듯합니다. 팀원분들과 매일 회의를 하면서 더 열심히 해야겠다는 생각도 많이 하고 책임감을 갖고 했던 프로젝트입니다. 좋은 팀원분들을 만나서 정말 많이 배우고 성장 할 수 있었습니다. 같이 함께 완료해서 하나의 사이트를 만들었다는 것이 뜻깊고 좋은 경험이였습니다.

- **조혜미**

  처음에는 두 달 공부한걸로 이 프로젝트를 할 수 있을지 확신이 안 서서 굉장히 막막했습니다. 그래도 팀원분들이 계속 용기를 붇돋아주고, 도와주셔서 마무리할 수 있었습니다.

  팀프로젝트라고 하면 굉장히 어렵다는 얘기를 많이 들었는데, 의지 넘치고 상냥한 팀원들 덕에 큰 어려움 없이 진행할 수 있었습니다. 정말 많이 배우고 성장할 수 있는 시간이었던 것 같습니다. 오류 하나에 새벽까지 붙잡고 머리 싸매던게 어제같은데 이렇게 마무리를 하게 되니 시원섭섭하네요!

  앞으로도 이번 프로젝트처럼 재미있고, 많이 배울 수 있는 프로젝트 하고 싶습니다🙂

- **유순상**

  제대로 하는 첫 팀프로젝트였고 좋은 분들과 프로젝트를 함께해 무사히 마무리할 수 있었습니다.

  초반에 인원이 한명 빠지는 불상사가 있었지만 그럼에도 열정적인 분들과 한번 해보자 식으로 시작했었습니다. 회의도 2주동안 매일 하며 서로의 의견을 나눴고 발생한 문제에 대해 다같이 해결하며 그 어느때보다 빠르게 성장한것 같습니다.

  승연님 덕분에 깃으로 협업하는 방법, 피그마 만드는 법 등을 재밌게 배웠습니다. 또 혜미님이 열심히하시는 모습을 보고 저도 더욱 열정적으로 할 수 있었어요 두분께 감사드리고 다음 프로젝트도 같이하고 싶을 정도로 재미있게 한 프로젝트 였습니다. 완성된 결과를 보니 너무 뿌듯합니다 감사했습니다. 팀원들!
