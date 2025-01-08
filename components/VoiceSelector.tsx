'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ElevenLabsClient } from "elevenlabs"

interface Voice {
  voice_id: string
  name: string
}

export function VoiceSelector({ onVoiceSelect, label }: { onVoiceSelect: (voiceId: string) => void, label: string }) {
  const [voices, setVoices] = useState<Voice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const client = new ElevenLabsClient({
          apiKey: 'sk_060939208b43c616785aeec6d81b757eafb2590c873cf078'
        });

        const voicesList = await client.voices.getAll()
        setVoices(voicesList.voices.filter((v): v is Voice => 
          typeof v.name === 'string' && typeof v.voice_id === 'string'
        ))
      } catch (error) {
        console.error('Error fetching voices:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVoices()
  }, [])

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <Select onValueChange={onVoiceSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a voice" />
        </SelectTrigger>
        <SelectContent>
          {voices.map((voice) => (
            <SelectItem key={voice.voice_id} value={voice.voice_id}>
              {voice.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 