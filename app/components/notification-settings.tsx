import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"
import { Separator } from "~/components/ui/separator"

interface NotificationSettingsProps {
  notifications: {
    expiry: boolean
    newItems: boolean
    weekly: boolean
    email: boolean
    push: boolean
  }
  onNotificationChange: (key: string, value: boolean) => void
}

export function NotificationSettings({ notifications, onNotificationChange }: NotificationSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="font-medium text-sm">유통기한 알림</Label>
          <p className="text-xs text-muted-foreground">만료 3일 전 알림</p>
        </div>
        <Switch checked={notifications.expiry} onCheckedChange={(checked) => onNotificationChange("expiry", checked)} />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label className="font-medium text-sm">새 물건 알림</Label>
          <p className="text-xs text-muted-foreground">물건 추가 시 알림</p>
        </div>
        <Switch
          checked={notifications.newItems}
          onCheckedChange={(checked) => onNotificationChange("newItems", checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label className="font-medium text-sm">주간 요약</Label>
          <p className="text-xs text-muted-foreground">매주 월요일 요약 알림</p>
        </div>
        <Switch checked={notifications.weekly} onCheckedChange={(checked) => onNotificationChange("weekly", checked)} />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div>
          <Label className="font-medium text-sm">이메일 알림</Label>
          <p className="text-xs text-muted-foreground">이메일로 알림 받기</p>
        </div>
        <Switch checked={notifications.email} onCheckedChange={(checked) => onNotificationChange("email", checked)} />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label className="font-medium text-sm">푸시 알림</Label>
          <p className="text-xs text-muted-foreground">앱 푸시 알림 받기</p>
        </div>
        <Switch checked={notifications.push} onCheckedChange={(checked) => onNotificationChange("push", checked)} />
      </div>
    </div>
  )
}
