'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const VOICE_OPTIONS = [
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (Male)' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel (Female)' },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni (Male)' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella (Female)' },
  { id: 'yoZ06aMxZJJ28mfd3POQ', name: 'Sam (Male)' },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli (Female)' }
];

type Step = 'text' | 'voices' | 'generating';

export default function PodcastGenerator() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>('text');
  const [text, setText] = useState('');
  const [voice1, setVoice1] = useState('');
  const [voice2, setVoice2] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (currentStep === 'text') {
      if (!text.trim()) {
        toast({
          title: 'Error',
          description: 'Please enter some text',
          variant: 'destructive',
        });
        return;
      }
      setCurrentStep('voices');
    } else if (currentStep === 'voices') {
      handleGenerate();
    }
  };

  const handleGenerate = async () => {
    if (!voice1 || !voice2) {
      toast({
        title: 'Error',
        description: 'Please select both voices',
        variant: 'destructive',
      });
      return;
    }

    setCurrentStep('generating');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-podcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, voice1, voice2 })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate podcast');
      }

      if (!data.success || !data.tracks) {
        throw new Error('Invalid response format');
      }

      router.push(`/generator/success?data=${encodeURIComponent(JSON.stringify(data))}`);

    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate podcast',
        variant: 'destructive',
      });
      setCurrentStep('voices');
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {currentStep === 'text' && (
          <div className="space-y-4">
            <Label htmlFor="text">Enter your conversation</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Person 1: Hello, welcome to our podcast!
Person 2: Thanks for having me here.
Person 1: Let's begin our discussion.
Person 2: I'm excited to share my thoughts."
              className="mt-1"
              rows={10}
              required
            />
            <Button 
              onClick={handleNext}
              className="w-full"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {currentStep === 'voices' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="voice1">Voice for Person 1</Label>
                <Select onValueChange={setVoice1} value={voice1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {VOICE_OPTIONS.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="voice2">Voice for Person 2</Label>
                <Select onValueChange={setVoice2} value={voice2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {VOICE_OPTIONS.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('text')}
              >
                Back
              </Button>
              <Button 
                className="flex-1"
                onClick={handleNext}
                disabled={isLoading}
              >
                Generate Podcast
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'generating' && (
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p>Generating your podcast...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
