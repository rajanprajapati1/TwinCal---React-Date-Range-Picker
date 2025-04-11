import { useState, useEffect, useRef } from "react"
import { format, isAfter, isBefore, isSameDay, addMonths } from "date-fns"
import styled from "styled-components"
import { Calendar } from "./calendar"
import { DatePickerSidebar } from "./date-picker-sidebar"

// Styled Components
const Container = styled.div<{ fullWidth?: boolean }>`
  position: relative;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
`

const InputButton = styled.button<{ variant?: string; disabled?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  text-align: left;
  background-color: ${(props) => (props.variant === "filled" ? "#f3f4f6" : "white")};
  border: ${(props) => (props.variant === "outlined" ? "1px solid #d1d5db" : "none")};
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  
  &:hover {
    background-color: ${(props) => (props.variant === "filled" ? "#e5e7eb" : "#f9fafb")};
  }
`

const CalendarIcon = styled.svg`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`

const PopoverContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 50;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
`

const PopoverContent = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const CalendarContainer = styled.div`
  padding: 12px;
`

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

const MonthTitle = styled.div`
  font-weight: 500;
`

const NavButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: transparent;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  
  &:hover {
    background-color: #f3f4f6;
  }
`

const CalendarGrid = styled.div`
  display: flex;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`

const Button = styled.button<{ primary?: boolean; primaryColor?: string }>`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? props.primaryColor || "#4f46e5" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "inherit")};
  
  &:hover {
    background-color: ${(props) => (props.primary ? (props.primaryColor ? `${props.primaryColor}dd` : "#4338ca") : "#f3f4f6")};
  }
