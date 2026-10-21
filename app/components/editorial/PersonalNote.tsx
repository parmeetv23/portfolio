const photos = [
  {
    source: '/images/editorial-personal-2/mountain-valley',
    alt: 'A forested valley with lakes, snow-covered mountains, and a clear blue sky, viewed from a hillside.',
  },
  {
    source: '/images/editorial-personal/alpine-lake',
    alt: 'A rocky mountain reflected in a lake, with snow on its slopes and low cloud along the shoreline.',
  },
];

const photoSizes = '(max-width: 600px) calc(100vw - 40px), (max-width: 1000px) calc((100vw - 88px) / 2), (max-width: 1440px) calc((100vw - 604px) / 2), 418px';

export default function PersonalNote() {
  return (
    <section className="personal-note v3-wrap" aria-labelledby="personal-note-title">
      <div className="personal-note-copy">
        <h2 id="personal-note-title">Outside work</h2>
        <p>I enjoy hiking around Kananaskis and exploring Alberta. Being based in Calgary makes it easy to get out to the mountains. There’s still plenty of the province I’d like to see.</p>
      </div>
      <div className="personal-note-photos">
        {photos.map(photo => <figure className="personal-note-photo" key={photo.source}>
          <picture>
            <source
              type="image/webp"
              srcSet={`${photo.source}-480.webp 480w, ${photo.source}-960.webp 960w`}
              sizes={photoSizes}
            />
            <img
              src={`${photo.source}-960.jpg`}
              width={960}
              height={720}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </figure>)}
      </div>
    </section>
  );
}
