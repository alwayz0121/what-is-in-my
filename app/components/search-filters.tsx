import { Button } from "~/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { X } from "lucide-react"

interface SearchFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  onClear: () => void
  categories: string[]
}

export function SearchFilters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onClear,
  categories,
}: SearchFiltersProps) {
  const hasActiveFilters = selectedCategory !== "전체" || sortBy !== "name"

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-auto h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-auto h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">이름순</SelectItem>
          <SelectItem value="expiry">유통기한순</SelectItem>
          <SelectItem value="added">최근 추가순</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button size="sm" variant="ghost" onClick={onClear} className="gap-1 h-8">
          <X className="h-3 w-3" />
          초기화
        </Button>
      )}
    </div>
  )
}
