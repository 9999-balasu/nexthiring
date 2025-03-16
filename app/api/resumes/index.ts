// pages/api/resumes/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/lib/mongodb'; // Ensure this function connects to your DB
import Resume from '@/models/Resume'; // Ensure this is your Mongoose model for Resume

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDB(); // Connect to the database
      const resumes = await Resume.find(); // Fetch all resumes

      return res.status(200).json(resumes); // Return resumes as JSON
    } catch (error) {
      console.error('Error fetching resumes:', error);
      return res.status(500).json({ message: 'Error fetching resumes' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
