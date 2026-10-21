const results = [
  {
    name: "YOLOv8n",
    clean: "0.471",
    augmented: "0.345",
    cleanClass: "v3-yolo-clean",
    augmentedClass: "v3-yolo-augmented",
  },
  {
    name: "EfficientDet-D0",
    clean: "0.098",
    augmented: "0.112",
    cleanClass: "v3-efficient-clean",
    augmentedClass: "v3-efficient-augmented",
  },
];

export default function DetectionResults() {
  return (
    <figure className="v3-results">
      <div className="v3-chart-heading">
        <span>Real-occlusion evaluation</span>
        <span>mAP@0.50</span>
      </div>
      <div className="v3-chart-legend" aria-hidden="true">
        <span>
          <i className="v3-clean-key" />
          Clean training
        </span>
        <span>
          <i className="v3-augmented-key" />
          Clean + synthetic training
        </span>
      </div>
      <div className="v3-chart" aria-hidden="true">
        {results.map((result) => (
          <div className="v3-chart-group" key={result.name}>
            <p>{result.name}</p>
            <div className="v3-chart-row">
              <div className={`v3-bar v3-bar-clean ${result.cleanClass}`} />
              <span>{result.clean}</span>
            </div>
            <div className="v3-chart-row">
              <div
                className={`v3-bar v3-bar-augmented ${result.augmentedClass}`}
              />
              <span>{result.augmented}</span>
            </div>
          </div>
        ))}
        <div className="v3-chart-axis">
          <span>0</span>
          <span>0.2</span>
          <span>0.4</span>
          <span>0.6</span>
        </div>
      </div>
      <div className="v3-sr-only">
        <table>
          <caption>Recorded mAP at 0.50 on real-occlusion images</caption>
          <thead>
            <tr>
              <th scope="col">Detector</th>
              <th scope="col">Clean training</th>
              <th scope="col">Clean + synthetic training</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.name}>
                <th scope="row">{result.name}</th>
                <td>{result.clean}</td>
                <td>{result.augmented}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption>
        Recorded evaluation on 74 real-occlusion images with 90 pet boxes.
        Best-checkpoint predictions; higher values indicate better detection quality.
      </figcaption>
    </figure>
  );
}
