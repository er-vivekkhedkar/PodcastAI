import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 300;

interface VoiceResponse {
  success: boolean;
  tracks: {
    person1: string;
    person2: string;
    combined: string;
  };
}

async function generateVoiceSegment(text: string, voiceId: string): Promise<ArrayBuffer> {
  if (!text || !voiceId) {
    throw new Error('Missing text or voiceId for voice generation');
  }

  console.log('Generating voice for:', { textLength: text.length, voiceId });

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': process.env.ELEVEN_LABS_API_KEY || ''
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.75,
        similarity_boost: 0.75
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('ElevenLabs API Error:', {
      status: response.status,
      text: errorText
    });
    throw new Error(`Voice generation failed: ${errorText}`);
  }

  return response.arrayBuffer();
}

export async function POST(req: Request) {
  try {
    const { text, voice1, voice2 } = await req.json();

    if (!text || !voice1 || !voice2) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Process text for each speaker
    const lines = text.split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0);

    const person1Lines = lines
      .filter( (line: string) => line.toLowerCase().startsWith('person 1:'))
      .map((line: string) => line.slice(line.indexOf(':') + 1).trim())
      .join('. ');

    const person2Lines = lines
      .filter((line: string) => line.toLowerCase().startsWith('person 2:'))
      .map((line: string)  => line.slice(line.indexOf(':') + 1).trim())
      .join('. ');

    if (!person1Lines || !person2Lines) {
      return NextResponse.json({ 
        error: 'Missing dialogue for one or both speakers' 
      }, { status: 400 });
    }

    console.log('Processing:', {
      person1Length: person1Lines.length,
      person2Length: person2Lines.length
    });

    // Generate audio for both speakers
    const [audio1, audio2] = await Promise.all([
      generateVoiceSegment(person1Lines, voice1),
      generateVoiceSegment(person2Lines, voice2)
    ]);

    // Generate combined conversation
    const combinedText = lines
      .map((line: string)  => {
        if (line.toLowerCase().startsWith('person 1:')) {
          return line.slice(line.indexOf(':') + 1).trim();
        }
        return line.slice(line.indexOf(':') + 1).trim();
      })
      .join('\n');

    const combinedAudio = await generateVoiceSegment(combinedText, voice1);

    const response: VoiceResponse = {
      success: true,
      tracks: {
        person1: Buffer.from(audio1).toString('base64'),
        person2: Buffer.from(audio2).toString('base64'),
        combined: Buffer.from(combinedAudio).toString('base64')
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to generate podcast' 
    }, { status: 500 });
  }
}
