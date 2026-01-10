
// API Service for OpenRouter (Qwen)

const OPENROUTER_API_KEY = "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";
const MODEL = "qwen/qwen-2.5-vl-7b-instruct:free";

export interface ProjectFile {
  name: string;
  type: 'file' | 'folder';
  language?: string;
  content?: string;
}

export interface ProjectResponse {
  explanation: string;
  files: ProjectFile[];
}

export async function generateProject(prompt: string): Promise<ProjectResponse> {
  const systemPrompt = `You are an expert full-stack web developer. Your goal is to generate a complete, working web application based on the user's prompt.
You must return your response in a strict JSON format.
The JSON structure must be:
{
  "explanation": "Brief explanation of what you built.",
  "files": [
    {
      "name": "index.html",
      "type": "file",
      "language": "html",
      "content": "..."
    },
    {
      "name": "styles.css",
      "type": "file",
      "language": "css",
      "content": "..."
    },
    {
      "name": "script.js",
      "type": "file",
      "language": "javascript",
      "content": "..."
    }
  ]
}
Include an 'index.html' file that contains the main structure and imports.
Use modern Tailwind CSS (via CDN) for styling.
Ensure the code is complete and functional.
Do not include markdown formatting or code blocks in the JSON string. Just the raw JSON.`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.href,
        "X-Title": "Infinall Dashboard",
      },
      body: JSON.stringify({
        "model": MODEL,
        "messages": [
          {
            "role": "system",
            "content": systemPrompt
          },
          {
            "role": "user",
            "content": prompt
          }
        ],
        "response_format": { "type": "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse JSON response:", content);
      // Attempt to extract JSON if wrapped in markdown code blocks
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }
      throw new Error("Invalid JSON format received from API");
    }

  } catch (error) {
    console.error("Project generation error:", error);
    return {
      explanation: "Failed to generate project. Please try again.",
      files: []
    };
  }
}
