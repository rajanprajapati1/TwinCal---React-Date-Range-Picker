import styled from "styled-components"
import { startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"
import type { DateRange } from "./date-range-picker"

// Styled Components
const SidebarContainer = styled.div`
  width: 160px;
  border-right: 1px solid #e5e7eb;
  padding: 12px;
`

const SidebarTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`

const PresetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const PresetButton = styled.button<{ isActive?: boolean; primaryColor?: string }>`
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: none;
  background-color: ${(props) => (props.isActive ? `${props.primaryColor}20` || "#4f46e520" : "transparent")};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${(props) => (props.isActive ? `${props.primaryColor}30` || "#4f46e530" : "#f3f4f6")};
  }
`

interface DatePickerSidebarProps {
  onSelect: (range: DateRange) => void
  primaryColor?: string
}

export function DatePickerSidebar({ onSelect, primaryColor = "#4f46e5" }: DatePickerSidebarProps) {
  const today = new Date()

  const presets = [
    {
      label: "Today",
      getValue: () => ({
        startDate: startOfDay(today),
        endDate: endOfDay(today),
      }),
    },
    {
      label: "Yesterday",
      getValue: () => ({
        startDate: startOfDay(subDays(today, 1)),
        endDate: endOfDay(subDays(today, 1)),
      }),
    },
    {
      label: "Last Week",
      getValue: () => ({
        startDate: startOfWeek(subDays(today, 7)),
        endDate: endOfWeek(subDays(today, 7)),
      }),
    },
    {
      label: "This Month",
      getValue: () => ({
        startDate: startOfMonth(today),
        endDate: endOfMonth(today),
      }),
    },
    {
      label: "All Time",
      getValue: () => ({
        startDate: new Date(2000, 0, 1),
        endDate: endOfDay(today),
      }),
    },
  ]

  return (
    <SidebarContainer>
      <SidebarTitle>Select Date</SidebarTitle>
      <PresetsContainer>
        {presets.map((preset, index) => (
          <PresetButton
            key={index}
            onClick={() => onSelect(preset.getValue())}
            isActive={preset.label === "Today"}
            primaryColor={primaryColor}
          >
            {preset.label}
          </PresetButton>
        ))}
      </PresetsContainer>
    </SidebarContainer>
  )
}
