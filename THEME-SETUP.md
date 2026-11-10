# 바다의 기록

푸른 바다와 소라를 모티브로 한 한국어 개인 블로그입니다. GitHub Pages가 기본 제공하는 Jekyll을 사용하며 별도 플러그인이나 GitHub Actions 설정 없이 글 목록, 태그·카테고리 탐색, 연도별 아카이브, 검색과 소개 페이지를 제공합니다.

## GitHub Pages에 설치하기

1. GitHub의 `allsii/allsii.github.io` 저장소를 로컬에 내려받거나, 웹에서 저장소 파일을 편집합니다.
2. 이 테마의 파일과 폴더를 저장소 **최상위 경로**에 복사합니다. `_config.yml`, `index.html`, `_layouts/`, `_posts/`, `assets/`, `archive.html`, `about.md`, `write.html`이 최상위에 오도록 합니다.
3. **기존 데이터는 삭제하거나 덮어쓰지 마세요.** 같은 이름의 파일이나 폴더가 이미 있다면 먼저 백업하고 내용을 비교한 뒤 필요한 부분을 직접 합치세요. 특히 기존 `README.md`가 있다면 이 문서의 내용을 기존 문서에 합쳐 보존하세요. 복사 후 변경 목록을 확인한 다음 `main` 브랜치에 커밋하고 푸시합니다.
4. 저장소의 **Settings → Pages**에서 **Build and deployment**의 Source를 **Deploy from a branch**로 선택합니다. Branch는 `main`, 폴더는 `/(root)`로 지정하고 저장합니다.
5. 배포가 완료되면 <https://allsii.github.io>에서 확인합니다. 최초 빌드에는 시간이 조금 걸릴 수 있으며, 빌드 상태는 저장소의 Pages 설정 화면에서 확인할 수 있습니다.

이 설정은 사용자 사이트 `allsii/allsii.github.io`를 기준으로 합니다. `_config.yml`의 `url`은 `https://allsii.github.io`, `baseurl`은 빈 문자열입니다. 다른 계정이나 프로젝트 저장소에서 사용한다면 해당 주소와 경로에 맞게 수정하고 `write.html`의 `editor_repo`와 `publish_branch`도 실제 저장소 이름과 브랜치에 맞게 확인하세요. 댓글 저장소가 다를 때는 `_config.yml`에 `comments_repo: 소유자/저장소`를 설정하세요.

## 브라우저에서 글과 사진 올리기

테마를 GitHub Pages에 적용한 뒤 메뉴의 **글쓰기**를 선택하면 휴대전화나 컴퓨터에서 제목과 내용을 쓰고 사진을 첨부할 수 있습니다. 게시 버튼은 게시글과 사진을 저장소에 함께 저장하며, 사이트 반영에는 GitHub Pages 빌드 시간이 필요합니다.

글을 게시하려면 작성자에게 해당 저장소에 대한 쓰기 권한이 필요합니다. GitHub의 **Settings → Developer settings → Personal access tokens → Fine-grained tokens**에서 토큰을 만들고, **Only select repositories**로 `allsii.github.io`만 선택한 뒤 **Repository permissions → Contents → Read and write** 권한을 부여하세요. 만료일도 설정하는 것이 좋습니다. 자세한 내용은 [GitHub 토큰 안내](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)를 참고하세요.

토큰은 비밀번호와 같습니다. 본인의 신뢰할 수 있는 기기에서 실제 `https://allsii.github.io/write/` 주소가 맞는지 확인한 후에만 글쓰기 화면에 입력하고, 누구에게도 공유하거나 채팅에 보내지 마세요. 토큰은 브라우저 저장소에 저장되지 않으며 GitHub API에만 전송됩니다. 이 글쓰기 화면은 공개되어 있지만, 유효한 저장소 쓰기 권한이 있는 토큰을 가진 사람만 게시할 수 있습니다. 유출이 의심되면 GitHub 설정에서 즉시 해당 토큰을 폐기하세요.

사진은 JPG·PNG·GIF·WebP로 최대 5장, 한 장당 5MB까지 첨부할 수 있습니다. 사진은 공개되며 원본의 위치 정보 등 메타데이터도 포함될 수 있으니 게시 전에 확인하세요. 게시 중 연결이 끊겨 결과가 불확실하다면 중복 게시하지 않도록 GitHub에서 안내된 파일 경로를 확인한 뒤 다시 시도하세요. 브랜치 보호 규칙이 직접 게시를 막는 경우에는 해당 규칙에 맞는 별도의 검토 절차가 필요합니다.

글쓰기 화면에서 작성한 Liquid 구문은 실행되지 않고 원문 그대로 표시됩니다. 작성 중에는 페이지를 나갈 때 경고하지만, 모바일 브라우저가 종료되는 모든 상황에서 경고할 수는 없고 임시 글이나 사진을 자동 저장하지 않습니다. 긴 글은 별도로 보관해 주세요.

## 댓글 설정하기

