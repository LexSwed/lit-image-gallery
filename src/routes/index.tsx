import './index.css'
import '../components/image-gallery'

export default function Home() {
  const pictures = [
    {
      src: 'https://images.unsplash.com/photo-1526400473556-aac12354f3db?auto=format&fit=crop&w=1740&q=80',
      alt: 'A sunset over the mountains in Lofoten Islands, Svolvær, Norway',
    },
    {
      src: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1548&q=80',
      alt: 'A small fisherman village in Lofoten Islands',
    },
  ] as const
  return (
    <main>
      <h1>Hello world!</h1>
      <div class="center">
        <image-gallery cycle={true} index={1}>
          {pictures.map((pic) => (
            <img src={pic.src} alt={pic.alt} />
          ))}
        </image-gallery>
      </div>
    </main>
  )
}
