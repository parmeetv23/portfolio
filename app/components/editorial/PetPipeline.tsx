export default function PetPipeline() {
  return <figure className="project-technical pet-pipeline">
    <p className="technical-heading">From masks to measured detections</p>
    <div className="dataset-sources">
      <div><strong>Oxford-IIIT Pet</strong><span>Pet images + segmentation masks</span><small>Convert foreground to whole-pet boxes</small></div>
      <div><strong>ADE20K</strong><span>Segmented household objects</span><small>Filter, scale, and composite over pets</small></div>
    </div>
    <div className="dataset-merge"><span>3,312 clean</span><span aria-hidden="true">+</span><span>3,000 synthetic</span></div>
    <div className="training-manifest"><strong>6,312 training images</strong><span>Original pet boxes retained under occlusion</span></div>
    <div className="detector-branches"><span>YOLOv8n</span><span>EfficientDet-D0</span></div>
    <div className="evaluation-splits"><div><strong>Clean test</strong><span>3,669 images</span></div><div><strong>Natural occlusion</strong><span>74 images / 90 pet boxes</span></div></div>
    <figcaption>Each architecture is trained on clean data and on the combined set. The same held-out evaluations measure transfer to real occlusion.</figcaption>
  </figure>;
}