게시글의 댓글은 GitHub Issues를 사용하는 [Utterances](https://utteranc.es/)로 제공됩니다. 저장소가 공개 상태여야 하며 GitHub 저장소의 **Settings → General → Features → Issues**가 켜져 있어야 합니다. 저장소 소유자가 [Utterances GitHub 앱](https://github.com/apps/utterances)을 설치할 때 `allsii/allsii.github.io` 저장소를 선택하면 댓글 기능을 사용할 수 있습니다. 독자는 GitHub에 로그인하고 Utterances를 승인해야 댓글을 남길 수 있으며, 댓글과 연결된 이슈는 공개됩니다.

댓글 위젯이 보이지 않으면 앱 설치 범위, 공개 저장소 여부, Issues 활성화 여부와 브라우저의 외부 콘텐츠 차단 설정을 확인하세요. 다크 모드 선택은 댓글 화면에도 반영됩니다.

## 내 블로그로 바꾸기

- `_config.yml`에서 블로그 제목(`title`), 설명(`description`), GitHub 사용자명(`github_username`)을 수정하세요. GitHub 계정을 바꾼다면 `url`도 함께 수정하세요. 프로필 링크는 `github_username` 설정을 따릅니다.
- `about.md`의 소개 문구를 직접 작성하세요. HTML의 `<p>` 태그 안에 내용을 입력하면 됩니다.
- 홈의 인사말과 프로필 영역 문구는 `index.html`에서 바꾸세요. 바다와 소라고동 이미지는 `assets/images/` 폴더에 포함되어 있습니다.
- 색상과 간격은 `assets/css/style.css`에서 조정할 수 있습니다.
- `_posts/`의 제목에 `[예시]`가 붙은 세 글은 설명용 샘플입니다. 원하는 내용을 작성한 뒤 해당 파일들을 삭제하거나 내용을 교체하세요. 기존에 작성해 둔 다른 글은 삭제하지 마세요.

## 새 글 쓰기

`_posts/`에 `YYYY-MM-DD-영문-슬러그.md` 형식으로 파일을 만듭니다. 예를 들어 `_posts/2025-09-10-my-new-post.md`:

```markdown
---
layout: post
title: "새로운 글 제목"
date: 2025-09-10 09:00:00 +0900
categories: [일상]
tags: [기록, 하루]
description: 목록에 표시할 짧은 소개입니다.
featured: true
# image: /assets/images/my-photo.jpg
---
여기부터 마크다운으로 글을 씁니다.

## 소제목

평범한 문단과 **강조**, [링크](https://github.com/allsii)를 사용할 수 있습니다.
```

- `title`, `date`, `categories`, `tags`, `description`을 글에 맞게 수정하세요. 카테고리와 태그에는 여러 항목을 넣을 수 있습니다.
- `featured: true`는 홈의 추천 글로 표시할 글에만 사용하세요. 추천하지 않을 글에서는 이 줄을 생략하거나 `false`로 바꿉니다.
- 대표 이미지가 있다면 `assets/images/`에 파일을 추가하고 `image` 주석을 해제해 경로를 지정하세요. 이미지는 선택 사항입니다. 본문 이미지는 `![이미지 설명]({{ '/assets/images/my-photo.jpg' | relative_url }})`처럼 넣을 수 있습니다.
- 글은 날짜순으로 목록과 아카이브에 자동 반영됩니다. Jekyll은 기본적으로 미래 날짜의 글을 게시하지 않습니다.

## 로컬에서 미리 보기 (선택)

Ruby와 RubyGems가 설치된 환경이라면 GitHub Pages와 같은 의존성을 제공하는 `github-pages` gem을 설치한 뒤 저장소 최상위에서 실행합니다.

```sh
gem install github-pages
jekyll serve
```

출력된 로컬 주소(일반적으로 <http://127.0.0.1:4000>)를 브라우저에서 엽니다. `_config.yml`을 수정한 경우 서버를 재시작하세요. 설치 시 Ruby 버전이나 권한에 따라 환경 설정이 필요할 수 있습니다. 배포만 할 때는 로컬 설치가 필수는 아닙니다.


## 최근 기능 업데이트

글쓰기 화면에서 기존 카테고리를 선택하거나 새 카테고리를 만들 수 있고, 날짜와 시간을 입력할 수 있습니다. 게시글은 한국 시간 기준 년·월·일·요일·시각을 표시합니다. 토큰 입력란 아래의 `GitHub 개인 액세스 토큰 찾기` 링크에서 Fine-grained token을 만들 수 있습니다.

사이드바에는 방문자 통계 영역과 인기 글 3개, 최근 댓글 글 3개가 추가되었습니다. GitHub Pages는 정적 호스팅이라 어제·오늘·전체 방문자 수와 실제 조회수를 자동 저장하지 못하므로 현재 방문자 수는 `—`로 표시됩니다. 실제 집계를 사용하려면 GoatCounter나 Umami 같은 외부 분석 서비스를 연결해야 합니다. 인기 글은 front matter의 `views`, 최근 댓글은 `last_commented_at` 기준으로 정렬합니다.

댓글은 기존 Utterances와 함께 로그인 없는 댓글 입력 UI를 제공합니다. 다만 익명 댓글을 실제로 저장하려면 별도 댓글 서버·CAPTCHA·스팸 방지 정책이 필요합니다. 현재 특수기호 `◆` 확인란은 UI와 검증만 제공하고, 서버 연결 전에는 전송하지 않습니다.
