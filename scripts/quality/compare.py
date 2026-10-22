"""Compare production captures. Requires Pillow in the local review environment."""

import json
from pathlib import Path

from PIL import Image, ImageChops


def main():
    directory = Path(__file__).resolve().parents[2] / "output/playwright/repository-cleanup"
    baseline = {path.name: path for path in (directory / "baseline").glob("*.png")}
    final = {path.name: path for path in (directory / "final").glob("*.png")}
    mismatches = []
    for name in sorted(baseline.keys() | final.keys()):
        if name not in baseline or name not in final:
            mismatches.append({"file": name, "reason": "missing capture"})
            continue
        with Image.open(baseline[name]) as before, Image.open(final[name]) as after:
            if before.size != after.size:
                mismatches.append({"file": name, "reason": "dimensions", "before": before.size, "after": after.size})
                continue
            difference = ImageChops.difference(before.convert("RGB"), after.convert("RGB"))
            bounds = difference.getbbox()
            if bounds:
                red, green, blue = difference.split()
                mask = ImageChops.lighter(ImageChops.lighter(red, green), blue).point(lambda value: 255 if value else 0)
                maximum_delta = max(channel.getextrema()[1] for channel in (red, green, blue))
                mismatches.append({"file": name, "reason": "pixels", "bounds": bounds, "changedPixels": mask.histogram()[255], "maxChannelDelta": maximum_delta})
    before = json.loads((directory / "baseline.json").read_text())["results"]
    after = json.loads((directory / "final.json").read_text())["results"]
    document_match = before == after
    result = {"captures": len(baseline), "identical": len(baseline) - len(mismatches), "mismatches": mismatches, "documentStatesMatch": document_match}
    (directory / "visual-comparison.json").write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps(result, indent=2))
    return 0 if baseline and not mismatches and document_match else 1


if __name__ == "__main__":
    raise SystemExit(main())
