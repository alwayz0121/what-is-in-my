import { Card, CardContent } from "~/components/ui/card"
import { Package } from "lucide-react"

interface Section {
  id: string
  name: string
  items: any[]
}

interface SectionSelectorProps {
  sections: Section[]
  selectedSection: string | null
  onSectionSelect: (sectionId: string | null) => void
}

export function SectionSelector({ sections, selectedSection, onSectionSelect }: SectionSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {sections.map((section) => (
        <Card
          key={section.id}
          className={`cursor-pointer transition-all ${
            selectedSection === section.id ? "ring-2 ring-primary" : "hover:shadow-md"
          }`}
          onClick={() => onSectionSelect(selectedSection === section.id ? null : section.id)}
        >
          <CardContent className="p-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-sm mb-1">{section.name}</h4>
              <p className="text-xs text-muted-foreground">{section.items.length}개 물건</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
