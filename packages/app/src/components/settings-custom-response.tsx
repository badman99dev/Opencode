import { Component, createMemo } from "solid-js"
import { Button } from "@opencode-ai/ui/button"
import { Select } from "@opencode-ai/ui/select"
import { TextField } from "@opencode-ai/ui/text-field"
import { showToast } from "@opencode-ai/ui/toast"
import { useLanguage } from "@/context/language"
import { useSettings } from "@/context/settings"
import { SettingsList } from "./settings-list"

const SettingsRow: Component<{
  title: string
  description: string
  children: any
}> = (props) => {
  return (
    <div class="flex flex-wrap items-center gap-4 py-3 border-b border-border-weak-base last:border-none sm:flex-nowrap">
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <span class="text-14-medium text-text-strong">{props.title}</span>
        <span class="text-12-regular text-text-weak">{props.description}</span>
      </div>
      <div class="flex w-full justify-end sm:w-auto sm:shrink-0">{props.children}</div>
    </div>
  )
}

export const SettingsCustomResponse: Component = () => {
  const language = useLanguage()
  const settings = useSettings()

  const toneOptions = createMemo(() => [
    { value: "neutral", label: language.t("settings.customResponse.tone.option.neutral") },
    { value: "friendly", label: language.t("settings.customResponse.tone.option.friendly") },
    { value: "professional", label: language.t("settings.customResponse.tone.option.professional") },
    { value: "casual", label: language.t("settings.customResponse.tone.option.casual") },
    { value: "encouraging", label: language.t("settings.customResponse.tone.option.encouraging") },
    { value: "concise", label: language.t("settings.customResponse.tone.option.concise") },
  ])

  const currentTone = createMemo(() => toneOptions().find((o) => o.value === settings.customResponse.tone()))

  return (
    <div class="flex flex-col h-full overflow-y-auto no-scrollbar px-4 pb-10 sm:px-10 sm:pb-10">
      <div class="sticky top-0 z-10 bg-[linear-gradient(to_bottom,var(--surface-stronger-non-alpha)_calc(100%_-_24px),transparent)]">
        <div class="flex flex-col gap-1 pt-6 pb-8">
          <h2 class="text-16-medium text-text-strong">{language.t("settings.customResponse.title")}</h2>
        </div>
      </div>

      <div class="flex flex-col gap-8 w-full">
        <div class="flex flex-col gap-1">
          <SettingsList>
            <SettingsRow
              title={language.t("settings.customResponse.name.title")}
              description={language.t("settings.customResponse.name.description")}
            >
              <TextField
                data-action="settings-custom-response-name"
                value={settings.customResponse.name()}
                onChange={(value) => settings.customResponse.setName(value)}
                variant="secondary"
                size="small"
              />
            </SettingsRow>

            <SettingsRow
              title={language.t("settings.customResponse.tone.title")}
              description={language.t("settings.customResponse.tone.description")}
            >
              <Select
                data-action="settings-custom-response-tone"
                options={toneOptions()}
                current={currentTone()}
                value={(o) => o.value}
                label={(o) => o.label}
                onSelect={(option) => option && settings.customResponse.setTone(option.value)}
                variant="secondary"
                size="small"
                triggerVariant="settings"
              />
            </SettingsRow>

            <SettingsRow
              title={language.t("settings.customResponse.customInstructions.title")}
              description={language.t("settings.customResponse.customInstructions.description")}
            >
              <div class="w-full sm:w-80">
                <TextField
                  data-action="settings-custom-response-instructions"
                  value={settings.customResponse.customInstructions()}
                  onChange={(value) => settings.customResponse.setCustomInstructions(value)}
                  variant="secondary"
                  multiline
                  class="min-h-[80px]"
                />
              </div>
            </SettingsRow>

            <div class="flex justify-end py-2">
              <Button
                variant="primary"
                size="small"
                onClick={() => {
                  showToast({
                    variant: "success",
                    icon: "circle-check",
                    title: language.t("settings.customResponse.saved"),
                  })
                }}
              >
                {language.t("settings.customResponse.save")}
              </Button>
            </div>
          </SettingsList>
        </div>
      </div>
    </div>
  )
}