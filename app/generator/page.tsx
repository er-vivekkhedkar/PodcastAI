import PodcastGenerator from '@/components/PodcastGenerator'

export default function GeneratorPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Generate Your Podcast</h1>
      <PodcastGenerator />
    </div>
  )
}
