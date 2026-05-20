'use client'
import { useEffect, useState } from 'react'
import { usePostHog } from 'posthog-js/react'

export function useTracking() {
  const posthog = usePostHog()
  const [visitCount, setVisitCount] = useState(0)
  const [isHotLead, setIsHotLead] = useState(false)

  useEffect(() => {
    // Basic local storage visit tracking
    const visits = localStorage.getItem('lumina_visits')
    const currentVisits = visits ? parseInt(visits, 10) + 1 : 1
    
    // Only increment once per session by using sessionStorage as well
    const sessionActive = sessionStorage.getItem('lumina_session')
    
    if (!sessionActive) {
      localStorage.setItem('lumina_visits', currentVisits.toString())
      sessionStorage.setItem('lumina_session', 'active')
      queueMicrotask(() => setVisitCount(currentVisits))
      
      posthog?.capture('page_visit', {
        visit_count: currentVisits
      })
    } else {
      queueMicrotask(() => setVisitCount(visits ? parseInt(visits, 10) : 1))
    }

    if (currentVisits >= 3) {
      queueMicrotask(() => setIsHotLead(true))
      posthog?.capture('hot_lead_detected', {
        visit_count: currentVisits
      })
    }
  }, [posthog])

  return { visitCount, isHotLead }
}
