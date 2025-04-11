import { useState, useEffect } from "react"
import styled from "styled-components"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  isAfter,
} from "date-fns"
import type { DateRange } from "./date-range-picker"

// Styled Components
const CalendarWrapper = styled.div`
  width: 256px;
  padding: 8px;
`

const WeekdaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
`

const WeekdayLabel = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
`

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`

const DayButton = styled.button<{
  isCurrentMonth: boolean
  isSelected: boolean
  isToday: boolean
  isDisabled: boolean
  customStyles: Record<string, string>
}>`
  height: 32px;
  width: 32px;
  padding: 0;
  text-align: center;
  font-size: 14px;
  border-radius: 9999px;
  border: ${(props) => (props.isToday && !props.isSelected ? "1px solid #4f46e5" : "none")};
  background-color: ${(props) => props.customStyles.backgroundColor || "transparent"};
  color: ${(props) => props.customStyles.color || (props.isCurrentMonth ? "inherit" : "#9ca3af")};
  opacity: ${(props) => (!props.isCurrentMonth || props.isDisabled ? 0.5 : 1)};
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${(props) => (!props.isDisabled && !props.isSelected ? "#f3f4f6" : props.customStyles.backgroundColor)};
  }
`

interface CalendarProps {
  month: Date
  value: DateRange
  onSelect: (date: Date) => void
  onMouseEnterDate: (date: Date) => void
  onMouseLeaveCalendar: () => void
  isInRange: (date: Date) => boolean
  getDateStyles: (date: Date) => Record<string, string>
  disablePast?: boolean
  disableFuture?: boolean
  disableDates?: (date: Date) => boolean
  minDate?: Date
  maxDate?: Date
  locale?: string
}

export  function Calendar({
  month,
  value,
  onSelect,
  onMouseEnterDate,
  onMouseLeaveCalendar,
  isInRange,
  getDateStyles,
  disablePast = false,
  disableFuture = false,
  disableDates,
  minDate,
  maxDate,
  locale = "en-US",
}: CalendarProps) {
  const [calendarDays, setCalendarDays] = useState<Date[][]>([])

  useEffect(() => {
    const days: Date[][] = []
    const start = startOfWeek(startOfMonth(month))
    const end = endOfWeek(endOfMonth(month))

    let currentDate = start
    let currentWeek: Date[] = []

    while (currentDate <= end) {
      if (currentWeek.length === 7) {
        days.push(currentWeek)
        currentWeek = []
      }

      currentWeek.push(currentDate)
      currentDate = addDays(currentDate, 1)
    }

    if (currentWeek.length > 0) {
      days.push(currentWeek)
    }

    setCalendarDays(days)
  }, [month])

  const isDateDisabled = (date: Date) => {
    if (disablePast && isBefore(date, new Date()) && !isSameDay(date, new Date())) {
      return true
    }

    if (disableFuture && isAfter(date, new Date()) && !isSameDay(date, new Date())) {
      return true
    }

    if (minDate && isBefore(date, minDate) && !isSameDay(date, minDate)) {
      return true
    }

    if (maxDate && isAfter(date, maxDate) && !isSameDay(date, maxDate)) {
      return true
    }

    if (disableDates && disableDates(date)) {
      return true
    }

    return false
  }

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"]

  return (
    <CalendarWrapper onMouseLeave={onMouseLeaveCalendar}>
      <WeekdaysHeader>
        {weekDays.map((day, index) => (
          <WeekdayLabel key={index}>{day}</WeekdayLabel>
        ))}
      </WeekdaysHeader>
      <DaysGrid>
        {calendarDays.flat().map((date, index) => {
          const isCurrentMonth = isSameMonth(date, month)
          const isSelected =
            (value.startDate && isSameDay(date, value.startDate)) || (value.endDate && isSameDay(date, value.endDate))
          const isDisabled = isDateDisabled(date)
          const customStyles = getDateStyles(date)

          return (
            <DayButton
              key={index}
              type="button"
              onClick={() => !isDisabled && onSelect(date)}
              onMouseEnter={() => !isDisabled && onMouseEnterDate(date)}
              disabled={isDisabled}
              isCurrentMonth={isCurrentMonth}
              isSelected={isSelected}
              isToday={isToday(date)}
              isDisabled={isDisabled}
              customStyles={customStyles}
            >
              {format(date, "d")}
            </DayButton>
          )
        })}
      </DaysGrid>
    </CalendarWrapper>
  )
}
