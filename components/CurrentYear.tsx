"use client"

import { useEffect, useState } from "react"

export default function CurrentYear() {
  const [year, setYear] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    const updateYear = () => setYear(new Date().getFullYear())
    updateYear()

    // Optional: Update the year at midnight (in case the user has the page open during New Year)
    const now = new Date()
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime()
    const timeout = setTimeout(updateYear, msUntilMidnight)

    return () => clearTimeout(timeout)
  }, [])

  return <>{year}</>
}
