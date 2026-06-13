var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
app.use(import_express.default.json());
var PORT = 3e3;
var ai = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new import_genai.GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
    console.log("GoogleGenAI successfully initialized server-side.");
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined! Using fallback local simulation.");
  }
} catch (e) {
  console.error("Failed to initialize GoogleGenAI:", e);
}
app.post("/api/convert", async (req, res) => {
  const { totalHours, totalMinutes, breakdown, targetType, localTime } = req.body;
  if (!ai) {
    return res.json({
      title: "\u3010\u79BB\u7EBF\u4EE3\u507F\u3011\u591A\u5DF4\u80FA\u7834\u4EA7\u514D\u8D23\u58F0\u660E",
      ironicQuote: "\u201C\u6CA1\u6709\u68C0\u6D4B\u5230\u5927\u9B54\u6CD5\u5E08\u7684API\u6CD5\u6756\uFF08API Key\uFF09\uFF0C\u4F46\u6839\u636E\u661F\u8C61\u63A8\u6D4B\uFF0C\u4F60\u4ECA\u5929\u7684\u62C7\u6307\u6469\u64E6\u529B\u5DF2\u5728\u5168\u7701\u6392\u540D\u524D 1.2%\u3002\u201D",
      productivityEquivalents: [
        { label: "AI \u52B3\u52A1\u7B49\u6548", details: "\u5982\u679C\u5728\u8FD9 6 \u5C0F\u65F6\u91CC\u7ED9\u5927\u6A21\u578B\u505A\u6807\u6CE8\uFF0C\u4F60\u53EF\u4EE5\u8D5A\u5230 58 \u5757\u94B1\u5E76\u989D\u5916\u6536\u83B7\u4E09\u5343\u6B21\u54C8\u6B20\u3002", icon: "\u{1F9F1}" },
        { label: "\u82F1\u8BED\u79EF\u7D2F\u91CF", details: "\u8DB3\u591F\u7CBE\u8BFB\u80CC\u8BF5 50 \u4E2A\u9AD8\u7EA7GRE\u8BCD\u6C47\uFF0C\u6216\u8005\u638C\u63E1\u4E00\u53E5\u7B80\u7EC3\u7684\u2018\u4E0B\u6B21\u5FC5\u4E0D\u72AF\u61D2\u2019\u3002", icon: "\u{1F4DA}" },
        { label: "\u70ED\u91CF\u6362\u80FD\u6BD4", details: "\u5982\u679C\u6362\u6210\u505A\u5F00\u5408\u8DF3\uFF0C\u80FD\u591F\u7D2F\u8BA1\u6D88\u8017\u7EA6 480 kcal \u7684\u5361\u8DEF\u91CC\u3002\u76EE\u524D\u4ECD\u5B58\u5728\u4E8E\u4F60\u809A\u5B50\u4E0A\u7684\u591A\u4F59\u8089\u8089\u8868\u793A\u975E\u5E38\u5B89\u8BE6\u3002", icon: "\u{1F357}" }
      ],
      realAlternative: "\u65E2\u7136\u5927\u9B54\u6CD5\u5E08\u8FD8\u6CA1\u51C6\u5907\u597D\uFF0C\u4F60\u81EA\u5DF1\u5FC3\u91CC\u5C31\u6CA1\u70B9\u6570\u5417\uFF1F\u53BB\u62C9\u4F38\u4E00\u4E0B\u9888\u690E\uFF0C\u628A\u624B\u673A\u585E\u5230\u4F60\u770B\u4E0D\u5230\u7684\u5E8A\u7F1D\u5E95\u4E0B\u5427\u3002"
    });
  }
  try {
    const breakdownStr = breakdown ? Object.entries(breakdown).map(([k, v]) => `${k === "slacking" ? "\u5728\u7EBF\u6478\u9C7C" : k === "social" ? "\u793E\u4EA4\u4E92\u52A8" : k === "gaming" ? "\u5CE1\u8C37\u4E00\u65E5\u6E38" : "\u65E0\u6548\u5185\u5377"}: ${v.hours}\u5C0F\u65F6${v.minutes}\u5206\u949F`).join(", ") : "\u672A\u63D0\u4F9B\u8BE6\u7EC6\u6478\u9C7C\u660E\u7EC6";
    const localTimeStr = localTime || (/* @__PURE__ */ new Date()).toISOString();
    const prompt = `
      \u7528\u6237\u901A\u8FC7\u624B\u673A\u5E94\u7528\u8D26\u5355\u663E\u793A\u4ECA\u65E5\u865A\u5EA6\u603B\u65F6\u957F\u4E3A\uFF1A${totalHours}\u5C0F\u65F6 ${totalMinutes}\u5206\u949F\u3002
      \u6478\u9C7C\u5206\u7C7B\u7EC6\u76EE\uFF1A${breakdownStr}\u3002
      \u5F53\u524D\u672C\u5730\u7EAA\u5143\u65F6\u95F4\uFF1A${localTimeStr}\u3002
      \u5F53\u524D\u5E0C\u671B\u70BC\u91D1\u8F6C\u5316\u7684\u5927\u7C7B\u65B9\u5411\uFF1A[${targetType || "irony"}]\u3002
      
      \u5927\u7C7B\u65B9\u5411\u6620\u5C04\u8BED\u4E49\u8BF4\u660E\uFF1A
      - "cash" (\u8BA1\u7B97\u865A\u5EA6\u65F6\u95F4\u7684\u76F4\u63A5\u6216\u7B49\u6548\u7ECF\u6D4E\u635F\u5931\uFF0C\u4F8B\u5982\u642C\u7816\u8D5A\u94B1\u3001\u70B9\u5916\u5356\u53CD\u5411\u6D88\u8D39\u3001\u65F6\u95F4\u5C31\u662F\u91D1\u94B1\u3001\u5931\u4E1A\u5012\u8BA1\u65F6)
      - "skills" (\u8BA1\u7B97\u5728\u8FD9\u6BB5\u65F6\u95F4\u5185\u539F\u672C\u53EF\u4EE5\u5F7B\u5E95\u638C\u63E1\u6216\u5165\u95E8\u7684\u9AD8\u4EF7\u503C\u9AD8\u96BE\u5EA6\u4EBA\u7C7B\u6280\u80FD\uFF0C\u4F8B\u5982\uFF1A\u624B\u6413\u7B80\u6613\u7F16\u8BD1\u5668\u3001\u7528\u5409\u4ED6\u5F39\u5B8C\u52A0\u5DDE\u65C5\u9986\u524D\u594F\u3001\u80CC\u5B8C\u6574\u6392GRE\u6838\u5FC3\u526F\u8BCD\u7B49)
      - "health" (\u8BA1\u7B97\u8FD9\u6BB5\u65F6\u95F4\u5185\u8EAB\u4F53\u5904\u4E8E\u2018\u50F5\u5C38\u5316\u2019\u7684\u771F\u5B9E\u7269\u7406\u72B6\u6001\u3002\u4F8B\u5982\u773C\u5E72\u773C\u6DA9\u89D2\u819C\u5145\u8840\u5EA6\u3001\u80A9\u9888\u66F2\u5EA6\u53D8\u5F62\u4E3A\u867E\u4EC1\u5F62\u72B6\u3001\u7F3A\u4E4F\u8FD0\u52A8\u5E26\u6765\u7684\u8102\u80AA\u5806\u79EF\u4E0E\u5176\u53EF\u6D88\u8017\u7B49\u6548\u70ED\u91CF)
      - "irony" (\u62C9\u6EE1\u6BD2\u820C\u8F93\u51FA\u3002\u7528\u6781\u7AEF\u8352\u8BDE\u5938\u5F20\u5E7D\u9ED8\u7684\u6BB5\u5B50\uFF0C\u606D\u559C\u4ED6\u4EEC\u5B8C\u6210\u4E86\u67D0\u4E9B\u532A\u5937\u6240\u601D\u7684\u8D5B\u535A\u5947\u8FF9\uFF0C\u4F8B\u5982\u2018\u7531\u4E8E\u8FDE\u7EED\u5237\u77ED\u89C6\u9891\u5927\u62C7\u6307\u7A81\u7834\u97F3\u969C\u2019\u3001\u2018\u4ECA\u65E5\u7ED9\u673A\u5E8A\u5582\u98DF\u4E94\u661F\u597D\u8BC4\u8363\u83B7\u5927\u6EE1\u8D2F\u2019)
      - "existential" (\u76F4\u9762\u7075\u9B42\u6DF1\u5904\u3002\u6BD4\u5982\u671F\u672B\u5468\u3001\u7EE9\u70B9\u5D29\u76D8\u3001\u5B87\u5B99\u70ED\u5BC2\u5047\u8BF4\u4E0E\u65F6\u95F4\u4E0D\u53EF\u9006\u6027\uFF0C\u7528\u5B8F\u5927\u60B2\u58EE\u7684\u53D9\u4E8B\u628A\u4ED6\u4EEC\u4ECE\u5351\u5FAE\u7684\u591A\u5DF4\u80FA\u6ED1\u52A8\u4E2D\u9707\u9192)

      \u8BF7\u626E\u6F14\u4E00\u4F4D\u6027\u683C\u9C9C\u660E\u3001\u6781\u5EA6\u6BD2\u820C\u3001\u5145\u6EE1\u7F51\u611F\u3001\u53C8\u5E26\u7740\u4E00\u4E1D\u53EF\u7231\u50B2\u5A07\u7684\u65F6\u95F4\u7EA0\u5BDF\u6CD5\u5E08\uFF0C\u8F93\u51FA\u4E00\u4EFD JSON \u683C\u5F0F\u7684\u5947\u8469\u65F6\u95F4\u8D26\u5355\u5305\u3002
      \u8BF7\u6CE8\u610F\uFF0C\u8FD4\u56DE\u7684JSON\u6570\u636E\u7ED3\u6784\u5FC5\u987B\u9AD8\u5EA6\u7CBE\u786E\uFF0C\u4E0D\u5F97\u5939\u6742\u4EFB\u4F55 markdown \u6807\u8BB0\u4E4B\u5916\u7684\u6587\u672C\u3002
    `;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "\u4F60\u662F\u4E00\u4E2A\u62E5\u6709\u6781\u5176\u523B\u8584\u800C\u9AD8\u96C5\u54C1\u683C\u3001\u5145\u6EE1\u5E7D\u9ED8\u7EC6\u80DE\u7684\u65F6\u95F4\u70BC\u91D1\u6CD5\u5E08\u3002\u4F60\u4F1A\u4E3A\u7531\u4E8E\u4E0D\u505C\u5237\u624B\u673A\u800C\u5BFC\u81F4\u6DF1\u5EA6\u62D6\u5EF6\u7684\u7528\u6237\u63D0\u4F9B\u2018\u65F6\u95F4\u91CD\u7EC4\u6362\u7B97\u5355\u2019\u3002\u4F60\u6700\u64C5\u957F\u4F7F\u7528\u7F51\u7EDC\u70ED\u6897\u3001\u75DB\u5FEB\u7684\u81EA\u5632\u3001MBTI\u523B\u753B\u5F0F\u63CF\u8FF0\u548C\u51FA\u795E\u5165\u5316\u7684\u8BBD\u523A\u6BD4\u4F8B\uFF0C\u6233\u4E2D\u7528\u6237\u7684\u5185\u5FC3\u75DB\u70B9\u5E76\u63D0\u4F9B\u53EF\u64CD\u4F5C\u6027\u6781\u5F3A\u7684\u5E7D\u9ED8\u8B66\u793A\u3002\u4F60\u6240\u6709\u7684\u54CD\u5E94\u7ED3\u679C\u5FC5\u987B\u4E3A\u7B26\u5408 Schema \u7684\u6807\u51C6 JSON \u4E32\uFF0C\u7EDD\u5BF9\u4E0D\u5E94\u8BE5\u5728 json \u6570\u636E\u5757\u5916\u5305\u88C5\u591A\u4F59\u7684\u8BC4\u8BBA\u6587\u5B57\u3002",
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          required: ["title", "ironicQuote", "productivityEquivalents", "realAlternative"],
          properties: {
            title: {
              type: import_genai.Type.STRING,
              description: "\u9488\u5BF9\u7528\u6237\u5F53\u524D\u72B6\u6001\u8D77\u4E00\u4E2A\u5145\u6EE1\u4E86\u6279\u5224\u5E7D\u9ED8\u611F\u7684\u8D26\u5355\u540D\u79F0\uFF08\u4F8B\u5982\uFF1A\u3010\u591A\u5DF4\u80FA\u8FC7\u5EA6\u8D1F\u7A0E\u58F0\u660E\u3011\u3001\u3010\u7EE9\u70B9\u5927\u64A4\u9000\uFF1A\u5E9A\u5B50\u534F\u8BAE\u3011\uFF09"
            },
            ironicQuote: {
              type: import_genai.Type.STRING,
              description: "\u4E00\u53E5\u6587\u98CE\u523B\u9AA8\u3001\u76F4\u51FB\u61D2\u60F0\u810A\u6881\u3001\u540C\u65F6\u8BA9\u4EBA\u5FCD\u4FCA\u4E0D\u7981\u7684\u8D85\u7EA7\u91D1\u53E5"
            },
            productivityEquivalents: {
              type: import_genai.Type.ARRAY,
              description: "\u6B63\u597D 3 \u4E2A\u7EF4\u5EA6\u7684\u7B49\u6548\u8D26\u5355\u6761\u76EE\uFF0C\u4E25\u4E1D\u5408\u7F1D\u5730\u628A\u6478\u9C7C\u65F6\u95F4\u5151\u6362\u6210\u5B9E\u4F53\u9879\u76EE",
              minItems: 3,
              maxItems: 3,
              items: {
                type: import_genai.Type.OBJECT,
                required: ["label", "details", "icon"],
                properties: {
                  label: { type: import_genai.Type.STRING, description: "\u5151\u6362\u51FA\u7684\u786C\u6838\u76EE\u6807\u6216\u635F\u5931\uFF08\u4F8B\u5982\uFF1A\u2018\u7269\u7406\u9888\u690E\u6298\u65E7\u7387\u2019\u3001\u2018AI\u6807\u6CE8\u5973\u5DE5\u4F53\u529B\u2019\uFF09" },
                  details: { type: import_genai.Type.STRING, description: "\u5177\u4F53\u7684\u6570\u5B57\u8BC1\u660E\u548C\u6781\u5176\u597D\u73A9\u7684\u523B\u753B\u89E3\u91CA" },
                  icon: { type: import_genai.Type.STRING, description: "\u5BF9\u5E94\u7684\u5355\u4E2A emoji \u56FE\u6807" }
                }
              }
            },
            realAlternative: {
              type: import_genai.Type.STRING,
              description: "\u4E00\u53E5\u867D\u7136\u6709\u4E00\u70B9\u70B9\u5634\u786C\uFF0C\u4F46\u5B9E\u9645\u5F88\u6709\u6E29\u5EA6\u3001\u5207\u5B9E\u53EF\u884C\u3001\u53EF\u4EE5\u7ACB\u523B\u4E0A\u624B\u6446\u8131\u624B\u673A\u8BF1\u60D1\u7684\u65F6\u95F4\u81EA\u6551\u6307\u5F15"
            }
          }
        }
      }
    });
    const text = response.text || "{}";
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    res.json(JSON.parse(cleanedText));
  } catch (err) {
    console.error("Gemini conversion error details:", err);
    res.status(500).json({
      error: "AI \u70BC\u91D1\u7089\u4F3C\u4E4E\u8D85\u6E29\u81EA\u542F\u4FDD\u62A4\u4E86...",
      title: "\u3010\u8111\u96FE\u8B66\u62A5\u3011\u591A\u5DF4\u80FA\u7F51\u7EDC\u6E83\u7F29",
      ironicQuote: "\u201C\u65E2\u7136\u4F60\u6BCF\u5929\u90FD\u5728\u521B\u9020\u8FDE\u795E\u7ECF\u7F51\u7EDC\u90FD\u7406\u4E0D\u6E05\u7684\u6478\u9C7C\u5783\u573E\u6570\u636E\uFF0CAI \u9009\u62E9\u4F11\u5047\u4E00\u5929\u4E0D\u770B\u4F60\u7684\u591A\u5DF4\u80FA\u3002\u201D",
      productivityEquivalents: [
        { label: "\u670D\u52A1\u5668\u81EA\u6211\u53CD\u7701", details: "AI \u770B\u7740\u4F60\u624B\u5FD9\u811A\u4E71\u7684\u5468\u8BB0\u9677\u5165\u4E86\u957F\u4E45\u7684\u54F2\u5B66\u6C89\u9ED8\uFF0C\u51B3\u5B9A\u91CD\u65B0\u6392\u961F\u52A0\u8F7D\u3002", icon: "\u{1F6E1}\uFE0F" },
        { label: "\u65F6\u95F4\u7EBF\u5D29\u584C", details: "\u65E0\u6CD5\u5C06\u865A\u65E0\u7684\u5149\u9634\u6253\u5305\uFF0C\u56E0\u4E3A\u5B83\u7684\u71B5\u503C\u5DF2\u7ECF\u5927\u5230\u4E86\u4EE4\u8BA1\u7B97\u673A\u8FD0\u7B97\u6EA2\u51FA\u7684\u7A0B\u5EA6\u3002", icon: "\u{1F9CA}" },
        { label: "\u7EAF\u7CB9\u53D1\u5446", details: "\u65E2\u7136\u673A\u5668\u6302\u4E86\uFF0C\u8BF4\u660E\u73B0\u5728\u662F\u4F60\u79BB\u5F00\u4EFB\u4F55\u7535\u5B50\u5C4F\u5E55\u53BB\u9633\u53F0\u5439\u98CE\u7684\u552F\u4E00\u5929\u8D50\u65F6\u673A\u3002", icon: "\u{1F4A8}" }
      ],
      realAlternative: "\u670D\u52A1\u5668\u5728\u6559\u4F60\u81EA\u5F8B\u3002\u5173\u673A 20 \u5206\u949F\u53BB\u6536\u62FE\u4E00\u4E0B\u684C\u5B50\uFF0C\u522B\u6574\u5929\u5B88\u5728\u5C4F\u5E55\u524D\u7B49 AI \u56DE\u7B54\u4E86\u3002"
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("Development mode: Vite middleware attached to Express.");
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
    console.log("Production mode: Serving built index.html static assets.");
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom fullstack server run completely at host http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
