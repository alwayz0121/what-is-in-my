export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      item_history: {
        Row: {
          action: string
          action_date: string
          created_at: string
          details: string | null
          id: string
          item_id: string
        }
        Insert: {
          action: string
          action_date: string
          created_at?: string
          details?: string | null
          id?: string
          item_id: string
        }
        Update: {
          action?: string
          action_date?: string
          created_at?: string
          details?: string | null
          id?: string
          item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_history_item_id_items_id_fk"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          added_date: string | null
          category: string | null
          created_at: string
          description: string | null
          expiry_date: string | null
          id: string
          is_consumed: boolean
          is_expired: boolean
          name: string
          quantity: number
          section_id: string | null
          section_name: string | null
          storage_id: string
          unit: string | null
          updated_at: string
        }
        Insert: {
          added_date?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          expiry_date?: string | null
          id?: string
          is_consumed?: boolean
          is_expired?: boolean
          name: string
          quantity?: number
          section_id?: string | null
          section_name?: string | null
          storage_id: string
          unit?: string | null
          updated_at?: string
        }
        Update: {
          added_date?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          expiry_date?: string | null
          id?: string
          is_consumed?: boolean
          is_expired?: boolean
          name?: string
          quantity?: number
          section_id?: string | null
          section_name?: string | null
          storage_id?: string
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "items_section_id_sections_id_fk"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_storage_id_storages_id_fk"
            columns: ["storage_id"]
            isOneToOne: false
            referencedRelation: "storages"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          item_id: string
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          item_id: string
          message: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          item_id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_item_id_items_id_fk"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          nickname: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          nickname?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          nickname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_users_id_fk"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          created_at: string
          id: string
          name: string
          storage_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          storage_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          storage_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sections_storage_id_storages_id_fk"
            columns: ["storage_id"]
            isOneToOne: false
            referencedRelation: "storages"
            referencedColumns: ["id"]
          },
        ]
      }
      storages: {
        Row: {
          created_at: string
          expiring_count: number
          id: string
          image: string | null
          item_count: number
          last_updated: string | null
          name: string
          section_count: number
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expiring_count?: number
          id?: string
          image?: string | null
          item_count?: number
          last_updated?: string | null
          name: string
          section_count?: number
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expiring_count?: number
          id?: string
          image?: string | null
          item_count?: number
          last_updated?: string | null
          name?: string
          section_count?: number
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "storages_user_id_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          id: string
          provider: string
        }
        Insert: {
          created_at?: string
          id?: string
          provider?: string
        }
        Update: {
          created_at?: string
          id?: string
          provider?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
