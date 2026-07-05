import { getSettings } from '../settings'

export interface ChatArgs {
  system: string
  user: string
  temperature?: number
  expectJson?: boolean
}

/**
 * Call the configured OpenAI-compatible endpoint (cloud or local).
 * The app never sends data unless the user explicitly triggers AI generation (04_TECH_ARCHITECTURE.md privacy).
 */
export async function chat(args: ChatArgs): Promise<string> {
  const cfg = getSettings().aiConfig
  if (cfg.mode === 'manual') {
    throw new Error(
      'No AI provider configured. Set one up in Settings → AI provider, or write the lesson JSON manually in AI Studio.'
    )
  }
  if (!cfg.baseUrl) throw new Error('AI provider base URL is empty. Configure it in Settings.')
  if (!cfg.model) throw new Error('AI model name is empty. Configure it in Settings.')

  const body: Record<string, unknown> = {
    model: cfg.model,
    temperature: args.temperature ?? 0.4,
    messages: [
      { role: 'system', content: args.system },
      { role: 'user', content: args.user }
    ]
  }
  if (args.expectJson) body.response_format = { type: 'json_object' }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (cfg.apiKey) headers.Authorization = `Bearer ${cfg.apiKey}`

  const url = cfg.baseUrl.replace(/\/$/, '') + '/chat/completions'
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`AI provider error ${res.status}: ${text.slice(0, 300)}`)
  }
  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> }
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('AI provider returned an empty response.')
  return content
}
