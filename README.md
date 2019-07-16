# :circus_tent: Circus
# nodejs-news
NodeJS Step 12 news site

# node.js - express로 :newspaper: 뉴스페이지 만들기
- express, DB없이 node.js만으로 todo list만들기 후 이제는 express와 MongoDB/mongoose를 이용해 뉴스페이지를 만들어보자.
- 이번 프로젝트에서는 JWT와 Oauth를 써보자.
- 그리고 이번에는 test framework를 사용해 보자.

# :books: 콘셉 
- 방문자나 회원들이 페이지로 방문하면 기자가 작성한 뉴스들을 볼 수 있는 페이지를 만들어보자

---

## :closed_book: 사용자 콘셉 
### :seedling: 방문자
- 오직 기자가 올린 기사들을 조회할 수만 있다. 다른 권한은 일체 없다.

### :baby_chick: 일반회원
1. 기사를 조회할 수 있다.
2. 기사에 댓글을 달 수 있다. 댓글에 댓글도 가능하다.
3. 기사에 좋아요, 싫어요 등 감정표현을 할 수 있다.
4. 댓글에도 good, bad를 할 수 있다.
5. 좋아하는 기자를 구독할 수 있다.  
:heavy_exclamation_mark: 뉴스홈 오른쪽 아래에 구독한 기자들의 최신 기사들을 표시되는 기능을 추후 시간이 남으면 추가할 예정
6. 기자가 되고 싶은 회원은 기자요청을 할 수 있다. (관리자가 수락하면 기자로 변경)
7. 회원탈퇴를 할 수 있다.

### :black_nib: 기자
1. 일반회원이 가지고 있는 권한은 다 가지고 있다.
2. 기사를 쓸 수 있다.  
:heavy_exclamation_mark: 구독자 수와 조회 수, 좋아요 수 등을 종합하여 기자순위를 매겨서 표시하는 기능을 추후 시간이 남으면 추가할 예정

### :crown: 관리자
1. 기자가 가지고 있는 권한을 다 가지고 있다.
2. 기자요청을 수락 또는 거절 할 수 있다.
3. 회원들을 관리한다. = 강퇴가능, 기사삭제 가능   
:heavy_exclamation_mark: 추후 시간이 남으면 강퇴당한 ID로는 다시 가입하지 못하는 기능 추가할 예정
4. 각종 통계를 볼 수 있다.

---
## :blue_book: 페이지 콘셉
### 홈페이지 : URL = '/', method = GET
![homePage](./readme-img/newspage-home.png)
