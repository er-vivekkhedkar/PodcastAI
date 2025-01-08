'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Play, Pause, Volume2 } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AudioTracks {
  person1: string;
  person2: string;
  combined: string;
}

export default function GenerateSuccess() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const [tracks, setTracks] = useState<AudioTracks | null>(null);
  const [activeTab, setActiveTab] = useState<'combined' | 'individual'>('combined');
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const data = searchParams.get('data');
      if (!data) throw new Error('No audio data found');

      const parsedData = JSON.parse(decodeURIComponent(data));
      if (!parsedData.success || !parsedData.tracks) {
        throw new Error('Invalid audio data');
      }

      setTracks(parsedData.tracks);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  }, [searchParams]);

  const handlePlay = (trackId: string) => {
    if (playing === trackId) {
      audioRefs.current[trackId]?.pause();
      setPlaying(null);
    } else {
      if(playing && audioRefs.current[playing]) {
        audioRefs.current[playing]?.pause();
      }
      audioRefs.current[trackId]?.play();
      setPlaying(trackId);
    }
  };

  const handleDownload = (trackId: string, format: string) => {
    if (!tracks) return;

    const audioData = tracks[trackId as keyof AudioTracks];
    const blob = new Blob(
      [Uint8Array.from(atob(audioData), c => c.charCodeAt(0))],
      { type: `audio/${format}` }
    );
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `podcast-${trackId}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!tracks) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Your Generated Podcast</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'combined' | 'individual')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="combined">Combined Audio</TabsTrigger>
              <TabsTrigger value="individual">Individual Tracks</TabsTrigger>
            </TabsList>

            <TabsContent value="combined" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePlay('combined')}
                      >
                        {playing === 'combined' ? 
                          <Pause className="h-4 w-4" /> : 
                          <Play className="h-4 w-4" />
                        }
                      </Button>
                      <span>Full Conversation</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload('combined', 'mp3')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        MP3
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload('combined', 'wav')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        WAV
                      </Button>
                    </div>
                  </div>
                  <audio
                    ref={(el: HTMLAudioElement | null): void => {
                      audioRefs.current['combined'] = el;
                    }}
                    src={`data:audio/mpeg;base64,${tracks.combined}`}
                    onEnded={() => setPlaying(null)}
                    className="hidden"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="individual" className="space-y-4">
              {['person1', 'person2'].map((trackId) => (
                <Card key={trackId}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePlay(trackId)}
                        >
                          {playing === trackId ? 
                            <Pause className="h-4 w-4" /> : 
                            <Play className="h-4 w-4" />
                          }
                        </Button>
                        <span>Person {trackId.slice(-1)}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(trackId, 'mp3')}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          MP3
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(trackId, 'wav')}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          WAV
                        </Button>
                      </div>
                    </div>
                    <audio
                      ref={(el: HTMLAudioElement | null): void => {
                        audioRefs.current[trackId] = el;
                      }}
                      src={`data:audio/mpeg;base64,${tracks[trackId as keyof AudioTracks]}`}
                      onEnded={() => setPlaying(null)}
                      className="hidden"
                    />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
