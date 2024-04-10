import { Content, GenerativeModel } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ModelService {
  private model;
  constructor(private readonly configService: ConfigService) {
    this.model = new GenerativeModel(
      configService.getOrThrow('modelConfig.apiKey'),
      {
        model: configService.getOrThrow('modelConfig.modelName'),
      },
    );
  }

  async getData(question: string, history: Content[] = []) {
    const client = this.model.startChat({
      history: [
        ...this.configService.getOrThrow('modelConfig.magicPrompt'),
        ...history,
      ],
    });
    const { response } = await client.sendMessage(question);

    if (response.candidates?.length)
      return response.candidates[0].content.parts[0].text;

    throw new Error('Error generating SQL query.');
  }

  generateHistory(history: { question: string; response: string }[]) {
    const chatHistory: Content[] = [];
    history.forEach((item) => {
      chatHistory.push(
        {
          role: 'user',
          parts: [{ text: item.question }],
        },
        { role: 'model', parts: [{ text: item.response }] },
      );
    });
    return chatHistory;
  }
}