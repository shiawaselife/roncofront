// src/services/newsService.js
import axios from 'axios'

const NEWS_API_KEY = "9af9e3432d304de6b3274ac8e8a9a160"
const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2',
  params: {
    apiKey: NEWS_API_KEY,
  }
})

// 한국 IT 뉴스 소스들
const KOREAN_NEWS_SOURCES = [
  'zdnet-korea',
  'the-next-web',
  'techcrunch',
  'wired-kr',
].join(',')

export class NewsService {
  // NewsAPI에서 한국 IT 뉴스 가져오기
  async getKoreanTechNews() {
    try {
      // 한국 IT 뉴스 가져오기
      const response = await newsApi.get('/everything', {
        params: {
          q: '(IT OR 테크 OR 기술 OR AI OR 인공지능 OR 개발)',
          language: 'ko',
          sortBy: 'publishedAt',
          pageSize: 30,
          domains: 'zdnet.co.kr,etnews.com,bloter.net,aitimes.com,venture.co.kr'
        }
      })
      
      return response.data.articles.map(article => ({
        id: article.url,
        title: article.title,
        description: article.description || '내용이 없습니다.',
        category: {
          name: this.getCategoryFromTitle(article.title),
          type: 'tech'
        },
        timestamp: article.publishedAt,
        externalUrl: article.url,
        source: article.source.name,
        imageUrl: article.urlToImage
      }))
    } catch (error) {
      console.error('Error fetching Korean tech news:', error)
      return []
    }
  }

  // 네이버 IT 뉴스 검색 (네이버 검색 API 사용)
  async getNaverNews() {
    try {
      // 현재 날짜 기준으로 일주일 전 날짜 계산
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const startDate = lastWeek.toISOString().split('T')[0];
      const endDate = today.toISOString().split('T')[0];
  
      const response = await axios.get('/v1/search/news.json', {
        headers: {
          'X-Naver-Client-Id': "D09FBOxISDaoDhEVqfPj",
          'X-Naver-Client-Secret': "C3FN8ediq6"
        },  
        params: {
          query: 'IT/과학',
          sort: 'date',  // 날짜순 정렬
          display: 100,  // 결과 수 증가
          start: 1,      // 첫 페이지부터
          pd: 1,         // 1일 이내 뉴스만
          ds: startDate, // 검색 시작일
          de: endDate,   // 검색 종료일
        }
      });
  
      return response.data.items.map(item => ({
        id: item.link,
        title: item.title.replace(/(<([^>]+)>)/gi, ""),
        description: item.description.replace(/(<([^>]+)>)/gi, ""),
        category: {
          name: this.getCategoryFromTitle(item.title),
          type: 'tech'
        },
        timestamp: new Date(item.pubDate),
        externalUrl: item.link,
        source: item.source,
      }));
    } catch (error) {
      console.error('Error fetching Naver news:', error);
      return [];
    }
  }

  // 제목에서 카테고리 추출
  getCategoryFromTitle(title) {
    const categories = {
      'AI': ['AI', '인공지능', '머신러닝', '딥러닝'],
      '블록체인': ['블록체인', '암호화폐', '비트코인', '이더리움'],
      '모바일': ['모바일', '스마트폰', '애플', '안드로이드'],
      '개발': ['개발', '프로그래밍', '코딩', '소프트웨어'],
      'IT비즈니스': ['스타트업', '투자', '실적', '매출'],
      '보안': ['보안', '해킹', '사이버', '악성코드']
    }

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => title.includes(keyword))) {
        return category
      }
    }

    return 'IT/기술'
  }

  async getAllNews() {
    try {
      // 여러 소스에서 뉴스 가져오기
      const [koreanNews, naverNews] = await Promise.all([
        [],
        this.getNaverNews()
      ])

      // 모든 뉴스 합치기
      const allNews = [...koreanNews, ...naverNews]

      // 중복 제거 (URL 기준)
      const uniqueNews = Array.from(
        new Map(allNews.map(item => [item.id, item])).values()
      )

      // 시간순 정렬
      return uniqueNews.sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      )
    } catch (error) {
      console.error('Error fetching all news:', error)
      throw error
    }
  }

  async searchNews(query) {
    try {
      const response = await newsApi.get('/everything', {
        params: {
          q: query,
          language: 'ko',
          sortBy: 'publishedAt',
          pageSize: 20,
          domains: 'zdnet.co.kr,etnews.com,bloter.net,aitimes.com,venture.co.kr'
        }
      })

      return response.data.articles.map(article => ({
        id: article.url,
        title: article.title,
        description: article.description || '내용이 없습니다.',
        category: {
          name: this.getCategoryFromTitle(article.title),
          type: 'tech'
        },
        timestamp: article.publishedAt,
        externalUrl: article.url,
        source: article.source.name,
        imageUrl: article.urlToImage
      }))
    } catch (error) {
      console.error('Error searching news:', error)
      throw error
    }
  }
}

export const newsService = new NewsService()