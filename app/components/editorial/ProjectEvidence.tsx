import DetectionResults from './DetectionResults';

export default function ProjectEvidence({ slug, section }: { slug: string; section: string }) {
  if (slug === 'occluded-pet-detection' && section === 'detectors') return <figure className="research-artifact">
    <a href="/images/projects/pet-detection/clean-training-loss.png" target="_blank" rel="noopener noreferrer" aria-label="Open original YOLOv8 clean-training loss figure in a new tab">
      {/* Preserve this small original report plot losslessly; reserve its dimensions and lazy-load it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" src="/images/projects/pet-detection/clean-training-loss.png" alt="Original report figure: training and validation box loss generally decrease across 50 epochs of clean YOLOv8 training." width={2100} height={1200}/>
    </a>
    <figcaption>Original project report, Figure 5. Clean YOLOv8 training and validation box loss across 50 epochs. <a href="/images/projects/pet-detection/clean-training-loss.png" target="_blank" rel="noopener noreferrer">Open full-size figure<span className="v3-sr-only"> in a new tab</span></a></figcaption>
  </figure>;
  if (slug === 'occluded-pet-detection' && section === 'results') return <div className="research-results"><DetectionResults/><div className="experiment-table"><table>
    <caption>Stricter localization metric on the same real-image set: mAP averaged across IoU 0.50–0.95.</caption>
    <thead><tr><th scope="col">Detector</th><th scope="col">Clean training</th><th scope="col">Augmented training</th></tr></thead>
    <tbody><tr><th scope="row">YOLOv8n</th><td>0.229</td><td>0.152</td></tr><tr><th scope="row">EfficientDet-D0</th><td>0.036</td><td>0.043</td></tr></tbody>
  </table></div></div>;
  if (slug === 'genetic-algorithm-hyperparameter-finder' && section === 'comparison') return <div className="experiment-table"><table>
    <caption>Reported SVC results on diabetes classification. Timings use different search budgets and parallelism.</caption>
    <thead><tr><th scope="col">Search method</th><th scope="col">Test accuracy</th><th scope="col">Elapsed (s)</th></tr></thead>
    <tbody><tr><th scope="row">Genetic</th><td>0.7416</td><td>160.09</td></tr><tr><th scope="row">Grid</th><td>0.7416</td><td>940.42</td></tr><tr><th scope="row">Randomized</th><td>0.7416</td><td>155.49</td></tr><tr><th scope="row">Halving grid</th><td>0.6854</td><td>194.74</td></tr></tbody>
  </table></div>;
  return null;
}
