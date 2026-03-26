import { Router } from 'express';
import axios from 'axios';
import snakeize from 'snakeize';

const router: Router = Router();

interface RepurposeRequest {
   topic?: string;
   originalContent: string;
   platform?: string;
}

interface RepurposeResponse {
   success: boolean;
   input: Record<string, string>;
   result: string;
}

interface RepurposeAIResponse {
   data: RepurposeResponse;
}

router.post('/', async (req, res) => {
   const { topic = '', originalContent, platform = '' } = req.body; // Destructure any fields you expect from the frontend
   if (!originalContent) {
      return res.status(400).json({ error: 'at least originalContent is required' });
   }
   const pythonPayload: RepurposeRequest = snakeize({ topic, originalContent, platform });
   // console.log('Received repurpose request (python):', pythonPayload);
   // const response = { success: true, input: {}, result: 'TEST RESPONSE...' };
   // console.log('Response:', response);
   // res.json(response); // Immediate response to frontend
   try {
      const aiRes = await axios.post<RepurposeRequest, RepurposeAIResponse>(
         `${process.env.AI_SERVICE_URL}/repurpose`,
         pythonPayload
      );
      res.json(aiRes.data);
   } catch (err: any) {
      console.error('Error calling AI service:', err.response?.data || err.message);
      res.status(500).json({ error: err.message });
   }
});

export { router as repurposeRouter };
