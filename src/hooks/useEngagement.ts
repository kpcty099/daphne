'use client'
import { useEffect, useRef, useCallback } from 'react'

// Keys used in localStorage/sessionStorage
const STORAGE_KEY = 'daphne_engagement'
const SESSION_KEY = 'daphne_popup_shown'

interface EngagementData {
  reelViews: number      // total distinct reel cards that have entered the viewport
  scrollDepth: number    // max % scrolled (0-100)
  timeOnPage: number     // seconds spent on page
  visitCount: number     // cross-session visit counter
}

function load(): EngagementData {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {} as EngagementData
  }
}

function save(data: Partial<EngagementData>) {
  const current = load()
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...data }))
}

function firePopup() {
  // Guard: only fire once per browser session
  if (sessionStorage.getItem(SESSION_KEY)) return
  sessionStorage.setItem(SESSION_KEY, 'true')
  window.dispatchEvent(new CustomEvent('open-lead-popup'))
}

/**
 * Tracks user engagement signals and fires the lead-capture popup
 * when the user shows repeated strong interest.
 *
 * Thresholds (any one of these triggers the popup):
 *  - Viewed ≥ 2 distinct reels in this session
 *  - Scrolled past 70% of the page
 *  - Spent ≥ 45 seconds on the page
 *  - 3rd+ visit to the site (cross-session)
 */
export function useEngagement() {
  const startTime = useRef(Date.now())
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reelViewsThisSession = useRef(0)

  // Check engagement threshold and fire popup if exceeded
  const checkThreshold = useCallback(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    const data = load()
    const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000)

    if (
      reelViewsThisSession.current >= 2 ||
      (data.scrollDepth ?? 0) >= 70 ||
      timeOnPage >= 45 ||
      (data.visitCount ?? 1) >= 3
    ) {
      firePopup()
    }
  }, [])

  // Track a reel being viewed (called by ReelShowcase)
  const trackReelView = useCallback(() => {
    reelViewsThisSession.current += 1
    save({ reelViews: (load().reelViews ?? 0) + 1 })
    checkThreshold()
  }, [checkThreshold])

  useEffect(() => {
    // Increment visit count once per session
    const data = load()
    const sessionActive = sessionStorage.getItem('daphne_session')
    if (!sessionActive) {
      sessionStorage.setItem('daphne_session', 'true')
      save({ visitCount: (data.visitCount ?? 0) + 1 })
    }

    // Track scroll depth
    const handleScroll = () => {
      const scrolled = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      const current = load()
      if (scrolled > (current.scrollDepth ?? 0)) {
        save({ scrollDepth: scrolled })
      }
      checkThreshold()
    }

    // Track time on page — check every 5 seconds
    timerRef.current = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime.current) / 1000)
      save({ timeOnPage: seconds })
      checkThreshold()
    }, 5000)

    // Fallback: also fire after 25s regardless (original behaviour)
    const fallbackTimer = setTimeout(() => {
      if (!sessionStorage.getItem(SESSION_KEY)) firePopup()
    }, 25000)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timerRef.current) clearInterval(timerRef.current)
      clearTimeout(fallbackTimer)
    }
  }, [checkThreshold])

  return { trackReelView }
}
