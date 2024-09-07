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
        // console.log(richMediaContent);

        var text = richMediaContent; //stripHtml(body).result;
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

var url =
  "https://mp.weixin.qq.com/s?src=11&timestamp=1725668101&ver=5491&signature=xvxBCZ6TR6sElDfOBFMUmRnI4VpKcao-dzCqreofaqB69B-WnnaJZuimG8ES2Lx-mStejNZzZoV0Sl5kcuQYIafsXc2WIWR-RYWkE8fde-lJR5ITvCNsvke1LyaP-0u9&new=1";
// Usage example:
// url = "https://mp.weixin.qq.com/s/ASbjIF2aCmKK5rRFdnzIBQ"
url =
  "https://mp.weixin.qq.com/s?src=11&timestamp=1725668323&ver=5491&signature=tl6F-QBWaMy4E409pnpDmJyAVoHpRzQmlVMcFK7CP-OE3513UrtU6oLZdCQMquirgnOwfFtpsuh8trJQDVkrLt7Vp6Y*nO7yShzbxuSBJjK3B1hRUdjyAB7nc9w6u2tP&new=1";
fetchAndProcessUrl(url);