`

export interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

export interface DateRangePickerProps {
  value: DateRange
  onChange: (value: DateRange) => void
  disablePast?: boolean
  disableFuture?: boolean
  disableDates?: (date: Date) => boolean
  minDate?: Date
  maxDate?: Date
  locale?: string
  format?: string
  clearable?: boolean
  inputPlaceholder?: string
  fullWidth?: boolean
  variant?: "outlined" | "filled" | "standard"
  disabled?: boolean
  readOnly?: boolean
  openOnFocus?: boolean
  open?: boolean
  onOpen?: () => void
  onClose?: () => void
  showSidebar?: boolean
  primaryColor?: string
}

export function DateRangePicker({
  value,
  onChange,
  disablePast = false,
  disableFuture = false,
  disableDates,
  minDate,
  maxDate,
  locale = "en-US",
  format: dateFormat = "MMM dd, yyyy",
  clearable = true,
  inputPlaceholder = "Select date range",
  fullWidth = false,
  variant = "outlined",
  disabled = false,
  readOnly = false,
  openOnFocus = true,
  open: controlledOpen,
  onOpen,
  onClose,
  showSidebar = true,
  primaryColor = "#4f46e5",
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<DateRange>(value)
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [leftMonth, setLeftMonth] = useState(new Date())
  const [rightMonth, setRightMonth] = useState(addMonths(new Date(), 1))
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLButtonElement>(null)

  // Sync with controlled open state if provided
  useEffect(() => {
    if (controlledOpen !== undefined) {
      setOpen(controlledOpen)
    }
  }, [controlledOpen])

  // Sync with controlled value
  useEffect(() => {
    setInternalValue(value)
  }, [value])

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
        onClose?.()
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onClose])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }

  const handleDateSelect = (date: Date) => {
    if (disabled || readOnly) return

    if (!internalValue.startDate || (internalValue.startDate && internalValue.endDate)) {
      // Start a new selection
      setInternalValue({
        startDate: date,
        endDate: null,
      })
    } else {
      // Complete the selection
      if (isBefore(date, internalValue.startDate)) {
        setInternalValue({
          startDate: date,
          endDate: internalValue.startDate,
        })
      } else {
        setInternalValue({
          startDate: internalValue.startDate,
          endDate: date,
        })
      }
    }
  }

  const handleApply = () => {
    onChange(internalValue)
    handleOpenChange(false)
  }

  const handleCancel = () => {
    setInternalValue(value)
    handleOpenChange(false)
  }

  const handleClear = () => {
    const clearedValue = { startDate: null, endDate: null }
    setInternalValue(clearedValue)
    onChange(clearedValue)
  }

  const handleMouseEnterDate = (date: Date) => {
    if (internalValue.startDate && !internalValue.endDate) {
      setHoveredDate(date)
    }
  }

  const handleMouseLeaveCalendar = () => {
    setHoveredDate(null)
  }

  const navigatePreviousMonth = () => {
    setLeftMonth((prevMonth) => addMonths(prevMonth, -1))
    setRightMonth((prevMonth) => addMonths(prevMonth, -1))
  }

  const navigateNextMonth = () => {
    setLeftMonth((prevMonth) => addMonths(prevMonth, 1))
    setRightMonth((prevMonth) => addMonths(prevMonth, 1))
  }

  const handleQuickSelect = (range: DateRange) => {
    setInternalValue(range)
  }

  const getDisplayValue = () => {
    if (value.startDate && value.endDate) {
      return `${format(value.startDate, dateFormat)} - ${format(value.endDate, dateFormat)}`
    } else if (value.startDate) {
      return `${format(value.startDate, dateFormat)} - ?`
    }
    return inputPlaceholder
  }

  const isInRange = (date: Date) => {
    if (internalValue.startDate && internalValue.endDate) {
      return (
        (isAfter(date, internalValue.startDate) || isSameDay(date, internalValue.startDate)) &&
        (isBefore(date, internalValue.endDate) || isSameDay(date, internalValue.endDate))
      )
    }

    if (internalValue.startDate && hoveredDate) {
      if (isBefore(hoveredDate, internalValue.startDate)) {
        return (
          (isAfter(date, hoveredDate) || isSameDay(date, hoveredDate)) &&
          (isBefore(date, internalValue.startDate) || isSameDay(date, internalValue.startDate))
        )
      } else {
        return (
          (isAfter(date, internalValue.startDate) || isSameDay(date, internalValue.startDate)) &&
          (isBefore(date, hoveredDate) || isSameDay(date, hoveredDate))
        )
      }
    }

    return false
  }

  const isStartDate = (date: Date) => {
    return internalValue.startDate && isSameDay(date, internalValue.startDate)
  }

  const isEndDate = (date: Date) => {
    return internalValue.endDate && isSameDay(date, internalValue.endDate)
  }

  const getDateStyles = (date: Date) => {
    const styles = {
      backgroundColor: "transparent",
      color: "inherit",
      borderRadius: "9999px",
    }

    if (isStartDate(date) || isEndDate(date)) {
      styles.backgroundColor = primaryColor
      styles.color = "white"
    } else if (isInRange(date)) {
      styles.backgroundColor = `${primaryColor}20` // 20% opacity
    }

    return styles
  }

  return (
    <Container ref={containerRef} fullWidth={fullWidth}>
      <InputButton
        ref={inputRef}
        variant={variant}
        disabled={disabled}
        onClick={() => !disabled && handleOpenChange(!open)}
      >
        <CalendarIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </CalendarIcon>
        {getDisplayValue()}
      </InputButton>

      <PopoverContainer isOpen={open}>
        <PopoverContent>
          {showSidebar && <DatePickerSidebar onSelect={handleQuickSelect} primaryColor={primaryColor} />}
          <CalendarContainer>
            <CalendarHeader>
              <NavButton
                onClick={navigatePreviousMonth}
                disabled={minDate && isBefore(addMonths(leftMonth, -1), minDate)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </NavButton>
              <MonthTitle>{format(leftMonth, "MMMM yyyy")}</MonthTitle>
              <NavButton onClick={navigateNextMonth} disabled={maxDate && isAfter(addMonths(rightMonth, 1), maxDate)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </NavButton>
            </CalendarHeader>
            <CalendarGrid>
              <Calendar
                month={leftMonth}
                value={internalValue}
                onSelect={handleDateSelect}
                onMouseEnterDate={handleMouseEnterDate}
                onMouseLeaveCalendar={handleMouseLeaveCalendar}
                isInRange={isInRange}
                getDateStyles={getDateStyles}
                disablePast={disablePast}
                disableFuture={disableFuture}
                disableDates={disableDates}
                minDate={minDate}
                maxDate={maxDate}
                locale={locale}
              />
              <Calendar
                month={rightMonth}
                value={internalValue}
                onSelect={handleDateSelect}
                onMouseEnterDate={handleMouseEnterDate}
                onMouseLeaveCalendar={handleMouseLeaveCalendar}
                isInRange={isInRange}
                getDateStyles={getDateStyles}
                disablePast={disablePast}
                disableFuture={disableFuture}
                disableDates={disableDates}
                minDate={minDate}
                maxDate={maxDate}
                locale={locale}
              />
            </CalendarGrid>
            <ButtonContainer>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button primary primaryColor={primaryColor} onClick={handleApply}>
                Apply
              </Button>
            </ButtonContainer>
          </CalendarContainer>
        </PopoverContent>
      </PopoverContainer>
    </Container>
  )
}
