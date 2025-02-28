// stores/WebSocketStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'


export const useWebSocketStore = defineStore('websocket', () => {
  const stompClient = ref(null)
  const isConnected = ref(false)
  const subscribers = ref(new Map())

  // WebSocket 연결 설정
  function connect() {
    if (stompClient.value) {
      return // 이미 연결되어 있으면 리턴
    }

    // withCredentials: false 옵션 추가
    const socket = new SockJS('/ws', null, {
      transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
      withCredentials: false
    })

    stompClient.value = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('WebSocket Connected!')
        isConnected.value = true
        // 저장된 모든 구독 복원
        
        Array.from(subscribers.value.entries()).forEach(([topic, callbackArray]) => {
          callbackArray.forEach(callback => {
            if (typeof callback === 'function') {
              subscribe(topic, callback)
            }
          })
        })
        
      },
      onDisconnect: () => {
        console.log('WebSocket Disconnected')
        isConnected.value = false
        setTimeout(connect, 5000) // 재연결 시도
      },
      onStompError: (error) => {
        console.error('Stomp error:', error)
        isConnected.value = false
      }
    })

    stompClient.value.activate()
  }

  // 토픽 구독
  function subscribe(topic, callback) {
    // 해당 토픽의 콜백 배열 가져오기 (없으면 새로 생성)

    if (typeof callback !== 'function') {
      console.error('유효하지 않은 콜백 함수:', callback)
      return
    }

    const topicSubscribers = subscribers.value.get(topic) || []
    
    // 중복 콜백 방지
    if (!topicSubscribers.includes(callback)) {
      topicSubscribers.push(callback)
      subscribers.value.set(topic, topicSubscribers)
    }

    if (isConnected.value && stompClient.value) {
      return stompClient.value.subscribe(topic, (message) => {
        try {
          const data = JSON.parse(message.body)
          callback(data)
        } catch (error) {
          console.error('메시지 파싱 오류:', error)
        }
      })
    }

    console.log(`현재 ${topic} 토픽의 구독자들:`, 
      topicSubscribers.map(cb => cb ? cb.name : '익명 함수')
    )
  }

  function unsubscribe(topic, callback) {
    const topicSubscribers = subscribers.value.get(topic) || []
    
    // 특정 콜백 제거
    if (callback) {
      const filteredSubscribers = topicSubscribers.filter(cb => cb !== callback)
      subscribers.value.set(topic, filteredSubscribers)
    } 
    // 콜백이 없으면 해당 토픽의 모든 구독 제거
    else {
      subscribers.value.delete(topic)
    }
  }

  // 연결 해제
  function disconnect() {
    if (stompClient.value) {
      stompClient.value.deactivate()
      stompClient.value = null
      isConnected.value = false
      subscribers.value.clear()
    }
  }

  return {
    isConnected,
    connect,
    subscribe,
    unsubscribe,
    disconnect
  }
})