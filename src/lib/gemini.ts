const OPENROUTER_API_KEY = "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";
const SITE_URL = "https://infinall.app";
const SITE_NAME = "Infinall AI";

export async function sendMessageToGemini(prompt: string, history: { role: string; content: string }[] = []) {
  const systemPrompt = `You are Infinall AI, an expert full-stack developer.
  
  Your task is to generate production-ready code based on the user's request.
  
  CRITICAL OUTPUT RULES:
  1. Return ONLY a raw JSON object. No markdown, no comments, no explanations outside JSON.
  2. The JSON must be valid and parsable.
  3. IMPORTANT: Do NOT generate complex SVG paths or large data URIs. They cause JSON errors. Use simple text labels, emojis, or Lucide React icons instead of raw <svg> tags.
  4. Be concise. If the file is large, split it or simplify the logic.
  5. Ensure "index.html" is self-contained if possible, or strictly reference other files provided in the JSON.
  
  JSON Structure:
  {
    "explanation": "Brief summary.",
    "files": [
      {
        "name": "index.html",
        "type": "file",
        "language": "html",
        "content": "..."
      }
    ]
  }
  `;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.map(h => ({ role: h.role === 'ai' ? 'assistant' : 'user', content: h.content })),
    { role: "user", content: prompt }
  ];

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
      },
      body: JSON.stringify({
        // Switched to a model that might be less prone to looping on SVGs, or stick to this one with better prompt
        model: "qwen/qwen-2.5-vl-7b-instruct:free", 
        messages: messages,
        temperature: 0.4, // Reduced temperature to minimize hallucinations
        max_tokens: 8000,
        frequency_penalty: 0.6, // Higher penalty to stop loops (like infinite SVG paths)
        presence_penalty: 0.3
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    let content = data.choices[0]?.message?.content || "{}";

    // Cleanup Markdown
    content = content.replace(/```json\n?|```/g, "").trim();

    // Robust JSON Parsing & Repair
    try {
      JSON.parse(content);
      return content;
    } catch (e) {
      console.warn("JSON Parse Failed. Attempting repair...");
      
      // 1. Try to find the JSON object if there's surrounding text
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        content = match[0];
      }

      // 2. Fix bad escaped characters (common in Windows paths or incomplete unicodes)
      // Regex finds backslashes NOT followed by valid escape characters or valid unicode sequences
      content = content.replace(/\\(?!["\\/bfnrtu]|u[0-9a-fA-F]{4})/g, "\\\\");

      // 3. Naive repair for truncation: Close the JSON structure
      // Check if we are missing the root closing brace
      if (content.trim().endsWith("]")) {
        content += "}";
      } else if (content.trim().endsWith("}")) {
        // Looks okay? Maybe internal error.
      } else {
        // If it ends abruptly inside a string, we can't easily save it without invalidating the string
        // But we can try to close everything.
        // This is a last-ditch effort.
        
        // If ending with a quote, it might be a property value.
        // If not ending with a quote, maybe add one?
        if (!content.trim().endsWith('"') && !content.trim().endsWith('}') && !content.trim().endsWith(']')) {
             content += '"';
        }
        
        // Count open braces/brackets
        const openBraces = (content.match(/\{/g) || []).length;
        const closeBraces = (content.match(/\}/g) || []).length;
        const openBrackets = (content.match(/\[/g) || []).length;
        const closeBrackets = (content.match(/\]/g) || []).length;

        for (let i = 0; i < openBraces - closeBraces; i++) content += "}";
        for (let i = 0; i < openBrackets - closeBrackets; i++) content += "]";
        
        // Re-check order - usually it's files array then root object
        // Actually, logic above is too simple for nested structures, but might catch the "missing root }" case.
        if (content.endsWith("]")) content += "}";
      }

      // Final attempt to parse repaired content
      try {
        JSON.parse(content);
        console.log("JSON successfully repaired.");
        return content;
      } catch (e2) {
        console.error("Critical JSON Failure:", e2);
        return JSON.stringify({
          explanation: "The AI generation was interrupted. Please try a simpler request.",
          files: []
        });
      }
    }

  } catch (error) {
    console.error("Failed to fetch from OpenRouter:", error);
    return JSON.stringify({
      explanation: "Connection error. Please try again.",
      files: []
    });
  }
}
