export default function PersonalNote() {
  return (
    <section className="personal-note v3-wrap" aria-labelledby="personal-note-title">
      <div className="personal-note-copy">
        <h2 id="personal-note-title">Outside work</h2>
        <p>I enjoy hiking around Kananaskis and exploring Alberta. I’m also into basketball.</p>
      </div>
      <figure className="personal-note-photo">
        <picture>
          <source
            type="image/webp"
            srcSet="/images/editorial-personal-2/mountain-valley-480.webp 480w, /images/editorial-personal-2/mountain-valley-960.webp 960w"
            sizes="(max-width: 600px) 280px, (max-width: 800px) 260px, 320px"
          />
          <img
            src="/images/editorial-personal-2/mountain-valley-960.jpg"
            width={960}
            height={720}
            alt="A forested valley with lakes, snow-covered mountains, and a clear blue sky, viewed from a hillside."
            loading="lazy"
            decoding="async"
          />
        </picture>
      </figure>
    </section>
  );
}
