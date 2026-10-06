import { mkdir, readFile, writeFile } from "node:fs/promises";
const assets = JSON.parse(
  await readFile(new URL("./figma-assets.json", import.meta.url), "utf8"),
).filter((asset) => /\.(png|svg|jpg|webp)$/.test(asset.file));
const destination = new URL("../public/assets/", import.meta.url);
await mkdir(destination, { recursive: true });
for (let start = 0; start < assets.length; start += 6) {
  await Promise.all(
    assets.slice(start, start + 6).map(async ({ file, url }) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${file}: ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (!bytes.length) throw new Error(`Empty asset: ${file}`);
      await writeFile(new URL(file, destination), bytes);
    }),
  );
}
console.log(`Downloaded ${assets.length} original Figma assets.`);
