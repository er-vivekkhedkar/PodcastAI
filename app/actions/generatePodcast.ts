'use server'

import OpenAI from 'openai'
import { ElevenLabsClient } from "elevenlabs"
import { Readable } from 'stream'

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!
})

// Convert the Readable stream to Buffer
const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
};

interface PodcastResponse {
  success: boolean;
  tracks: {
    person1: string;
    person2: string;
    combined: string;
  };
  error?: string;
}

export async function generatePodcast(content: string, voice1: string, voice2: string) {
  try {
    // Split the content into two parts for different voices
    const lines = content.split('\n');
    const voice1Lines = lines
      .filter(line => line.toLowerCase().includes('person 1:'))
      .map(line => line.replace(/person 1:/i, '').trim())
      .join('\n');
    
    const voice2Lines = lines
      .filter(line => line.toLowerCase().includes('person 2:'))
      .map(line => line.replace(/person 2:/i, '').trim())
      .join('\n');

    // Generate audio for both voices
    const [audio1Response, audio2Response] = await Promise.all([
      client.textToSpeech.convert(voice1, {
        text: voice1Lines,
        model_id: "eleven_monolingual_v1",
        output_format: "mp3_44100_128"
      }),
      client.textToSpeech.convert(voice2, {
        text: voice2Lines,
        model_id: "eleven_monolingual_v1",
        output_format: "mp3_44100_128"
      })
    ]);

    // Convert the audio responses to base64 strings
    const [audio1Buffer, audio2Buffer] = await Promise.all([
      streamToBuffer(audio1Response),
      streamToBuffer(audio2Response)
    ]);

    const audio1Base64 = audio1Buffer.toString('base64');
    const audio2Base64 = audio2Buffer.toString('base64');

    return {
      success: true,
      tracks: {
        person1: audio1Base64,
        person2: audio2Base64,
        combined: content
      }
    };
  } catch (error) {
    console.error('Error in generatePodcast:', error);
    throw error;
  }
}
