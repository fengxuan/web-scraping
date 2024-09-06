import axios from "axios";
import fs from "fs";
import * as cheerio from "cheerio";
import { stripHtml } from "string-strip-html";

function fetchAndProcessUrl(url, filename) {
  axios.get(url).then(
    (response) => {
      if (response.status === 200) {
        var html = response.data;

        const $ = cheerio.load(html);
        const richMediaContent = $(".rich_media_content")
          .find("p")
          .map((_, el) => $(el).text())
          .get()
          .join("\n");

        // var body = $("rich_media_content");
        console.log(richMediaContent);

        var text = "test"; //stripHtml(body).result;
        console.log(text);

        if (!filename) {
          filename = `data/books_${Date.now()}.json`;
        }

        fs.writeFile(filename, text, (err) => {
          if (err) {
            console.error("Error writing file:", err);
          }
          console.log(`File successfully written to ${filename}!`);
        });
      }
    },
    (error) => console.log(error)
  );
}

// Usage example:
fetchAndProcessUrl("https://mp.weixin.qq.com/s/ASbjIF2aCmKK5rRFdnzIBQ");
