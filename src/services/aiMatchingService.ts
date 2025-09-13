import { Student, Internship, Match } from '../types';

// Mock AI service for demonstration
export class AIMatchingService {
  private static skillEmbeddings: Record<string, number[]> = {
    'javascript': [0.8, 0.2, 0.6, 0.4, 0.9],
    'python': [0.7, 0.8, 0.5, 0.6, 0.3],
    'react': [0.9, 0.1, 0.7, 0.3, 0.8],
    'node.js': [0.8, 0.3, 0.6, 0.5, 0.7],
    'data analysis': [0.4, 0.9, 0.8, 0.7, 0.2],
    'machine learning': [0.3, 0.9, 0.9, 0.8, 0.1],
    'marketing': [0.2, 0.3, 0.1, 0.9, 0.8],
    'design': [0.6, 0.2, 0.3, 0.8, 0.9],
    'communication': [0.1, 0.4, 0.2, 0.9, 0.7],
    'project management': [0.5, 0.6, 0.4, 0.8, 0.6]
  };

  static calculateSkillMatch(studentSkills: string[], requiredSkills: string[]): number {
    if (requiredSkills.length === 0) return 0;
    
    let totalScore = 0;
    let matchCount = 0;

    for (const required of requiredSkills) {
      const requiredEmbedding = this.skillEmbeddings[required.toLowerCase()] || [0.5, 0.5, 0.5, 0.5, 0.5];
      let bestMatch = 0;

      for (const studentSkill of studentSkills) {
        const studentEmbedding = this.skillEmbeddings[studentSkill.toLowerCase()] || [0.5, 0.5, 0.5, 0.5, 0.5];
        const similarity = this.cosineSimilarity(requiredEmbedding, studentEmbedding);
        bestMatch = Math.max(bestMatch, similarity);
      }

      totalScore += bestMatch;
      matchCount++;
    }

    return matchCount > 0 ? (totalScore / matchCount) * 100 : 0;
  }

  static calculateLocationScore(studentLocation: any, internshipLocation: any): number {
    if (internshipLocation.isRemote) return 100;
    
    if (studentLocation.state === internshipLocation.state) {
      if (studentLocation.district === internshipLocation.district) {
        return 100;
      }
      return 75;
    }
    return 25;
  }

  static calculateAffinityScore(student: Student): number {
    let score = 0;
    
    // Rural bonus
    if (student.profile.location.isRural) score += 15;
    
    // Category bonus
    if (['sc', 'st', 'obc'].includes(student.profile.category)) score += 10;
    
    // Gender bonus
    if (student.profile.gender === 'female') score += 10;
    
    // Disability bonus
    if (student.profile.disabilities && student.profile.disabilities.length > 0) score += 20;
    
    return Math.min(score, 50); // Cap at 50%
  }

  static predictDropoutRisk(student: Student, internship: Internship): number {
    let riskScore = 0;
    
    // Location mismatch increases risk
    const locationScore = this.calculateLocationScore(student.profile.location, internship.location);
    if (locationScore < 50) riskScore += 30;
    
    // Stipend vs expectations
    if (internship.stipend.amount < 5000) riskScore += 20;
    
    // Duration preferences
    if (internship.duration.months > 6) riskScore += 15;
    
    // Skills mismatch
    const skillScore = this.calculateSkillMatch(student.profile.skills, internship.skills);
    if (skillScore < 60) riskScore += 25;
    
    return Math.min(riskScore, 100);
  }

  static generateMatches(student: Student, internships: Internship[]): Match[] {
    return internships.map(internship => {
      const skillsScore = this.calculateSkillMatch(student.profile.skills, internship.skills);
      const locationScore = this.calculateLocationScore(student.profile.location, internship.location);
      const affinityScore = this.calculateAffinityScore(student);
      const dropoutRisk = this.predictDropoutRisk(student, internship);
      
      const preferenceScore = 70; // Mock preference scoring
      const totalScore = (skillsScore * 0.4) + (locationScore * 0.2) + (preferenceScore * 0.2) + (affinityScore * 0.2);
      
      const explanation = [
        `Skills match: ${Math.round(skillsScore)}%`,
        `Location compatibility: ${Math.round(locationScore)}%`,
        affinityScore > 0 ? `Affirmative action bonus: ${Math.round(affinityScore)}%` : null,
        dropoutRisk > 60 ? 'High dropout risk detected' : null
      ].filter(Boolean) as string[];

      return {
        internshipId: internship.id,
        studentId: student.id,
        skillsScore,
        locationScore,
        preferenceScore,
        affinityScore,
        totalScore,
        dropoutRisk,
        explanation
      };
    }).sort((a, b) => b.totalScore - a.totalScore);
  }

  private static cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    
    return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
  }
}